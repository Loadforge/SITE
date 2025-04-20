import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { Navigation } from "./navigation";


export function AppSidebar() {
  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        <Navigation
        
        />
      </SidebarContent>
    </Sidebar>
  );
}
