import { IconType } from "react-icons/lib";

import { FolderEntity } from "../folder/folder.entity";
import { RequestEntity } from "../request/request.entity";

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

export type ProjectCardEntity = Pick<ProjectEntity, "id" | "title" | "icon">;
