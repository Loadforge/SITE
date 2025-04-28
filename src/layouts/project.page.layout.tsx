import { ReactNode } from "react";

import { AppSidebar, ProjectHeader, Separator } from "@/components";
import { BreadCrumbs } from "@/components/breadcrumb/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Project } from "@/db/types";
import { Request } from "@/db/types/request.type";

interface Props {
  children: ReactNode;
  project: Project;
  requests: Request[];
  handleCreateRequest: () => void;
  selectedRequest: Request | null;
  setSelectedRequest: (request: Request | null) => void;
}

export function ProjectPageLayout({
  setSelectedRequest,
  selectedRequest,
  children,
  project,
  requests,
  handleCreateRequest,
}: Props) {
  return (
    <div className="h-screen">
      <ProjectHeader project={project} />
      <SidebarProvider>
        <AppSidebar
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
          requests={requests}
          handleCreateRequest={handleCreateRequest}
        />
        <main className="flex-1 px-2  overflow-y-hidden pt-3 max-h-[calc(100vh-3.5rem)] ">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="h-6 w-[1px] bg-separators mr-2"
            />
            <BreadCrumbs project={project} selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest} />
          </div>
          <div className="p-4 h-full w-full">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
