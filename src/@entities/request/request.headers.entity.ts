export type RequestHeaders = {
  headers: RequestHeader[];
};

export type RequestHeader = {
  key: string;
  value: string;
  enabled?: boolean;
};
