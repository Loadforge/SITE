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
      headersSize: responseData.headersSize,
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
    let response: any;

    try {
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

      const headersResult = Object.fromEntries(res.headers.entries());

      response = {
        status: res.status,
        statusText: res.statusText,
        headers: headersResult,
        data: responseData,
        duration,
        dataSize: roughSizeOfObject(responseData),
        headersSize: roughSizeOfObject(headersResult),
      };
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      response = {
        status: 404,
        statusText: "Not Found",
        headers: {},
        data: error instanceof Error ? error.message : String(error),
        duration,
        dataSize: roughSizeOfObject(error),
        headersSize: 0,
      };
    }

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
function roughSizeOfObject(object: any): number {
  const objectList: any[] = [];
  const stack: any[] = [object];
  let bytes = 0;

  while (stack.length) {
    const value = stack.pop();

    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (
      typeof value === "object" &&
      value !== null &&
      !objectList.includes(value)
    ) {
      objectList.push(value);
      for (const i in value) {
        stack.push(value[i]);
      }
    }
  }

  return bytes;
}
