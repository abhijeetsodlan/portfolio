export const JOURNAL_BUCKET = 'beyond-screen';
export const JOURNAL_CATEGORIES = ['Farm life', 'Reading', 'Small moments'];
const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' };

export function validatePhoto(file) {
  if (!TYPES[file.type]) throw new Error('Choose a JPEG, PNG, WebP, or AVIF image.');
  if (!file.size || file.size > 10 * 1024 * 1024) throw new Error('Images must be between 1 byte and 10 MB.');
}

export function entryValues(form) {
  const title = (form.title || '').trim();
  const alt = (form.alt || '').trim();
  if (title.length > 160) throw new Error('Keep the title within 160 characters.');
  if (alt.length > 500) throw new Error('Keep the image description within 500 characters.');
  if (form.category && !JOURNAL_CATEGORIES.includes(form.category)) throw new Error('Choose a valid category.');
  const sort = Number(form.sort_order);
  if (!Number.isInteger(sort) || sort < -2147483648 || sort > 2147483647) throw new Error('Display order must be a whole number within the allowed range.');
  if (form.note.length > 5000 || form.label.length > 160) throw new Error('The caption or label is too long.');
  return { title, alt, category: form.category || '', note: form.note.trim(), label: form.label.trim(),
    featured: !!form.featured, sort_order: sort, is_published: !!form.is_published, taken_at: form.taken_at || null };
}

export function createJournalApi(client) {
  const bucket = () => client.storage.from(JOURNAL_BUCKET);
  const withImage = (entry) => ({ ...entry, image: bucket().getPublicUrl(entry.image_path).data.publicUrl });
  return {
    async list(publishedOnly = false, signal) {
      let query = client.from('journal_entries').select('*').order('sort_order').order('created_at', { ascending: false });
      if (publishedOnly) query = query.eq('is_published', true);
      if (signal) query = query.abortSignal(signal);
      const { data, error } = await query;
      if (error) throw error;
      return data.map(withImage);
    },
    async upload(file, userId, trackPath = () => {}) {
      validatePhoto(file);
      const path = `${userId}/${crypto.randomUUID()}.${TYPES[file.type]}`;
      trackPath(path);
      const { error } = await bucket().upload(path, file, { upsert: false, contentType: file.type, cacheControl: '3600' });
      if (error) { const failure = new Error(error.message); failure.cleanupPath = path; throw failure; }
      return path;
    },
    async save(form, imagePath, existing, dimensions) {
      const values = { ...entryValues(form), image_path: imagePath,
        ...(dimensions ? { image_width: dimensions.width, image_height: dimensions.height } : {}) };
      const table = client.from('journal_entries');
      const query = existing
        ? table.update(values).eq('id', existing.id).eq('updated_at', existing.updated_at)
        : table.insert(values);
      const { data, error } = await query.select().single();
      if (error?.code === 'PGRST204' || (error?.code === '23514' && /journal_entries_(title|alt|category)_check/.test(error.message))) {
        throw new Error('The database needs the optional-details update. Run supabase/journal-optional-details.sql in Supabase SQL Editor, then retry.');
      }
      if (error) throw new Error(error.code === 'PGRST116' ? 'This moment changed in another tab. Refresh the library before editing again.' : error.message);
      return withImage(data);
    },
    async remove(entry) {
      const { data, error } = await client.from('journal_entries').delete()
        .eq('id', entry.id).eq('updated_at', entry.updated_at).select('id');
      if (error) throw error;
      if (!data.length) throw new Error('This moment changed in another tab. Refresh the library before deleting it.');
    },
    async cleanup(paths) {
      if (!paths.length) return;
      // Never remove a photo still used by an entry, including after an uncertain save response.
      const { data, error } = await client.from('journal_entries').select('image_path').in('image_path', paths);
      if (error) throw error;
      const referenced = new Set(data.map((row) => row.image_path));
      const unused = paths.filter((path) => !referenced.has(path));
      if (unused.length) {
        const { error: storageError } = await bucket().remove(unused);
        if (storageError) throw storageError;
      }
    },
  };
}
