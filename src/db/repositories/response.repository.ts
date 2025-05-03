import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";

import { RequestRepository } from "./request.repository";

export class ResponseRepository {
  private db?: IDBPDatabase;
  private requestRepository: RequestRepository;

  constructor() {
    this.requestRepository = new RequestRepository();
  }

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createResponse(id: string, responseData: any): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("response", "readwrite");
    const store = tx.objectStore("response");

    const responseObject = {
      id: id,
      requestId: id,
      status: responseData.status,
      statusText: responseData.statusText,
      headers: responseData.headers,
      data: responseData.data,
      duration: responseData.duration,
      dataSize: responseData.dataSize,
    };

    await store.put(responseObject);
    await tx.done;
  }

  async sendRequest(requestId: string): Promise<any> {
    const fullRequest = await this.requestRepository.getFullRequestById(
      requestId
    );
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

    let data: any = undefined;

    if (body?.type === "json") {
      headersObject["Content-Type"] = "application/json";
      try {
        data =
          typeof body.content === "string"
            ? JSON.parse(body.content)
            : body.content;
      } catch {
        data = body.content;
      }
    } else if (body?.type === "xml") {
      headersObject["Content-Type"] = "application/xml";
      data = body.content;
    }

    if (auth?.type === "basic") {
      const authString = btoa(`${auth.value.username}:${auth.value.password}`);
      headersObject["Authorization"] = `Basic ${authString}`;
    }
    if (auth?.type === "bearer") {
      headersObject["Authorization"] = `Bearer ${auth.value.token}`;
    }
    if (auth?.type === "apiKey") {
      const { key, value, addTo } = auth.value;
      if (key && value) {
        if (addTo === "header") {
          headersObject[key] = value;
        } else if (addTo === "query") {
          url.searchParams.append(key, value);
        }
      }
    }

    const fetchOptions: RequestInit = {
      method: request.method,
      headers: headersObject,
      body:
        data !== undefined
          ? typeof data === "string"
            ? data
            : JSON.stringify(data)
          : undefined,
    };

    const startTime = performance.now();
    const res = await fetch(url.toString(), fetchOptions);
    const endTime = performance.now();
    const duration = endTime - startTime;

    const contentType = res.headers.get("Content-Type") || "";
    let responseData: any;
    if (contentType.includes("application/json")) {
      responseData = await res.json();
    } else {
      responseData = await res.text();
    }

    const response = {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      data: responseData,
      duration,
    };

    await this.createResponse(requestId, response);
    return response;
  }

  async getByRequestId(requestId: string): Promise<any> {
    const db = await this.getDb();
    const tx = db.transaction("response", "readonly");
    const store = tx.objectStore("response");

    const result = await store.get(requestId);
    await tx.done;
    return result;
  }
}
