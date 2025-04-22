import { ProjectEntity } from "../project";

export type WorkspaceEntity = {
    id: string;
    title: string;
    projects?: ProjectEntity[];
  };