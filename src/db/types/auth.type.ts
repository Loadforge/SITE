export type Type = "none" | "bearer" | "basic" | "apiKey";
export type RequestAuth = {
    id: string;
    requestId: string;
    type: Type
    value: object
  };