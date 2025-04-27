import { BodyRepository } from "@/db/repositories/body.repository";
import { RequestBody } from "@/db/types";

export class RequestBodyService {
  private static repository: BodyRepository = new BodyRepository();

  static async getBodyByRequestId(requestId: string): Promise<RequestBody> {
    return this.repository.getBodyByRequestId(requestId);
  }

  static async update(body: RequestBody): Promise<void> {
    return this.repository.updateBody(body);
  }
}
