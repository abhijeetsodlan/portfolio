# Beyond the screen

With Supabase configured, open `/#admin` or use **Manage journal** in the
journal footer. Sign in with the account enrolled in `journal_admins`.
Upload photos, review previews, save drafts, publish, edit, or delete moments.
Public entries load directly from Supabase without a redeployment.

The available categories are Farm life, Reading, and Small moments. Lower
display-order numbers appear first. Photos keep their natural aspect ratio
in a responsive masonry board, including two columns on mobile. Titles and
all other details are optional; only a photo is required. Captions appear in
the full-size viewer, while an optional title sits below the gallery image.
New entries are drafts unless you enable **Publish to the journal**.

`journal.js` contains the original demo data, used only when Supabase is not
configured. A configured but empty journal shows an empty state, not demo
photos. Draft captions do not appear on the public page. The storage bucket
is public, so uploaded photo URLs are public even for draft entries.

See `supabase/README.md` for database and deployment setup. Visit `/#beyond`
to open the public journal directly.
