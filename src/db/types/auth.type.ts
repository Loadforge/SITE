export type Type = "none" | "bearer" | "basic" | "apiKey";

export type ApiKeyAuth = {
  key: string;
  value: string;
  addTo: "header" | "query";
  enabled: boolean;
};

export type BasicAuth = {
  username: string;
  password: string;
  enabled: boolean;
};

export type BearerAuth = {
  token: string;
  enabled: boolean;
};

export type AuthValue =
  | { type: "none" }
  | { type: "apiKey"; value: ApiKeyAuth | null }
  | { type: "basic"; value: BasicAuth | null }
  | { type: "bearer"; value: BearerAuth |null };

export type RequestAuth = {
  id: string;
  requestId: string;
  value: AuthValue;
};
