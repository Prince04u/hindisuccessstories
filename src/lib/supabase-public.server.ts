import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export function publicClient() {
  console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
  console.log(
    "SUPABASE_PUBLISHABLE_KEY =",
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  throw new Error(
    `URL=${!!process.env.SUPABASE_URL} KEY=${!!process.env.SUPABASE_PUBLISHABLE_KEY}`
  );

  return createClient<Database>("x", "x");
}
