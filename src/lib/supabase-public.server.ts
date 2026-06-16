```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export function publicClient() {
  console.log("SERVER ENV CHECK");
  console.log("SUPABASE_URL =", process.env.SUPABASE_URL);
  console.log(
    "SUPABASE_PUBLISHABLE_KEY =",
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  throw new Error("STOP HERE");

  return createClient<Database>("x", "x");
}
```
