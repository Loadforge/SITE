import { IconType } from "react-icons/lib";

export type RequestBody = {
  type: "json" | "xml" | "none";
  content?: string;
};

export type RequestDocs = {
  description?: string;
  comments?: string[];
};

export type RequestParams = Record<string, string>;

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

export type RequestHeader = {
  key: string;
  value: string;
  enabled?: boolean;
};

export type RequestResponse = {
  status: number;
  statusText: string;
  body: unknown;
  headers: Record<string, string>;
  duration: number;
  timestamp: string;
};


export type RequestEntity = {
  id: string;
  title: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body: RequestBody;
  /*docs?: RequestDocs;
  params?: RequestParams;
  auth?: RequestAuth;
  headers?: RequestHeader[];
  response?: RequestResponse;*/

};

export type FolderEntity = {
  id: string;
  title: string;
  requests?: RequestEntity[];
};


export type ProjectEntity = {
  id: string;
  title: string;
  icon: IconType | string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  requests?: RequestEntity[];
  folders?: FolderEntity[];
};

export type WorkspaceEntity = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  projects?: ProjectEntity[];
};

export type ProjectCardEntity = Pick<ProjectEntity, "id" | "title" | "icon">;
