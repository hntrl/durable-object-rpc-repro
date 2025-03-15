import { RpcTarget, WorkerEntrypoint } from "cloudflare:workers";

class FooTarget extends RpcTarget {
  async getFoo() {
    return "foo";
  }
}

export default class WorkerA extends WorkerEntrypoint<Env> {
  get foo() {
    return new FooTarget();
  }

  getBar() {
    return "bar";
  }

  get baz() {
    return "baz";
  }
}
