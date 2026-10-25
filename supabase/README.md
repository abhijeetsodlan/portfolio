# Journal database setup

1. Open your Supabase project's SQL Editor and run `journal-setup.sql`.
2. In Authentication > Users, add your own email/password user.
3. Run the admin enrollment query at the end of the SQL file with that email.
   Run the verification query too; it must return your email.

If you ran the original setup before the masonry gallery update, run
`journal-optional-details.sql` once. It allows empty titles, image descriptions,
and categories, and adds image dimensions so the gallery can reserve space
while photos load. It does not delete entries or change access policies.

The setup creates journal metadata, an admin allowlist, automatic update
timestamps, access policies, and a public `beyond-screen` image bucket.
Only explicitly enrolled admins can change entries or stored images. New
entries default to drafts; visitors can read published entries only.
Images in the public bucket can be viewed by anyone who has their URL,
including images attached to drafts. Upload public portfolio content only.

Images accept JPEG, PNG, WebP, and AVIF, up to 10 MB each. Use unique paths
such as `${user.id}/${crypto.randomUUID()}.jpg` for every new photo. Store
that relative path in `journal_entries.image_path`; derive its public URL
with the Supabase Storage client. Fetch entries ordered by `sort_order`
ascending, then `created_at` descending. Only the photo is required; text and
metadata can be left blank. On the public page, optional titles sit below
photos and captions appear only when opening a photo. Existing `featured`
values are preserved for compatibility; all masonry photos use equal column
widths and their natural height.

The frontend is connected through `src/lib/supabase.js`. Open `/#admin`
for the sign-in form and upload dashboard, or use **Manage journal** in the
public journal footer. There is no public signup; use your enrolled admin
account. The browser uses your existing public environment variables; it
never needs a service-role key. Authentication and storage policies enforce
access even if someone bypasses the UI.

For local development, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
to `.env` and restart Vite. For Netlify deployment, add these same names and
values to the hosting environment and rebuild the site; the ignored local
`.env` file is not uploaded. Once deployed, journal changes do not require
another build. Upload and publish from any signed-in device.

Run `npm run test:e2e` to exercise sign-in, denied access, upload, drafts,
publishing, editing, replacement, deletion, cleanup retries, and mobile layout
against a mocked backend. Tests use the locally installed Chrome browser;
set Playwright's channel in `playwright.config.js` if using another browser.
The real database and storage are never modified by these browser tests.

Uploads and database writes are separate operations. If saving a new entry
fails, remove its newly uploaded image. When replacing a photo, upload a new
file, update the entry, and only then remove the old file. On deletion, remove
the entry first, then remove its file through Storage's `remove()` API. If
file cleanup fails, report it and allow a retry; do not silently lose track
of the orphaned object. Never delete `storage.objects` directly in SQL.
