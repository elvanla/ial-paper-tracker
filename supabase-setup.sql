-- IAL Paper Tracker: database setup
-- Paste this whole file into Supabase > SQL Editor > New query, then press Run.
-- Safe to run more than once.

-- 1. Tables ---------------------------------------------------------------

-- One row per user: their chosen subjects, own papers, exam dates, settings.
create table if not exists public.profiles (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint profile_size check (pg_column_size(data) < 200000)
);

-- One row per logged paper.
create table if not exists public.attempts (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id         text not null,
  body       jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id),
  constraint attempt_id_len check (char_length(id) between 1 and 64),
  constraint attempt_size  check (pg_column_size(body) < 20000)
);

-- 2. Row level security: every user can only see and change their own rows -----

alter table public.profiles enable row level security;
alter table public.attempts enable row level security;

drop policy if exists "own profile: read"   on public.profiles;
drop policy if exists "own profile: insert" on public.profiles;
drop policy if exists "own profile: update" on public.profiles;
drop policy if exists "own profile: delete" on public.profiles;
create policy "own profile: read"   on public.profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "own profile: insert" on public.profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own profile: update" on public.profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own profile: delete" on public.profiles for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "own attempts: read"   on public.attempts;
drop policy if exists "own attempts: insert" on public.attempts;
drop policy if exists "own attempts: update" on public.attempts;
drop policy if exists "own attempts: delete" on public.attempts;
create policy "own attempts: read"   on public.attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "own attempts: insert" on public.attempts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "own attempts: update" on public.attempts for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own attempts: delete" on public.attempts for delete to authenticated using ((select auth.uid()) = user_id);

-- 3. Permissions: signed-in users only; logged-out visitors get nothing --------

revoke all on public.profiles, public.attempts from anon;
grant select, insert, update, delete on public.profiles, public.attempts to authenticated;

-- 4. Stop any one account filling the database (3,000 papers each) -------------

create or replace function public.limit_attempts() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.attempts where user_id = new.user_id) >= 3000 then
    raise exception 'You have reached the limit of 3,000 logged papers.';
  end if;
  return new;
end $$;

drop trigger if exists attempts_limit on public.attempts;
create trigger attempts_limit before insert on public.attempts
  for each row execute function public.limit_attempts();

-- 5. "Delete my account" button ---------------------------------------------

create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  delete from auth.users where id = auth.uid();   -- profiles and attempts go with it (on delete cascade)
end $$;

revoke execute on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
revoke execute on function public.limit_attempts() from public, anon, authenticated;
