export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Request {
  id: string;
  projectId: string;
  title: string;
  method: Method;
  index: number;
  url: string;
}
