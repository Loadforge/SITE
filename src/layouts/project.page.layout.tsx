import { ReactNode } from "react";

import { AppSidebar, ProjectHeader, Separator } from "@/components";
import { BreadCrumbs } from "@/components/breadcrumb/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Project } from "@/db/types";
import { useProjectStore } from "@/stores/project.store";

interface Props {
  children: ReactNode;
  dbproject: Partial<Project>;
}

export function ProjectPageLayout({ children, dbproject }: Props) {
  const { project } = useProjectStore();

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }
  return (
    <div className="h-screen">
      <ProjectHeader project={dbproject} />
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 px-2  overflow-y-hidden pt-3 max-h-[calc(100vh-3.5rem)] ">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="h-6 w-[1px] bg-separators mr-2"
            />
            <BreadCrumbs />
          </div>
          <div className="p-4 h-full w-full">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
