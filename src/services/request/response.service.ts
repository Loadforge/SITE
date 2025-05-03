import { ResponseRepository } from "@/db/repositories/response.repository";

export class ResponseService {
  private static repository: ResponseRepository = new ResponseRepository();

  static async sendRequest(requestId: string): Promise<any> {
    return this.repository.sendRequest(requestId);
  }
  static async getResponse(requestId: string): Promise<any> {
    return this.repository.getByRequestId(requestId);
  }
}
