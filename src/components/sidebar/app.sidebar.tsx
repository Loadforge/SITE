import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { Request } from "@/db/types/request.type";

import { Navigation } from "./navigation";

interface Props {
  requests: Request[];
  handleCreateRequest: () => void;
  selectedRequest: Request | null;
  setSelectedRequest: (request: Request) => void;


}

export function AppSidebar({ setSelectedRequest,selectedRequest,requests, handleCreateRequest }: Props) {
  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        <Navigation selectedRequest={selectedRequest} setSelectedRequest={setSelectedRequest} requests={requests} handleCreateRequest={handleCreateRequest}  />
      </SidebarContent>
    </Sidebar>
  );
}
