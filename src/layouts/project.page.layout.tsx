import { ReactNode } from "react";

import { ProjectEntity } from "@/@entities";
import { AppSidebar } from "@/app.sidebar";
import { ProjectHeader, Separator } from "@/components";
import { BreadCrumbs } from "@/components/breadcrumb/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface Props {
  project: ProjectEntity;
  children: ReactNode;
}

export function ProjectPageLayout({ children, project }: Props) {
  return (
    <div className="h-screen">
      <ProjectHeader project={project} />
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 px-5  overflow-y-auto pt-5 ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="h-6 w-[1px] bg-muted mx-2"
            />
            <BreadCrumbs />
          </div>

          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
