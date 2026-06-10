import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment validation for build-time safety
const getSupabaseConfig = () => {
  const url = import.meta.env.PUBLIC_SUPABASE_URL || 'https://qmpdruitzlownnnnjmpk.supabase.co';
  const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtcGRydWl0emxvd25ubm5qbXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NjA0NTYsImV4cCI6MjA2NTIzNjQ1Nn0.OhD3qN4dq0TMA65qVGvry_QsZEeLKK7RbwYP3QzAvcY';
  
  if (!url || !anonKey) {
    console.warn('Supabase configuration missing. Using fallback values.');
  }
  
  return { url, anonKey };
};

const { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY } = getSupabaseConfig();

export { SUPABASE_URL, SUPABASE_ANON_KEY };

declare global {
  interface Window {
    supabase?: SupabaseClient;
  }
}

// SSG-safe client creation with error handling
const createSupabaseClient = () => {
  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        // Persistence for client-side hydration
        persistSession: typeof window !== 'undefined',
        // Storage fallback for SSG
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        // Auto-refresh for client-side sessions
        autoRefreshToken: typeof window !== 'undefined',
        // Detect session in URL (useful for auth callbacks)
        detectSessionInUrl: typeof window !== 'undefined'
      }
    });
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    // Return a mock client for build-time safety
    return null;
  }
};

export const supabase = (() => {
  // Build-time: Return null or basic client
  if (typeof window === 'undefined') {
    return createSupabaseClient();
  }
  
  // Client-side: Use singleton pattern
  if (!window.supabase) {
    const client = createSupabaseClient();
    if (client) {
      window.supabase = client;
    }
  }
  
  return window.supabase || null;
})();

// Type guard for safer usage
export const isSupabaseReady = (): boolean => {
  return supabase !== null && typeof window !== 'undefined';
};

// Helper to get typed supabase client (only when ready)
export const getSupabaseClient = (): SupabaseClient | null => {
  return isSupabaseReady() ? supabase : null;
};
