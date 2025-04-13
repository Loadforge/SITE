import { ReactNode } from "react";

import { ProjectEntity } from "@/@entities";
import { AppSidebar } from "@/app.sidebar";
import { ProjectHeader } from "@/components";
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
          <SidebarTrigger/>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
