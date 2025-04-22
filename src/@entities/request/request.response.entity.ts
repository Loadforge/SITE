export type RequestResponse = {
  status: number;
  statusText: string;
  body: unknown;
  headers: Record<string, string>;
  duration: number;
  timestamp: string;
};
