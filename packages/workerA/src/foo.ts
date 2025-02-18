import { DurableObject } from "cloudflare:workers";

export class FooDurableObject extends DurableObject {
  private counterValue: number = 0;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      let storedValue = await ctx.storage.get<number>("state");
      if (storedValue) this.counterValue = storedValue;
    });
  }

  async getCounterValue() {
    return this.counterValue;
  }

  async increment(amount = 1) {
    this.counterValue += amount;
    await this.ctx.storage.put("value", this.counterValue);
    return this.counterValue;
  }

  async decrement(amount = 1) {
    this.counterValue -= amount;
    await this.ctx.storage.put("value", this.counterValue);
    return this.counterValue;
  }
}
