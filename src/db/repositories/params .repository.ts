import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";
import { Param } from "../types/params.type";

export class ParamsRepository {
  private db?: IDBPDatabase;

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createParam(requestId: string): Promise<Param> {
    const db = await this.getDb();
    const tx = db.transaction("params", "readwrite");
    const store = tx.objectStore("params");
    const indexStore = store.index("requestIndex");

    const existingParams = await indexStore.getAll(requestId);
    const maxIndex = existingParams.reduce((max, p) => Math.max(max, p.index ?? 0), -1);

    const param: Param = {
      id: crypto.randomUUID(),
      requestId,
      enabled: false,
      key: "newParam",
      value: "newParam",
      index: maxIndex + 1,
    };

    await store.add(param);
    await tx.done;
    return param;
  }

  async getParamsByRequestId(requestId: string): Promise<Param[]> {
    const db = await this.getDb();
    const tx = db.transaction("params", "readonly");
    const store = tx.objectStore("params");
    const index = store.index("requestIndex");

    const params = await index.getAll(requestId);
    return params.sort((a, b) => a.index - b.index);
  }

  async updateParam(param: Param): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("params", "readwrite");
    const store = tx.objectStore("params");
    await store.put(param);
    await tx.done;
  }

  async deleteParamById(paramId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("params", "readwrite");
    const store = tx.objectStore("params");
    await store.delete(paramId);
    await tx.done;
  }

  async deleteParamsByRequestId(requestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("params", "readwrite");
    const store = tx.objectStore("params");
    const index = store.index("requestIndex");

    const params = await index.getAll(requestId);

    for (const param of params) {
      await store.delete(param.id);
    }

    await tx.done;
  }

  async duplicate(requestId: string, newRequestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("params", "readwrite");
    const store = tx.objectStore("params");
    const index = store.index("requestIndex");

    const params = await index.getAll(requestId);

    for (const param of params) {
      const duplicated: Param = {
        ...param,
        id: crypto.randomUUID(),
        requestId: newRequestId,
      };
      await store.add(duplicated);
    }

    await tx.done;
  }
  
  async importParamsFromJson(params: Param[], newRequestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("params", "readwrite");
    const store = tx.objectStore("params");
  
    for (const param of params) {
      const importedParam: Param = {
        ...param,
        id: crypto.randomUUID(), 
        requestId: newRequestId, 
      };
      await store.add(importedParam);
    }
  
    await tx.done;
  }
}
