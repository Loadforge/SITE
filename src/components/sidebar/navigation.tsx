"use client";

import { Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useProjectStore } from "@/stores/project.store";

export function Navigation() {
  const {
    project,
    setSelectedRequest
  } = useProjectStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        Requests
        <button className="text-muted-foreground hover:text-white">
          <Plus size={16} />
        </button>
      </SidebarGroupLabel>

      <SidebarMenu>
        

        {project?.requests?.map((req, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRequest(req);
                }}
                className="flex items-center gap-2"
              >
                <span>{req.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
