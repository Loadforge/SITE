export type DslConfig = {
  name: string;
  target: string;
  method: HttpMethod;
  concurrency: number;
  duration: number;
  timeout?: number;
  body?: Body;
  auth?: Auth;
  query_params?: Record<string, string>;
};

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

export type Body =
  | { type: "Json"; content: any }
  | { type: "Xml"; content: string };

export type Auth =
  | { type: "None" }
  | { type: "Basic"; credentials: { username: string; password: string } }
  | { type: "Bearer"; credentials: { token: string } }
  | {
      type: "ApiKey";
      credentials: { key_name: string; key_value: string; in_header: boolean };
    };
