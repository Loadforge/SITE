import { AuthRepository } from "@/db/repositories/auth.repository";
import { RequestAuth } from "@/db/types";

export class RequestAdvancedService {
  private static repository: AuthRepository = new AuthRepository();

  static async getAuthByRequestId(requestId: string): Promise<RequestAuth> {
    return this.repository.getAuthByRequestId(requestId);
  }

  static async update(auth: RequestAuth): Promise<void> {
    return this.repository.updateauth(auth);
  }
}
