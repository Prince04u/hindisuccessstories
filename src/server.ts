import "./lib/error-capture";

export default {
  async fetch() {
    try {
      await import("@/integrations/supabase/auth-middleware");

      return new Response("AUTH IMPORT OK");
    } catch (e: any) {
      return new Response(
        e?.stack || e?.message || String(e),
        { status: 500 }
      );
    }
  },
};
