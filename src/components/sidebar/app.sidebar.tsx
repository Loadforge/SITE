import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { Request } from "@/db/types/request.type";

import { Navigation } from "./navigation";

interface Props {
  requests: Request[];
}

export function AppSidebar({ requests }: Props) {
  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        <Navigation requests={requests} />
      </SidebarContent>
    </Sidebar>
  );
}
