import { MetricsRepository } from "@/db/repositories/metrics.test.repository";
import { MetricsTest } from "@/db/types/metrics.type";

export class RequestMetricsTestService {
  private static repository: MetricsRepository = new MetricsRepository();

  static async getMetricsTestByRequestId(
    requestId: string
  ): Promise<MetricsTest> {
    return this.repository.getMetricsTestByRequestId(requestId);
  }

  static async createOrUpdateMetricsTest(
    requestId: string,
    metrics: MetricsTest
  ): Promise<void> {
    return this.repository.createMetricsTest(requestId, metrics);
  }
}
