-- ktp_select_via_profile compared p.ktp_path to an unqualified `name`, which
-- resolves to profiles.name, not storage.objects.name. Since users could also
-- edit their own name and ktp_path, anyone could make the two equal and read
-- every KTP in the bucket. Compare against the object's name instead.
drop policy "ktp_select_via_profile" on storage.objects;
create policy "ktp_select_via_profile" on storage.objects for select to authenticated
  using (bucket_id = 'ktp' and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.ktp_path = storage.objects.name));

-- Users edit only their contact details. nik and ktp_path are identity data
-- set at signup by handle_new_user(); profiles are created by that trigger only.
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (name, phone, address, postal_code, avatar_url) on public.profiles to authenticated;

-- A new request carries only what the onboarding form sends; status, dates,
-- and completion are set by staff (service role).
revoke insert, update, delete on public.service_requests from anon, authenticated;
grant insert (user_id, service_name, problem_summary) on public.service_requests to authenticated;

-- service_tasks are written by staff only.
revoke insert, update, delete on public.service_tasks from anon, authenticated;
