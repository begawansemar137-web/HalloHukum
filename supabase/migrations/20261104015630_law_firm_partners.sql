-- Law firms shown on the Partner page, and applications from firms that want to join.

create table public.law_firm_partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,80}$'),
  name text not null check (char_length(name) between 2 and 160),
  city text not null check (char_length(city) between 2 and 80),
  founded_year int check (founded_year between 1900 and 2100),
  lawyer_count int check (lawyer_count between 1 and 10000),
  practice_areas text[] not null default '{}' check (cardinality(practice_areas) <= 12),
  description text not null check (char_length(description) between 20 and 2000),
  website text check (website is null or website ~ '^https://'),
  -- Placeholder firms are labelled "Contoh" on the page until real partners replace them.
  is_sample boolean not null default false,
  published boolean not null default false,
  sort_order int not null default 100,
  created_at timestamptz not null default now()
);
alter table public.law_firm_partners enable row level security;
create policy "partners_select_published" on public.law_firm_partners for select to anon, authenticated
  using (published);
grant select on public.law_firm_partners to anon, authenticated;

create table public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  firm_name text not null check (char_length(firm_name) between 2 and 160),
  contact_name text not null check (char_length(contact_name) between 2 and 120),
  email text not null check (char_length(email) between 3 and 200 and email like '%@%'),
  phone text not null check (char_length(phone) between 6 and 30),
  city text not null check (char_length(city) between 2 and 80),
  lawyer_count int check (lawyer_count between 1 and 10000),
  practice_areas text not null check (char_length(practice_areas) between 2 and 500),
  website text check (website is null or char_length(website) <= 300),
  message text check (message is null or char_length(message) <= 3000),
  status text not null default 'new' check (status in ('new','reviewing','accepted','declined')),
  created_at timestamptz not null default now()
);
alter table public.partner_applications enable row level security;
-- Visitors can submit an application but never read any back.
create policy "partner_applications_insert_public" on public.partner_applications for insert to anon, authenticated
  with check (status = 'new');
revoke all on public.partner_applications from anon, authenticated;
grant insert (firm_name, contact_name, email, phone, city, lawyer_count, practice_areas, website, message)
  on public.partner_applications to anon, authenticated;

insert into public.law_firm_partners
  (slug, name, city, founded_year, lawyer_count, practice_areas, description, is_sample, published, sort_order)
values
  ('contoh-nusantara-legal', 'Nusantara Legal & Partners', 'Jakarta', 2009, 24,
   array['Korporasi', 'Perizinan usaha', 'Kontrak komersial'],
   'Mendampingi UMKM dan perusahaan rintisan sejak pendirian badan usaha hingga ekspansi, termasuk penyusunan perjanjian dengan investor, pemasok, dan distributor.',
   true, true, 10),
  ('contoh-garuda-ki', 'Garuda Kekayaan Intelektual', 'Bandung', 2014, 11,
   array['Merek', 'Hak cipta', 'Sengketa KI'],
   'Berfokus pada perlindungan merek dan hak cipta bagi pelaku usaha kreatif, mulai dari penelusuran merek, pendaftaran ke DJKI, sampai penanganan pelanggaran.',
   true, true, 20),
  ('contoh-samudra-litigasi', 'Samudra Litigasi', 'Surabaya', 2006, 18,
   array['Litigasi perdata', 'Penagihan piutang', 'Ketenagakerjaan'],
   'Menangani sengketa bisnis di pengadilan dan di luar pengadilan, termasuk somasi, penagihan piutang macet, dan perselisihan hubungan kerja.',
   true, true, 30);
