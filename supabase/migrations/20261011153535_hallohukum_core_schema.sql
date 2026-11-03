-- Shared updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;

-- profiles (1:1 with auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '' check (char_length(name) <= 120),
  phone text check (phone is null or char_length(phone) <= 30),
  nik text check (nik is null or nik ~ '^[0-9]{16}$'),
  address text check (address is null or char_length(address) <= 500),
  postal_code text check (postal_code is null or char_length(postal_code) <= 10),
  ktp_path text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create policy "profiles_select_own" on public.profiles for select to authenticated
  using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Auto-create profile on signup from signup metadata
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, name, phone, nik, address, postal_code, ktp_path)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'phone',
    nullif(new.raw_user_meta_data->>'nik', ''),
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'postal_code',
    null
  );
  return new;
end $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- service requests + tasks
create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_name text not null check (char_length(service_name) <= 120),
  status text not null default 'Pending' check (status in ('Pending','In Progress','Completed')),
  problem_summary text not null default '' check (char_length(problem_summary) <= 4000),
  requested_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now()
);
create index service_requests_user_id_idx on public.service_requests(user_id);
alter table public.service_requests enable row level security;
create trigger service_requests_updated_at before update on public.service_requests
  for each row execute function public.set_updated_at();
create policy "sr_select_own" on public.service_requests for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "sr_insert_own" on public.service_requests for insert to authenticated
  with check ((select auth.uid()) = user_id and status = 'Pending');

create table public.service_tasks (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests(id) on delete cascade,
  title text not null check (char_length(title) <= 300),
  completed boolean not null default false,
  priority text not null default 'Sedang' check (priority in ('Tinggi','Sedang','Rendah')),
  due_date date,
  created_at timestamptz not null default now()
);
create index service_tasks_request_id_idx on public.service_tasks(request_id);
alter table public.service_tasks enable row level security;
create policy "st_select_own" on public.service_tasks for select to authenticated
  using (exists (select 1 from public.service_requests r
                 where r.id = request_id and r.user_id = (select auth.uid())));

-- chat history (HUMI + advisor)
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  channel text not null check (channel in ('humi','advisor')),
  sender text not null check (sender in ('user','ai')),
  content text not null check (char_length(content) <= 20000),
  attachment_name text,
  attachment_type text,
  created_at timestamptz not null default now()
);
create index chat_messages_user_channel_idx on public.chat_messages(user_id, channel, created_at);
alter table public.chat_messages enable row level security;
create policy "chat_select_own" on public.chat_messages for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "chat_insert_own" on public.chat_messages for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "chat_delete_own" on public.chat_messages for delete to authenticated
  using ((select auth.uid()) = user_id);

-- contact form (write-only for the public)
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  phone text check (phone is null or char_length(phone) <= 30),
  subject text check (subject is null or char_length(subject) <= 200),
  message text not null check (char_length(message) between 1 and 5000),
  status text not null default 'new' check (status in ('new','read','replied')),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "contact_insert_public" on public.contact_messages for insert to anon, authenticated
  with check (status = 'new');

-- private KTP bucket, files under <user_id>/...
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ktp', 'ktp', false, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;
create policy "ktp_select_own" on storage.objects for select to authenticated
  using (bucket_id = 'ktp' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "ktp_insert_own" on storage.objects for insert to authenticated
  with check (bucket_id = 'ktp' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "ktp_update_own" on storage.objects for update to authenticated
  using (bucket_id = 'ktp' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "ktp_delete_own" on storage.objects for delete to authenticated
  using (bucket_id = 'ktp' and (storage.foldername(name))[1] = (select auth.uid())::text);
