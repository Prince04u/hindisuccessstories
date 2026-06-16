```ts
import "./lib/error-capture";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      const mod = await import("@tanstack/react-start/server-entry");

      const handler: any = mod.default ?? mod;

      return await handler.fetch(request, env, ctx);
    } catch (error: any) {
      console.error("SERVER ENTRY CRASH:", error);

      return new Response(
        `<pre>${error?.stack || error?.message || String(error)}</pre>`,
        {
          status: 500,
          headers: {
            "content-type": "text/html;charset=utf-8",
          },
        }
      );
    }
  },
};
```
