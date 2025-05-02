import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";
import { Header } from "../types/headers.type";

export class HeadersRepository {
  private db?: IDBPDatabase;

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createHeader(requestId: string): Promise<Header> {
    const db = await this.getDb();
    const tx = db.transaction("headers", "readwrite");
    const store = tx.objectStore("headers");
    const indexStore = store.index("requestIndex");

    const existingHeaders = await indexStore.getAll(requestId);
    const maxIndex = existingHeaders.reduce(
      (max, h) => Math.max(max, h.index ?? 0),
      -1
    );

    const header: Header = {
      id: crypto.randomUUID(),
      requestId,
      enabled: false,
      key: "newHeader",
      value: "newHeader",
      description: "newHeader",
      index: maxIndex + 1,
    };

    await store.add(header);
    await tx.done;
    return header;
  }

  async getHeadersByRequestId(requestId: string): Promise<Header[]> {
    const db = await this.getDb();
    const tx = db.transaction("headers", "readonly");
    const store = tx.objectStore("headers");
    const index = store.index("requestIndex");

    const headers = await index.getAll(requestId);
    await tx.done;
    return headers.sort((a, b) => a.index - b.index);
  }

  async updateHeader(header: Header): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("headers", "readwrite");
    const store = tx.objectStore("headers");
    await store.put(header);
    await tx.done;
  }

  async deleteHeaderById(headerId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("headers", "readwrite");
    const store = tx.objectStore("headers");
    await store.delete(headerId);
    await tx.done;
  }

  async deleteHeadersByRequestId(requestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("headers", "readwrite");
    const store = tx.objectStore("headers");
    const index = store.index("requestIndex");

    const headers = await index.getAll(requestId);

    for (const header of headers) {
      await store.delete(header.id);
    }

    await tx.done;
  }

  async duplicate(requestId: string, newRequestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("headers", "readwrite");
    const store = tx.objectStore("headers");
    const index = store.index("requestIndex");

    const headers = await index.getAll(requestId);

    for (const header of headers) {
      const duplicated: Header = {
        ...header,
        id: crypto.randomUUID(),
        requestId: newRequestId,
      };
      await store.add(duplicated);
    }

    await tx.done;
  }
}
