import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";
import { ConfigTest } from "../types/config.type";

export class ConfigRepository {
  private db?: IDBPDatabase;

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createConfigTest(requestId: string, config: ConfigTest): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("configTest", "readwrite");
    const store = tx.objectStore("configTest");
    const index = store.index("requestIndex");

    let existing: ConfigTest | undefined;
    try {
      existing = await index.get(requestId);
    } catch {
      console.warn("Index requestIndex not found, creating new record.");
    }

    const configTest: ConfigTest = {
      id: existing?.id ?? crypto.randomUUID(),
      requestId,
      concurrency: config.concurrency,
      duration: config.duration,
      hardware_info: {
        cpu_cores: config.hardware_info.cpu_cores,
        free_ram_mb: config.hardware_info.free_ram_mb,
        total_ram_mb: config.hardware_info.total_ram_mb,
      },
    };

    await store.put(configTest);
    await tx.done;
  }

  async getConfigTestByRequestId(requestId: string): Promise<ConfigTest> {
    const db = await this.getDb();
    const tx = db.transaction("configTest", "readonly");
    const store = tx.objectStore("configTest");
    const index = store.index("requestIndex");

    return index.get(requestId);
  }

  async deleteConfigTestByRequestId(requestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("configTest", "readwrite");
    const store = tx.objectStore("configTest");
    const index = store.index("requestIndex");

    const record = await index.get(requestId);
    if (record) {
      await store.delete(record.id);
    }

    await tx.done;
  }
}
