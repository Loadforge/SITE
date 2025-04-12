import { ReactNode } from "react";

import { ProjectEntity } from "@/@entities";
import { ProjectHeader } from "@/components";


interface Props {
  project: ProjectEntity;
  children: ReactNode;
}

export function ProjectPageLayout({ children, project }: Props) {
  return (
    <div className="flex flex-col h-screen w-full">
      <ProjectHeader project={project}/>
      <main className="flex-1 lg:px-15 xl:px-30  overflow-y-auto pt-10 ">
        {children}
      </main>
    </div>
  );
}
