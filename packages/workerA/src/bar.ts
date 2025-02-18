import { RpcTarget } from "cloudflare:workers";

export class BarRpcTarget extends RpcTarget {
  async print(message: string) {
    return message + " from Bar";
  }
}
