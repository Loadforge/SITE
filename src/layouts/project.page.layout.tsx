import { ReactNode } from "react";

import { ProjectEntity } from "@/@entities";
import { AppSidebar } from "@/app.sidebar";
import { ProjectHeader } from "@/components";
import { BreadCrumbs } from "@/components/breadcrumb/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  project: ProjectEntity | null;
  children: ReactNode;
}

export function ProjectPageLayout({ children, project }: Props) {
  if (!project) {
    return <div>Projeto não encontrado</div>;
  }
  return (
    <div className="h-screen">
      <ProjectHeader project={project} />
      <SidebarProvider>
        <AppSidebar  />
        <main className="flex-1 px-5  overflow-y-auto pt-5 ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <BreadCrumbs project={project} />
          </div>

          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
