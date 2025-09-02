import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";
import { MetricsTest } from "../types/metrics.type";

export class MetricsRepository {
  private db?: IDBPDatabase;

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }

  async createMetricsTest(
    requestId: string,
    metrics: MetricsTest
  ): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("metricsTest", "readwrite");
    const store = tx.objectStore("metricsTest");
    const index = store.index("requestId");

    const existing = await index.get(requestId);

    const metricsTest: MetricsTest = {
      id: existing?.id ?? crypto.randomUUID(),
      requestId,
      concurrency: metrics.concurrency,
      duration_secs: metrics.duration_secs,
      failed_requests: metrics.failed_requests,
      fastest_response_ms: metrics.fastest_response_ms,
      http_method: metrics.http_method,
      median_response_ms: metrics.median_response_ms,
      slowest_response_ms: metrics.slowest_response_ms,
      status: metrics.status,
      status_counts: metrics.status_counts,
      successful_requests: metrics.successful_requests,
      target_url: metrics.target_url,
      throughput_rps: metrics.throughput_rps,
      timestamp: metrics.timestamp,
      total_requests: metrics.total_requests,
    };

    await store.put(metricsTest);
    await tx.done;
  }

  async getMetricsTestByRequestId(requestId: string): Promise<MetricsTest> {
    const db = await this.getDb();
    const tx = db.transaction("metricsTest", "readonly");
    const store = tx.objectStore("metricsTest");
    const index = store.index("requestIndex");

    return index.get(requestId);
  }

  async deleteMetricsTestByRequestId(requestId: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("metricsTest", "readwrite");
    const store = tx.objectStore("metricsTest");
    const index = store.index("requestIndex");

    const record = await index.get(requestId);
    if (record) {
      await store.delete(record.id);
    }

    await tx.done;
  }
}
