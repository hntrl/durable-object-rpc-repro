import { WorkerEntrypoint } from "cloudflare:workers";
import { BarRpcTarget } from "./bar";

export default class WorkerA extends WorkerEntrypoint<Env> {
  async getCounter(id: string) {
    const obj = this.env.FOO_OBJECT.idFromName(id);
    const stub = this.env.FOO_OBJECT.get(obj);
    return stub;
  }
  async getBar() {
    const bar = new BarRpcTarget();
    return bar;
  }
}

export { FooDurableObject } from "./foo";
