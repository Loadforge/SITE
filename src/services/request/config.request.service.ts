import { ConfigRepository } from "@/db/repositories/config.test.repository";
import { ConfigTest } from "@/db/types/config.type";

export class RequestConfigTestService {
  private static repository: ConfigRepository = new ConfigRepository();

  static async getConfigTestByRequestId(requestId: string): Promise<ConfigTest> {
    return this.repository.getConfigTestByRequestId(requestId);
  }

  
}
