import "./lib/error-capture";

type ServerEntry = {
  fetch: (
    request: Request,
    env: unknown,
    ctx: unknown
  ) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry
    );
  }

  return serverEntryPromise;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();

      const response = await handler.fetch(request, env, ctx);

      if (response.status >= 500) {
        const text = await response.clone().text();

        return new Response(
          `<pre style="white-space:pre-wrap;padding:20px">${text}</pre>`,
          {
            status: 500,
            headers: {
              "content-type": "text/html; charset=utf-8",
            },
          }
        );
      }

      return response;
    } catch (error: any) {
      return new Response(
        `<pre style="white-space:pre-wrap;padding:20px">
${error?.stack || error?.message || String(error)}
</pre>`,
        {
          status: 500,
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        }
      );
    }
  },
};
