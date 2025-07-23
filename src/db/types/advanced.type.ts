export interface RequestAdvanced {
  id: string;
  requestId: string;
  runTest: boolean;
  concurrency: number;
  duration: number;
  timeoutEnabled: boolean;
  timeout: number; 
}
