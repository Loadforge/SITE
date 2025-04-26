import { IconType } from "react-icons/lib";

import { RequestEntity } from "../request/request.entity";

export type ProjectEntity = {
  id: string;
  title: string;
  icon: IconType | string;
  createdAt: string;
  updatedAt: string;
  requests?: RequestEntity[];
};

export type ProjectCardEntity = Pick<ProjectEntity, "id" | "title" | "icon">;
