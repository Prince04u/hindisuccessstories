import "./lib/error-capture";

export default {
async fetch(request: Request, env: any, ctx: any) {
try {
const mod = await import("@tanstack/react-start/server-entry");

```
  const handler: any = mod.default ?? mod;

  return await handler.fetch(request, env, ctx);
} catch (error: any) {
  return new Response(
    `<pre style="padding:20px;white-space:pre-wrap">
```

${error?.stack || error?.message || JSON.stringify(error, null, 2)} </pre>`,
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
