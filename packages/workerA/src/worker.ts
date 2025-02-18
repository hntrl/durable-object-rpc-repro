import { WorkerEntrypoint } from "cloudflare:workers";

export default class WorkerA extends WorkerEntrypoint<Env> {
  async getCounter(id: string) {
    const obj = this.env.FOO_OBJECT.idFromName(id);
    const stub = this.env.FOO_OBJECT.get(obj);
    return stub;
  }
}

export { FooDurableObject } from "./foo";
