import axios from "axios";

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

  static async sendRequest(id: string): Promise<any> {
    const fullRequest = await this.repository.getFullRequestById(id);
    const { request, body, auth, headers, params } = fullRequest;

    const headersObject =
      headers?.reduce((acc: Record<string, string>, h: any) => {
        if (h.key && h.value) acc[h.key] = h.value;
        return acc;
      }, {}) || {};

    const url = new URL(request.url);
    if (params?.length) {
      params.forEach((p: any) => {
        if (p.key && p.value) url.searchParams.append(p.key, p.value);
      });
    }

    const data =
      body?.type === "json" || body?.type === "xml" ? body.content : undefined;

    if (auth?.type === "basic") {
      const authString = btoa(`${auth.value.username}:${auth.value.password}`);
      headersObject["Authorization"] = `Basic ${authString}`;
    }

    const startTime = performance.now();

    const response = await axios({
      method: request.method.toLowerCase(),
      url: url.toString(),
      headers: headersObject,
      data,
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`Tempo de resposta: ${duration}ms`);

    return { response, duration };
  }
}
