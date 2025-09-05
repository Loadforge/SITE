export interface MetricsTest {
  id?: string;
  requestId: string;
  concurrency: number;
  duration_secs: number;
  failed_requests: number;
  fastest_response_ms: number;
  http_method: string;
  median_response_ms: number;
  slowest_response_ms: number;
  status: string;
  status_counts: Record<string, number>;
  successful_requests: number;
  target_url: string;
  throughput_rps: number;
  timestamp: string;
  total_requests: number;
}
