import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaPlus, FaSun, FaMoon, FaXmark, FaCloudArrowUp, FaTrash, FaPen, FaArrowRotateRight } from 'react-icons/fa6';
import { supabase } from '../lib/supabase';
import { createJournalApi, entryValues, JOURNAL_CATEGORIES, validatePhoto } from '../lib/journalApi';
import { useTheme } from '../hooks/useTheme';
import './BeyondScreen.css';
import './JournalAdmin.css';

const api = supabase ? createJournalApi(supabase) : null;
const emptyForm = { title: '', category: '', alt: '', note: '', label: '', featured: false, sort_order: 0, is_published: false, taken_at: '' };
const entryName = (entry) => entry.title?.trim() || 'Untitled photo';

function useAdminSession() {
  const [session, setSession] = useState(undefined);
  const [access, setAccess] = useState({ status: 'checking', message: '' });
  const [attempt, setAttempt] = useState(0);
  const userId = session?.user.id;
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    let eventReceived = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, next) => {
      eventReceived = true;
      if (active) setSession(next);
    });
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active || eventReceived) return;
      if (error) setAccess({ status: 'error', message: error.message });
      setSession(data.session);
    }).catch(() => { if (active) setAccess({ status: 'error', message: 'Could not restore your session. Refresh and try again.' }); });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    if (!userId) return;
    let active = true;
    setAccess({ status: 'checking', message: '' });
    // Run outside the auth callback to avoid holding Supabase's auth lock.
    supabase.rpc('is_journal_admin').then(({ data, error }) => {
      if (active) setAccess(error ? { status: 'error', message: error.message, userId } : { status: data ? 'allowed' : 'denied', message: '', userId });
    }).catch(() => { if (active) setAccess({ status: 'error', message: 'Could not verify admin access. Check your connection and retry.' }); });
    return () => { active = false; };
  }, [userId, attempt]);
  return { session, access, retry: () => setAttempt((value) => value + 1) };
}

function SignIn() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: form.get('email').trim(), password: form.get('password') });
      if (loginError) throw loginError;
    } catch (failure) { setError(failure.message); }
    finally { setBusy(false); }
  }
  return <div className="studio-login"><span className="studio-mark" aria-hidden="true">✳</span><p className="journal-eyebrow">A private space for your stories</p>
    <h1>Welcome back.</h1><p className="studio-muted">A few photos. A few words. A little life beyond the screen.</p>
    <form onSubmit={submit}><fieldset disabled={busy}>
      <label>Email address<input type="email" name="email" autoComplete="username" placeholder="you@example.com" required /></label>
      <label>Password<input type="password" name="password" autoComplete="current-password" required /></label>
      {error && <p className="studio-error" role="alert">{error}</p>}
      <button className="studio-primary" type="submit">{busy ? 'Signing in…' : 'Open journal studio'}<FaArrowRight /></button>
    </fieldset></form><p className="studio-login-note">Use your Supabase admin account. This space is invite-only.</p></div>;
}

function MomentEditor({ entry, onCancel, onSave, saving }) {
  const [form, setForm] = useState(() => entry ? { ...emptyForm, ...entry, taken_at: entry.taken_at || '' } : { ...emptyForm });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(entry?.image || '');
  const [imageReady, setImageReady] = useState(!!entry?.image);
  const [dimensions, setDimensions] = useState(null);
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, []);
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl); setImageReady(false);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  useEffect(() => {
    const warn = (event) => { if (dirty || saving) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    const confirmNavigation = (event) => {
      const anchor = event.target.closest('a');
      if (anchor && (dirty || saving) && (saving || !window.confirm('Leave without saving this moment?'))) event.preventDefault();
    };
    document.addEventListener('click', confirmNavigation, true);
    return () => { window.removeEventListener('beforeunload', warn); document.removeEventListener('click', confirmNavigation, true); };
  }, [dirty, saving]);
  const update = (field, value) => { setForm((current) => ({ ...current, [field]: value })); setDirty(true); };
  function chooseFile(event) {
    const next = event.target.files?.[0];
    if (!next) return;
    try { validatePhoto(next); setFile(next); setDirty(true); setError(''); }
    catch (failure) { setError(failure.message); event.target.value = ''; }
  }
  async function submit(event) {
    event.preventDefault(); setError('');
    try {
      entryValues(form);
      if (!file && !entry) throw new Error('Choose a photo for this moment.');
      if (!imageReady) throw new Error('Wait for the photo to load, or choose another image.');
      await onSave(form, file, entry, dimensions);
    } catch (failure) { setError(failure.message); }
  }
  function cancel() { if (!dirty || window.confirm('Discard your unsaved changes?')) onCancel(); }
  return <section className="studio-editor" aria-labelledby="editor-heading">
    <div className="studio-section-heading"><div><p className="journal-eyebrow">{entry ? 'Refine the details' : 'Make room for a memory'}</p><h2 id="editor-heading" ref={heading} tabIndex={-1}>{entry ? 'Edit moment' : 'A new moment.'}</h2></div><button className="studio-icon" disabled={saving} onClick={cancel} aria-label="Close editor"><FaXmark /></button></div>
    <form onSubmit={submit}><fieldset disabled={saving} className="studio-editor-grid">
      <div className="studio-fields">
        <label className={`studio-upload ${preview ? 'has-photo' : ''}`}>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={chooseFile} aria-label={entry ? 'Replace photo' : 'Upload photo'} />
          <FaCloudArrowUp /><strong>{file ? file.name : entry ? 'Choose a replacement photo' : 'Choose a photo'}</strong><span>JPEG, PNG, WebP or AVIF · Up to 10 MB</span>
        </label>
        <p className="studio-muted">Just a photo is enough. Everything below is optional.</p>
        <label>Title<input aria-label="Title" value={form.title} onChange={(event) => update('title', event.target.value)} maxLength={160} placeholder="Add a title, if you like." /></label>
        <label>Caption<textarea value={form.note} onChange={(event) => update('note', event.target.value)} maxLength={5000} rows={3} placeholder="A few words, or none at all." /></label>
        <details className="studio-details"><summary>More details <span>optional</span></summary><div className="studio-extra-fields">
        <label>Image description<input value={form.alt} onChange={(event) => update('alt', event.target.value)} maxLength={500} placeholder="Describe what is in the photo." /><small>Optional, but helpful for screen readers.</small></label>
        <div className="studio-form-row"><label>Category<select value={form.category} onChange={(event) => update('category', event.target.value)}><option value="">No category</option>{JOURNAL_CATEGORIES.map((name) => <option key={name}>{name}</option>)}</select></label>
          <label>Date taken<input type="date" value={form.taken_at} onChange={(event) => update('taken_at', event.target.value)} /></label></div>
        <div className="studio-form-row"><label>Small label<input value={form.label} maxLength={160} onChange={(event) => update('label', event.target.value)} placeholder="An evening outside" /></label>
          <label>Display order<input type="number" value={form.sort_order} min={-2147483648} max={2147483647} step={1} onChange={(event) => update('sort_order', event.target.value)} /><small>Lower numbers appear first.</small></label></div>
        </div></details>
        <label className="studio-check"><input type="checkbox" checked={form.is_published} onChange={(event) => update('is_published', event.target.checked)} /><span>Publish to the journal<small>Unchecked moments stay in your draft library.</small></span></label>
      </div>
      <aside className="studio-preview"><div className="studio-preview-label"><span className="journal-eyebrow">Live preview</span><span className="studio-badge">{form.is_published ? 'Published on save' : 'Draft'}</span></div>
        {preview ? <img src={preview} alt={form.alt || 'Selected photo preview'} onLoad={(event) => { setImageReady(true); setDimensions({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight }); }} onError={() => { setImageReady(false); setError('This image could not be opened. Choose a supported photo.'); }} /> : <div className="studio-preview-empty"><span>✳</span><p>Your next story starts here.</p></div>}
        {(form.title || form.note || form.label) && <div className="studio-preview-copy">{form.label && <span className="journal-eyebrow">{form.label}</span>}{form.title && <h3>{form.title}</h3>}{form.note && <p>{form.note}</p>}</div>}
        <p className="studio-privacy">Uploaded photos have public URLs, including draft photos. Draft captions stay private.</p>
      </aside>
      {error && <p className="studio-error studio-wide" role="alert">{error}</p>}
      <div className="studio-editor-actions studio-wide"><button type="button" className="studio-secondary" onClick={cancel}>Cancel</button><button type="submit" className="studio-primary">{saving ? 'Saving your moment…' : form.is_published ? 'Save & publish' : 'Save draft'}<FaArrowRight /></button></div>
    </fieldset></form>
  </section>;
}

function DeleteDialog({ entry, onCancel, onDelete, busy }) {
  const dialog = useRef(null);
  useEffect(() => { dialog.current.showModal(); }, []);
  return <dialog className="studio-delete-dialog" ref={dialog} aria-labelledby="delete-title" onCancel={(event) => { event.preventDefault(); if (!busy) onCancel(); }}>
    <p className="journal-eyebrow">Remove a moment</p><h2 id="delete-title">Delete “{entryName(entry)}”?</h2><p>This removes the entry and its photo. This cannot be undone.</p>
    <div className="studio-editor-actions"><button className="studio-secondary" disabled={busy} autoFocus onClick={onCancel}>Keep moment</button><button className="studio-danger" disabled={busy} onClick={onDelete}>{busy ? 'Deleting…' : 'Delete permanently'}</button></div>
  </dialog>;
}

function Library({ user, onBusyChange }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [filter, setFilter] = useState('All moments');
  const [search, setSearch] = useState('');
  const [editor, setEditor] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const queueKey = `journal-cleanup:${supabase.supabaseUrl}:${user.id}`;
  const [pending, setPending] = useState(() => { try { const data = JSON.parse(localStorage.getItem(queueKey) || '[]'); return Array.isArray(data) ? data.filter((path) => typeof path === 'string') : []; } catch { return []; } });
  const pendingRef = useRef(pending);
  const operation = useRef(false);
  const queue = (paths) => {
    pendingRef.current = [...new Set(paths)]; setPending(pendingRef.current);
    try { localStorage.setItem(queueKey, JSON.stringify(pendingRef.current)); }
    catch { setError('Your browser could not remember pending photo cleanup. Keep this page open and retry cleanup before leaving.'); }
  };
  const begin = () => { if (operation.current) return false; operation.current = true; setBusy(true); onBusyChange(true); return true; };
  const finish = () => { operation.current = false; setBusy(false); onBusyChange(false); };
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { setEntries(await api.list()); }
    catch (failure) { setError(failure.message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);
  async function cleanPhotos() {
    const paths = [...pendingRef.current];
    if (!paths.length) return;
    await api.cleanup(paths);
    queue(pendingRef.current.filter((path) => !paths.includes(path)));
  }
  async function save(form, file, existing, dimensions) {
    if (!begin()) return;
    setNotice(''); setError('');
    let uploaded = null;
    try {
      if (file) {
        uploaded = await api.upload(file, user.id, (path) => queue([...pendingRef.current, path]));
      }
      if (uploaded && existing) queue([...pendingRef.current, existing.image_path]);
      const saved = await api.save(form, uploaded || existing?.image_path, existing, dimensions);
      queue(pendingRef.current.filter((path) => path !== saved.image_path));
      setEntries((current) => [...current.filter((item) => item.id !== saved.id), saved].sort((a, b) => a.sort_order - b.sort_order || b.created_at.localeCompare(a.created_at)));
      setEditor(null); setNotice(saved.is_published ? 'Moment saved and published to your journal.' : 'Draft saved. Only you can see its details.');
      try { await cleanPhotos(); } catch { setError('Your moment is saved, but an unused photo still needs cleanup. Use Retry cleanup below.'); }
    } catch (failure) {
      if (failure.cleanupPath) queue([...pendingRef.current, failure.cleanupPath]);
      // Keep uncertain uploads queued; the cleanup action checks database references first.
      throw failure;
    } finally { finish(); }
  }
  async function remove() {
    if (!begin()) return;
    setError(''); setNotice('');
    try {
      queue([...pendingRef.current, deleting.image_path]);
      await api.remove(deleting);
      setEntries((current) => current.filter((entry) => entry.id !== deleting.id)); setDeleting(null);
      setNotice('Moment deleted.');
      try { await cleanPhotos(); } catch { setError('The entry was deleted, but its photo still needs cleanup. Use Retry cleanup below.'); }
    } catch (failure) { setError(failure.message); setDeleting(null); }
    finally { finish(); }
  }
  async function retryCleanup() {
    if (!begin()) return;
    setError('');
    try { await cleanPhotos(); setNotice('Unused photo cleanup complete.'); }
    catch (failure) { setError(`Cleanup could not finish: ${failure.message}`); }
    finally { finish(); }
  }
  const visible = entries.filter((entry) => (filter === 'All moments' || (filter === 'Published' ? entry.is_published : !entry.is_published)) && `${entry.title} ${entry.note} ${entry.category}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <header className="studio-heading"><div><p className="journal-eyebrow">Beyond the screen</p><h1>Your photos.</h1><p className="studio-muted">Upload a photo. Add words only if you want to.</p></div><button className="studio-primary" disabled={busy || !!editor} onClick={() => { setEditor({ entry: null }); setNotice(''); }}><FaPlus />New moment</button></header>
    <div className="studio-stats"><div><strong>{entries.length.toString().padStart(2, '0')}</strong><span>All moments</span></div><div><strong>{entries.filter((entry) => entry.is_published).length.toString().padStart(2, '0')}</strong><span>Published</span></div><div><strong>{entries.filter((entry) => !entry.is_published).length.toString().padStart(2, '0')}</strong><span>Drafts</span></div><a href="#beyond">Visit the journal <FaArrowRight /></a></div>
    {notice && <p className="studio-success" role="status">{notice}</p>}
    {error && <p className="studio-error" role="alert">{error}</p>}
    {pending.length > 0 && <div className="studio-cleanup"><p>{pending.length} photo(s) pending cleanup.</p><button className="studio-secondary" onClick={retryCleanup} disabled={busy}>Retry cleanup</button></div>}
    {editor ? <MomentEditor key={editor.entry?.id || 'new'} entry={editor.entry} onCancel={() => setEditor(null)} onSave={save} saving={busy} /> : <>
      <div className="studio-library-tools"><div className="journal-filters" role="group" aria-label="Filter library">{['All moments', 'Published', 'Drafts'].map((name) => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)} disabled={busy}>{name}</button>)}</div><div className="studio-search"><input type="search" aria-label="Search moments" placeholder="Find a moment…" value={search} onChange={(event) => setSearch(event.target.value)} /><button className="studio-icon" aria-label="Refresh library" disabled={busy || loading} onClick={load}><FaArrowRotateRight /></button></div></div>
      {loading ? <p className="studio-empty" role="status">Gathering your moments…</p> : !visible.length ? <div className="studio-empty"><span>✳</span><h2>{entries.length ? 'No matching moments.' : 'Your first story is waiting.'}</h2><p>{entries.length ? 'Try another search or filter.' : 'Upload a photo, add a few words, and save a draft or publish it.'}</p>{!entries.length && <button className="studio-primary" onClick={() => setEditor({ entry: null })}><FaPlus />Add your first moment</button>}</div> : <div className="studio-library">{visible.map((entry) => <article className="studio-card" key={entry.id}>
        <button className="studio-card-photo" onClick={() => setEditor({ entry })} disabled={busy} aria-label={`Review ${entryName(entry)}`}><img src={entry.image} alt={entry.alt || entry.title || 'Journal photo'} loading="lazy" /><span className={`studio-badge ${entry.is_published ? 'is-published' : ''}`}>{entry.is_published ? 'Published' : 'Draft'}</span></button>
        <div className="studio-card-copy">{entry.category && <span className="journal-eyebrow">{entry.category}</span>}<h2>{entryName(entry)}</h2>{entry.note && <p>{entry.note}</p>}<div className="studio-card-actions"><span>Order {entry.sort_order}</span><button className="studio-secondary" onClick={() => setEditor({ entry })} disabled={busy}><FaPen />Review & edit</button><button className="studio-icon studio-delete" onClick={() => setDeleting(entry)} disabled={busy} aria-label={`Delete ${entryName(entry)}`}><FaTrash /></button></div></div>
      </article>)}</div>}
    </>}
    {deleting && <DeleteDialog entry={deleting} onCancel={() => setDeleting(null)} onDelete={remove} busy={busy} />}
  </>;
}

export default function JournalAdmin() {
  const { session, access, retry } = useAdminSession();
  const { isDark, toggle } = useTheme();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { const title = document.title; document.title = 'Journal studio | Abhijeet Sodlan'; return () => { document.title = title; }; }, []);
  async function signOut() {
    setError('');
    const { error: failure } = await supabase.auth.signOut({ scope: 'local' });
    if (failure) setError(failure.message);
  }
  return <main className="journal-world studio-world"><div className="journal-shell">
    <nav className="studio-nav" aria-label="Admin navigation"><a href="#beyond" className="journal-back"><FaArrowLeft />Back to journal</a><span className="studio-brand">✳ <span>JOURNAL STUDIO</span></span><div className="studio-nav-actions"><button className="studio-icon" onClick={toggle} aria-label="Toggle theme">{isDark ? <FaSun /> : <FaMoon />}</button>{session && <button className="studio-secondary" disabled={busy} onClick={signOut}>Sign out</button>}</div></nav>
    {error && <p className="studio-error" role="alert">{error}</p>}
    {!supabase ? <div className="studio-empty"><h1>Connect your journal.</h1><p>Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment and restart the app.</p></div>
      : session === undefined ? <p className="studio-empty" role="status">Restoring your session…</p>
      : !session ? <SignIn />
      : access.status === 'checking' || (access.status === 'allowed' && access.userId !== session.user.id) ? <p className="studio-empty" role="status">Checking your admin access…</p>
      : access.status === 'allowed' ? <Library key={session.user.id} user={session.user} onBusyChange={setBusy} />
      : <div className="studio-empty"><h1>{access.status === 'denied' ? 'This journal is invite-only.' : 'Could not open the studio.'}</h1><p>{access.message || 'Your account is signed in, but has not been added to journal_admins. Add it using the setup SQL, then retry.'}</p><button className="studio-primary" onClick={retry}>Check access again</button></div>}
    <footer className="studio-footer"><span>BEYOND THE SCREEN / PRIVATE STUDIO</span><span>Small moments. A place to keep them.</span></footer>
  </div></main>;
}
