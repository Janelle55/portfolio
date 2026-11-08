import { createClient } from '@supabase/supabase-js';

// These come from Vercel (Project > Settings > Environment Variables)
// or from a local .env file. The anon key is safe to expose: the database
// security rules decide what it can do.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const isConfigured = Boolean(supabase);
