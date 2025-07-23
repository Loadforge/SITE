import { DslConfig } from "@/@entities";
import { RequestRepository } from "@/db/repositories/request.repository";
import { ResponseRepository } from "@/db/repositories/response.repository";

export class SendService {
  private static requestRepository: RequestRepository = new RequestRepository();
  private static responseRepository: ResponseRepository =
    new ResponseRepository();

  static async getConfigByRequestId(requestId: string): Promise<DslConfig> {
    let parsedBody: any = null;
    let parsedAuth: any = null;

    const fullRequest = await this.requestRepository.getFullRequestById(
      requestId
    );

    if (!fullRequest) {
      throw new Error("Request not found");
    }

    const { request, body, auth, params, advanced } = fullRequest;

    const queryParams: Record<string, string> = {};
    if (params) {
      for (const param of params) {
        queryParams[param.key] = param.value;
      }
    }

    if (body?.type === "json") {
      parsedBody = { type: "Json", content: JSON.parse(body.content) };
    } else if (body?.type === "xml") {
      parsedBody = { type: "Xml", content: body.content };
    }

    switch (auth?.type) {
      case "none":
        parsedAuth = { type: "None" };
        break;
      case "basic":
        parsedAuth = {
          type: "Basic",
          credentials: {
            username: auth.value.username,
            password: auth.value.password,
          },
        };
        break;
      case "bearer":
        parsedAuth = {
          type: "Bearer",
          credentials: {
            token: auth.value.token,
          },
        };
        break;
      case "apiKey":
        parsedAuth = {
          type: "ApiKey",
          credentials: {
            key_name: auth.value.key,
            key_value: auth.value.value,
            in_header: auth.value.addTo === "header",
          },
        };
        break;
    }

    return {
      name: request.title,
      target: request.url,
      method: request.method,
      concurrency: advanced?.concurrency ?? 1,
      duration: advanced?.duration ?? 10,
      timeout: advanced?.timeout ?? undefined,
      body: parsedBody,
      auth: parsedAuth,
      query_params:
        Object.keys(queryParams).length > 0 ? queryParams : undefined,
    };
  }
  static async sendRequest(requestId: string): Promise<any> {
    const fullRequest = await this.requestRepository.getFullRequestById(
      requestId
    );
    const { request, body, auth, headers, params } = fullRequest;

    if (request.method === "GET" && body?.content) {
      throw new Error("GET requests cannot have a body.");
      return;
    }
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
        status: 0,
        statusText: "Network Error",
        headers: {},
        data: {
          message: error instanceof Error ? error.message : String(error),
        },
        duration,
        dataSize: roughSizeOfObject(error),
        headersSize: 0,
      };
    }

    await this.responseRepository.createResponse(requestId, response);
    return response;
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
