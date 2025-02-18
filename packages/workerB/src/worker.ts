export default {
  async fetch(request: Request, env: Env) {
    const counter = await env.WORKER_A.getCounter("constant");
    const value = await counter.increment();
    return new Response(value.toString());
  },
};
