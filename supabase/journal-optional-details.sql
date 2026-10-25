-- Run once in Supabase SQL Editor. Existing photos and access policies stay intact.
begin;
alter table public.journal_entries
  drop constraint if exists journal_entries_title_check,
  drop constraint if exists journal_entries_alt_check,
  drop constraint if exists journal_entries_category_check;
alter table public.journal_entries
  alter column title set default '',
  alter column alt set default '',
  alter column category set default '',
  add constraint journal_entries_title_check check (char_length(title) <= 160),
  add constraint journal_entries_alt_check check (char_length(alt) <= 500),
  add constraint journal_entries_category_check check (category in ('', 'Farm life', 'Reading', 'Small moments'));
-- Dimensions reserve the correct space while a photo loads, reducing layout shifts.
alter table public.journal_entries
  add column if not exists image_width integer check (image_width > 0),
  add column if not exists image_height integer check (image_height > 0);
commit;
