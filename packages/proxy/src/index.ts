// @ts-nocheck

import { getPlatformProxy } from "wrangler";

async function main() {
  const proxy = await getPlatformProxy();

  console.log(await proxy.env.WORKER_A.getBar());
  // "bar"

  console.log(await proxy.env.WORKER_A.baz);
  // "baz"

  console.log(await proxy.env.WORKER_A.foo);
  // [Function: foo]

  console.log(await proxy.env.WORKER_A.foo.getFoo());
  // TypeError: proxy.env.WORKER_A.foo.getFoo is not a function
}

main();
