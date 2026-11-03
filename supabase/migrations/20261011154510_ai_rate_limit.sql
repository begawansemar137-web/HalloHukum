create table public.ai_usage (
  bucket text not null,
  window_start timestamptz not null,
  count integer not null default 0,
  primary key (bucket, window_start)
);
alter table public.ai_usage enable row level security; -- no policies: service role only

create or replace function public.ai_rate_hit(p_bucket text, p_window timestamptz)
returns integer language sql security definer set search_path = '' as $$
  insert into public.ai_usage as u (bucket, window_start, count)
  values (p_bucket, p_window, 1)
  on conflict (bucket, window_start) do update set count = u.count + 1
  returning u.count;
$$;
revoke execute on function public.ai_rate_hit(text, timestamptz) from public, anon, authenticated;
