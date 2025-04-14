import { IconType } from "react-icons/lib";

export type RequestEntity = {
  id: string;
  title: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

export type FolderEntity = {
  id: string;
  title: string;
  requests: RequestEntity[];
};

export type ProjectEntity = {
  id: string;
  title: string;
  icon: IconType | string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  folders: FolderEntity[];
};

export type ProjectCardEntity = Pick<ProjectEntity, "id" | "title" | "icon">;
