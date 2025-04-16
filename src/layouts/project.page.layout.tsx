import { ReactNode } from "react";

import { FolderEntity, ProjectEntity, RequestEntity } from "@/@entities";
import { AppSidebar, ProjectHeader, Separator } from "@/components";
import { BreadCrumbs } from "@/components/breadcrumb/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  project: ProjectEntity | null;
  children: ReactNode;
  setSelectedRequest: (requestId: RequestEntity | null) => void;
  setSelectedFolder: (folderId: FolderEntity | null) => void;
  selectedRequest: RequestEntity | null;
  selectedFolder: FolderEntity | null;
}

export function ProjectPageLayout({ children, project, setSelectedFolder,setSelectedRequest, selectedFolder, selectedRequest }: Props) {
  if (!project) {
    return <div>Projeto não encontrado</div>;
  }
  return (
    <div className="h-screen">
      <ProjectHeader project={project} />
      <SidebarProvider>
        <AppSidebar project={project} setSelectedFolder={setSelectedFolder} setSelectedRequest={setSelectedRequest} />
        <main className="flex-1 px-2  overflow-y-hidden pt-3 ">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="h-6 w-[1px] bg-separators mr-2"
            />
            <BreadCrumbs project={project} setSelectedFolder={setSelectedFolder} setselectedRequest={setSelectedRequest} selectedFolder={selectedFolder} selectedRequest={selectedRequest} />
          </div>
          <div className="p-8 h-full w-full">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
