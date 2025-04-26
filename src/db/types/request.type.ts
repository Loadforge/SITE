export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Request {
  id: string;
  projectId: string;
  title: string;
  method: Method;
  url: string;
}
