-- Run this entire script in Supabase > SQL Editor as the project owner.
-- Re-runnable for this schema; existing journal entries are preserved.
begin;

-- Admin access is assigned only through SQL Editor, never by the browser.
create table if not exists public.journal_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.journal_admins enable row level security;
revoke all on public.journal_admins from anon, authenticated;

create or replace function public.is_journal_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.journal_admins
    where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_journal_admin() from public;
grant execute on function public.is_journal_admin() to authenticated;

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null default '' check (char_length(title) <= 160),
  category text not null default ''
    check (category in ('', 'Farm life', 'Reading', 'Small moments')),
  -- Relative object path in the beyond-screen bucket, e.g. USER_ID/UUID.jpg.
  image_path text not null unique check (char_length(trim(image_path)) > 0),
  alt text not null default '' check (char_length(alt) <= 500),
  image_width integer check (image_width > 0),
  image_height integer check (image_height > 0),
  note text not null default '' check (char_length(note) <= 5000),
  label text not null default '' check (char_length(label) <= 160),
  featured boolean not null default false,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  taken_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journal_entries_public_order
  on public.journal_entries (sort_order asc, created_at desc)
  where is_published = true;

create or replace function public.journal_set_updated_at()
returns trigger language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.journal_set_updated_at() from public;
drop trigger if exists journal_entries_updated_at on public.journal_entries;
create trigger journal_entries_updated_at
  before update on public.journal_entries
  for each row execute function public.journal_set_updated_at();

alter table public.journal_entries enable row level security;
revoke all on public.journal_entries from anon, authenticated;
grant select on public.journal_entries to anon, authenticated;
grant insert, update, delete on public.journal_entries to authenticated;

drop policy if exists journal_public_read on public.journal_entries;
create policy journal_public_read on public.journal_entries
  for select to anon, authenticated using (is_published = true);

drop policy if exists journal_admin_manage on public.journal_entries;
create policy journal_admin_manage on public.journal_entries
  for all to authenticated
  using ((select public.is_journal_admin()))
  with check ((select public.is_journal_admin()));

-- Public portfolio photos: anyone with a photo URL can view it, even if its
-- journal entry is a draft. Draft titles/captions stay restricted to admins.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'beyond-screen', 'beyond-screen', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Only approved journal admins can list, upload, replace, or remove objects.
-- Public image serving is provided by the public bucket, not this policy.
drop policy if exists journal_admin_storage on storage.objects;
create policy journal_admin_storage on storage.objects
  for all to authenticated
  using (
    bucket_id = 'beyond-screen'
    and (select public.is_journal_admin())
  )
  with check (
    bucket_id = 'beyond-screen'
    and (select public.is_journal_admin())
  );

commit;

-- NEXT: Create your login in Authentication > Users > Add user.
-- Then replace the email below and run this separately to grant admin access:
-- insert into public.journal_admins (user_id)
-- select id from auth.users where lower(email) = lower('YOUR_LOGIN_EMAIL')
-- on conflict (user_id) do nothing;
--
-- Verify the intended account was added (SQL Editor only):
-- select u.email from public.journal_admins a
-- join auth.users u on u.id = a.user_id;
--
-- IMPORTANT: Delete files using supabase.storage.from('beyond-screen').remove().
-- Deleting a journal_entries row alone does not delete its stored image.
-- Never delete storage.objects rows directly with SQL.
