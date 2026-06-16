export function publicClient() {
  console.log("URL:", process.env.SUPABASE_URL);
  console.log("KEY:", !!process.env.SUPABASE_PUBLISHABLE_KEY);

  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
