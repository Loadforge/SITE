import { RequestEntity } from "../request";

export type FolderEntity = {
    id: string;
    title: string;
    requests?: RequestEntity[];
  };