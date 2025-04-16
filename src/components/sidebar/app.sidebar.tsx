import { FolderEntity, ProjectEntity, RequestEntity } from "@/@entities";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { Navigation } from "./navigation";

interface Props {
  project: ProjectEntity;
  setSelectedRequest: (requestId: RequestEntity | null) => void;
  setSelectedFolder: (folderId: FolderEntity | null) => void;
}

export function AppSidebar({
  project,
  setSelectedFolder,
  setSelectedRequest,
}: Props) {
  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        <Navigation
          project={{ folders: project.folders, requests: project.requests }}
          setSelectedFolder={setSelectedFolder}
          setSelectedRequest={setSelectedRequest}
        />
      </SidebarContent>
    </Sidebar>
  );
}
