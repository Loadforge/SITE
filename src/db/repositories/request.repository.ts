import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";

import { Request } from "./../types/request.type";

import { AuthRepository } from "./auth.repository";
import { BodyRepository } from "./body.repository";
import { DocsRepository } from "./docs.repository";
import { ParamsRepository } from "./params .repository";

export class RequestRepository {
  private db?: IDBPDatabase;
  private bodyRepository: BodyRepository;
  private docsRepository: DocsRepository;
  private authrepository: AuthRepository;
  private paramsrepository: ParamsRepository;


  constructor() {
    this.bodyRepository = new BodyRepository();
    this.docsRepository = new DocsRepository();
    this.authrepository = new AuthRepository();
    this.paramsrepository = new ParamsRepository();

  }

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createRequest(id: string): Promise<Request> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");
    const request: Request = {
      id: crypto.randomUUID(),
      projectId: id,
      title: "Nova Requisição",
      method: "GET",
      url: "",
    };
    await store.add(request);
    await this.bodyRepository.createBody(request.id);
    await this.docsRepository.createDocs(request.id);
    await this.authrepository.createAuth(request.id);
    return request;
  }

  async getRequestsByProjectId(projectId: string): Promise<Request[]> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readonly");
    const store = tx.objectStore("request");
    const index = store.index("projectIndex");
    return index.getAll(projectId);
  }

  async getRequestById(id: string): Promise<Request | undefined> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readonly");
    const store = tx.objectStore("request");
    return store.get(id);
  }

  async updateRequest(request: Request): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");
    await store.put(request);
  }

  async deleteRequest(id: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");
    await store.delete(id);
    await this.docsRepository.deleteDocsByRequestId(id);
    await this.bodyRepository.deleteBodyByRequestId(id);
    await this.authrepository.deleteAuthByRequestId(id);
    await this.paramsrepository.deleteParamsByRequestId(id);
  }
  async deleteAllRequestsByProjectId(id: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");

    const index = store.index("projectIndex");
    const requests = await index.getAll(id);

    for (const request of requests) {
      await this.deleteRequest(request.id);
    }

    await tx.done;
  }
  async renameRequest(id: string, newTitle: string): Promise<Request> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");

    const request = await store.get(id);
    if (request) {
      request.title = newTitle;
      await store.put(request);
    }

    await tx.done;
    return request;
  }
  async updateRequestMethod(id: string, method: string): Promise<Request> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");

    const request = await store.get(id);
    if (request) {
      request.method = method;
      await store.put(request);
    }

    await tx.done;
    return request;
  }

  async updateRequestUrl(id: string, url: string): Promise<Request> {
    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");

    const request = await store.get(id);
    if (request) {
      request.url = url;
      await store.put(request);
    }

    await tx.done;
    return request;
  }

  async duplicate(request: Request): Promise<Request> {
    const id = crypto.randomUUID();
    const duplicatedRequest: Request = {
      ...request,
      title: `${request.title} (Copy)`,
      id: id,
    };

    const db = await this.getDb();
    const tx = db.transaction("request", "readwrite");
    const store = tx.objectStore("request");

    await store.add(duplicatedRequest);

    await tx.done;
    await this.bodyRepository.duplicate(request.id, id);
    await this.authrepository.duplicate(request.id, id);
    await this.docsRepository.duplicate(request.id, id);
    await this.paramsrepository.duplicate(request.id,id)

    return duplicatedRequest;
  }
}
