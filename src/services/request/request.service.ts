import { RequestRepository } from "@/db/repositories/request.repository";
import { Request } from "@/db/types/request.type";

export class RequestService {
  private static repository: RequestRepository = new RequestRepository();

  static async create(projectId: string): Promise<Request> {
    return this.repository.createRequest(projectId);
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
  static async rename(id: string, newTitle: string): Promise<Request> {
    return this.repository.renameRequest(id, newTitle);
  }
  static async updateMethod(id: string, method: string): Promise<Request> {
    return this.repository.updateRequestMethod(id, method);
  }

  static async updateUrl(id: string, url: string): Promise<Request> {
    return this.repository.updateRequestUrl(id, url);
  }
  static async duplicate(request: Request): Promise<Request> {
    return this.repository.duplicate(request);
  }
}
