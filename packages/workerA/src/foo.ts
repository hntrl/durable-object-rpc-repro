import { DurableObject, RpcTarget } from "cloudflare:workers";

export class FooDurableObject extends DurableObject {
  private counterValue: number = 0;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      let storedValue = await ctx.storage.get<number>("state");
      if (storedValue) this.counterValue = storedValue;
    });
  }

  private rpcTarget = class extends RpcTarget {
    private stub: FooDurableObject;

    constructor(stub: FooDurableObject) {
      super();
      this.stub = stub;
    }

    async complexReturnType() {
      return { a: "foo", b: "bar" };
    }

    async getCounterValue() {
      return this.stub.counterValue;
    }

    async increment(amount = 1) {
      this.stub.counterValue += amount;
      await this.stub.ctx.storage.put("value", this.stub.counterValue);
      return this.stub.counterValue;
    }

    async decrement(amount = 1) {
      this.stub.counterValue -= amount;
      await this.stub.ctx.storage.put("value", this.stub.counterValue);
      return this.stub.counterValue;
    }
  };

  getRpcTarget() {
    return new this.rpcTarget(this);
  }
}
