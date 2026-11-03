-- Public avatars bucket, writes limited to own folder
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "avatars_insert_own" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatars_update_own" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatars_delete_own" on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- KTP is uploaded at signup, before the user has a session (email not yet confirmed).
-- Anonymous users may INSERT ONLY into pending/<uuid>.<ext>; they cannot read or overwrite.
create policy "ktp_insert_pending_anon" on storage.objects for insert to anon
  with check (bucket_id = 'ktp' and name ~ '^pending/[0-9a-f-]{36}\.(jpg|png|webp)$');
-- The owner can read the pending file referenced by their profile.
create policy "ktp_select_via_profile" on storage.objects for select to authenticated
  using (bucket_id = 'ktp' and exists (
    select 1 from public.profiles p where p.id = (select auth.uid()) and p.ktp_path = name));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
declare k text := new.raw_user_meta_data->>'ktp_path';
begin
  insert into public.profiles (id, name, phone, nik, address, postal_code, ktp_path)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'phone',
    nullif(new.raw_user_meta_data->>'nik', ''),
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'postal_code',
    case when k ~ '^pending/[0-9a-f-]{36}\.(jpg|png|webp)$' then k else null end
  );
  return new;
end $$;
