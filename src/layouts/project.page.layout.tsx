import { ReactNode } from "react";

import { ProjectEntity } from "@/@entities";
import { AppSidebar } from "@/app.sidebar";
import { ProjectHeader, Separator } from "@/components";
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
        <AppSidebar />
        <main className="flex-1 px-2  overflow-y-auto pt-3 ">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="h-6 w-[1px] bg-separators mr-2"
            />
            <BreadCrumbs project={project} />
          </div>
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
