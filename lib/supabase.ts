import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env ?? {};
const url: string | undefined = env.VITE_SUPABASE_URL;
const anonKey: string | undefined = env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set (see .env.example).');
}

// PKCE puts the auth code in the query string (?code=...), which keeps the
// URL hash free for HashRouter.
export const supabase = createClient(url, anonKey, {
  auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
