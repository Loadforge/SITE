import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";

import { Request } from "./../types/request.type";

import { BodyRepository } from "./body.repository";
import { DocsRepository } from "./docs.repository";

export class RequestRepository {
  private db?: IDBPDatabase;
  private bodyRepository: BodyRepository;
  private docsRepository: DocsRepository;

  constructor() {
    this.bodyRepository = new BodyRepository();
    this.docsRepository = new DocsRepository();
  }

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createRequest(id: string): Promise<void> {
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
    await this.bodyRepository.deleteBodyByRequestId(id);
    await this.docsRepository.deleteDocsByRequestId(id);
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
}
