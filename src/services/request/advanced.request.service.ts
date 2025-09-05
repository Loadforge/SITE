import { AdvancedRepository } from "@/db/repositories/advanced.repository";
import { RequestAdvanced } from "@/db/types/advanced.type";

export class RequestAdvancedService {
  private static repository: AdvancedRepository = new AdvancedRepository();

  static async getAdvancedByRequestId(requestId: string): Promise<RequestAdvanced> {
    return this.repository.getAdvancedByRequestId(requestId);
  }

  static async update(advanced: RequestAdvanced): Promise<void> {
    return this.repository.updateAdvanced(advanced);
  }
}
