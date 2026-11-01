-- City Pulse Solutions: consultation requests and admin access.
-- Run in Supabase: SQL Editor › New query › paste › Run.

create type public.lead_status as enum ('new', 'contacted', 'won', 'lost');

create table public.leads (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null check (char_length(full_name) between 2 and 100),
  company     text check (char_length(company) <= 120),
  phone       text not null check (char_length(phone) between 7 and 20),
  email       text check (char_length(email) <= 150),
  service     text not null check (service in ('websites', 'marketing', 'ai-marketing', 'mobile-apps', 'automation')),
  message     text check (char_length(message) <= 2000),
  status      public.lead_status not null default 'new',
  ip_address  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);

-- Who may open the admin dashboard. Signing up alone grants nothing:
-- a user sees leads only after their id is added here.
create table public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.leads  enable row level security;
alter table public.admins enable row level security;

-- No insert policy: the website inserts through the server route with the service role key,
-- after validation and rate limiting, so nobody can write to the table directly from a browser.
create policy "admins read leads"   on public.leads for select to authenticated using (public.is_admin());
create policy "admins update leads" on public.leads for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins see themselves" on public.admins for select to authenticated using (user_id = auth.uid());

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger leads_touch_updated_at
before update on public.leads
for each row execute function public.touch_updated_at();
