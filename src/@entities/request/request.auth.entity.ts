export type RequestAuth = {
  type: "none" | "bearer" | "basic" | "apiKey";
  bearerToken?: string;
  basic?: {
    username: string;
    password: string;
  };
  apiKey?: {
    key: string;
    value: string;
    addTo: "header" | "query";
  };
};