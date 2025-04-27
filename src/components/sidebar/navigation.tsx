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

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui";
interface Props {
  requests: Request[];
  handleCreateRequest: () => void;
}

export function Navigation({ requests, handleCreateRequest }: Props) {
  const { setSelectedRequest } = useProjectStore();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        Requests
        <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <button className="text-text hover:text-primary transition-all">
            <Plus className="" onClick={handleCreateRequest} size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Criar Requisição</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
      </SidebarGroupLabel>

     

      <SidebarMenu>
        {requests?.map((req, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              asChild
              className="hover:bg-separators/40 hover:text-text"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedRequest(req);
                }}
                className="flex items-center gap-2"
              >
                <span>{req.method}</span>
                <span>{req.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
