import { MetricsRepository } from "@/db/repositories/metrics.test.repository";
import { MetricsTest } from "@/db/types/metrics.type";

export class RequestMetricsTestService {
  private static repository: MetricsRepository = new MetricsRepository();

  static async getMetricsTestByRequestId(
    requestId: string
  ): Promise<MetricsTest> {
    return this.repository.getMetricsTestByRequestId(requestId);
  }
}
