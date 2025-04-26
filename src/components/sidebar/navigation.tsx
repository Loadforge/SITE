"use client";

import { Plus } from "lucide-react";


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Request } from "@/db/types/request.type";
import { useProjectStore } from "@/stores/project.store";
interface Props {
  requests: Request[];
}

export function Navigation({ requests }: Props) {
  const { setSelectedRequest } = useProjectStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        Requests
        <button className="text-muted-foreground hover:text-white">
          <Plus size={16} />
        </button>
      </SidebarGroupLabel>

      <SidebarMenu>
        {requests?.map((req, index) => (
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
