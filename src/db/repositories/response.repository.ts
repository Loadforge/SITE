import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";

export class ResponseRepository {
  private db?: IDBPDatabase;

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

  async getByRequestId(requestId: string): Promise<any> {
    const db = await this.getDb();
    const tx = db.transaction("response", "readonly");
    const store = tx.objectStore("response");

    const result = await store.get(requestId);
    await tx.done;
    return result;
  }
}
