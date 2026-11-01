-- Review and apply manually after 0001_leads.sql.
-- This migration has NOT been applied to the connected Supabase project.
-- No anonymous table access is granted. RLS continues to restrict authenticated
-- users to members of public.admins.
begin;
grant usage on schema public to authenticated, service_role;
grant insert, select on table public.leads to service_role;
grant select, update on table public.leads to authenticated;
grant select on table public.admins to authenticated;
commit;
