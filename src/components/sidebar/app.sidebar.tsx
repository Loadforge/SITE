import { ProjectEntity } from "@/@entities";
import {
  Sidebar,
  SidebarContent
} from "@/components/ui/sidebar";

import { NavMain } from "./nav.main";

interface Props {
  project: ProjectEntity;
}

export function AppSidebar({ project }: Props) {
  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        <NavMain project={{folders:project.folders, requests:project.requests}}/>
      </SidebarContent>
    </Sidebar>
  );
}
