export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === "/foo") {
      const counter = env.WORKER_A.getCounter("constant");
      const value = await counter.increment();
      return new Response(value.toString());
    } else if (pathname === "/bar") {
      const bar = await env.WORKER_A.getBar();
      const message = await bar.print("Hello");
      return new Response(message);
    }
    return new Response("Not found", { status: 404 });
  },
};
