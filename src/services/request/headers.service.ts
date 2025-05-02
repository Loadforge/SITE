import { HeadersRepository } from "@/db/repositories/headers.repository";
import { Header } from "@/db/types/headers.type";

export class ParamsService {
  private static repository: HeadersRepository = new HeadersRepository();

  static async create(requestId: string): Promise<Header> {
    return this.repository.createHeader(requestId);
  }

  static async getByRequestId(requestId: string): Promise<Header[]> {
    return this.repository.getHeadersByRequestId(requestId);
  }

  static async update(param: Header): Promise<void> {
    return this.repository.updateHeader(param);
  }

  static async deleteById(headerId: string): Promise<void> {
    return this.repository.deleteHeaderById(headerId);
}
}