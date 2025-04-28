import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { Request } from "@/db/types/request.type";

import { Navigation } from "./navigation";

interface Props {
  requests: Request[];
  handleCreateRequest: () => void;
  selectedRequest: Request | null;
  setSelectedRequest: (request: Request) => void;
  handleDeleteRequest: (id: string) => void;
  handleRenameRequest: (id: string, newTitle: string) => void;
}

export function AppSidebar({
  handleRenameRequest,
  handleDeleteRequest,
  setSelectedRequest,
  selectedRequest,
  requests,
  handleCreateRequest,
}: Props) {
  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        <Navigation
          handleRenameRequest={handleRenameRequest}
          handleDeleteRequest={handleDeleteRequest}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
          requests={requests}
          handleCreateRequest={handleCreateRequest}
        />
      </SidebarContent>
    </Sidebar>
  );
}
