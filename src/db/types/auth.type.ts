export type RequestAuth = {
    id: string;
    requestId: string;
    type: "none" | "bearer" | "basic" | "apiKey";
    value: object
  };