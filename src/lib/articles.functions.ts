import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export function publicClient() {
const url =
process.env.SUPABASE_URL ||
process.env.VITE_SUPABASE_URL;

const key =
process.env.SUPABASE_PUBLISHABLE_KEY ||
process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
console.error("SUPABASE ENV MISSING", {
url: !!url,
key: !!key,
});

  
throw new Error(
  `Missing Supabase env: URL=${!!url} KEY=${!!key}`
);


}

return createClient<Database>(url, key, {
auth: {
persistSession: false,
autoRefreshToken: false,
storage: undefined,
},
});
}
