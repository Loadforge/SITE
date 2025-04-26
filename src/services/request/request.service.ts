import { RequestRepository } from "@/db/repositories/request.repository";
import { Request } from "@/db/types/request.type";

export class RequestService {
  private static repository: RequestRepository = new RequestRepository();

  static async create(projectId: string): Promise<void> {
    const defaultRequest: Request = {
      id: crypto.randomUUID(),
      title: "Nova Requisição",
      method: "GET",
      url: "",
      projectId,
    };
    return this.repository.createRequest(defaultRequest);
  }

  static async getById(id: string): Promise<Request | undefined> {
    return this.repository.getRequestById(id);
  }

  static async getByProjectId(projectId: string): Promise<Request[]> {
    return this.repository.getRequestsByProjectId(projectId);
  }

  static async update(request: Request): Promise<void> {
    return this.repository.updateRequest(request);
  }

  static async delete(id: string): Promise<void> {
    return this.repository.deleteRequest(id);
  }

  
}
