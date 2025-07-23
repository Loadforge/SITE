import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";
import { RequestAdvanced } from "../types/advanced.type";

export class AdvancedRepository {
  private db?: IDBPDatabase;

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createAdvanced(requestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("advanced", "readwrite");
    const store = tx.objectStore("advanced");

    const advanced: RequestAdvanced = {
      id: crypto.randomUUID(),
      requestId,
      runTest: false,
      concurrency: 0,
      duration: 0,
      timeoutEnabled: false,
      timeout: 0,
    };

    await store.add(advanced);
    await tx.done;
  }

  async getAdvancedByRequestId(requestId: string): Promise<RequestAdvanced> {
    const db = await this.getDb();
    const tx = db.transaction("advanced", "readonly");
    const store = tx.objectStore("advanced");
    const index = store.index("requestIndex");

    return index.get(requestId);
  }

  async updateAdvanced(data: RequestAdvanced): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("advanced", "readwrite");
    const store = tx.objectStore("advanced");

    await store.put(data);
    await tx.done;
  }

  async deleteAdvancedByRequestId(requestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("advanced", "readwrite");
    const store = tx.objectStore("advanced");
    const index = store.index("requestIndex");

    const record = await index.get(requestId);
    if (record) {
      await store.delete(record.id);
    }

    await tx.done;
  }

  async duplicate(requestId: string, newRequestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("advanced", "readwrite");
    const store = tx.objectStore("advanced");
    const index = store.index("requestIndex");

    const existing = await index.get(requestId);

    if (existing) {
      const duplicated: RequestAdvanced = {
        ...existing,
        id: crypto.randomUUID(),
        requestId: newRequestId,
      };
      await store.add(duplicated);
    }

    await tx.done;
  }

  async importFromJson(
    data: RequestAdvanced,
    newRequestId: string
  ): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("advanced", "readwrite");
    const store = tx.objectStore("advanced");

    const imported: RequestAdvanced = {
      ...data,
      id: crypto.randomUUID(),
      requestId: newRequestId,
    };

    await store.add(imported);
    await tx.done;
  }
}
