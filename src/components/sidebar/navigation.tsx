"use client";

import { MoreHorizontal, Plus } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Request } from "@/db/types/request.type";

import { CustomBadge } from "../badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui";

interface Props {
  selectedRequest: Request | null;
  setSelectedRequest: (request: Request) => void;
  requests: Request[];
  handleCreateRequest: () => void;
}

export function Navigation({
  selectedRequest,
  setSelectedRequest,
  requests,
  handleCreateRequest,
}: Props) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between text-sm">
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
        {requests?.map((req, index) => {
          const isSelected = selectedRequest?.id === req.id;

          return (
            <SidebarMenuItem
              key={index}
              className="group flex items-center justify-between"
            >
              <SidebarMenuButton
                asChild
                className={`w-full flex items-center justify-between hover:bg-separators/30 hover:text-text ${
                  isSelected
                    ? "bg-separators/25  border-l-4 border-primary"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedRequest(req);
                    }}
                    className="flex items-center gap-2 flex-1"
                  >
                    <CustomBadge>{req.method}</CustomBadge>
                    <span>{req.title}</span>
                  </a>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="opacity-50 hover:opacity-100 hover:text-primary transition-opacity p-1">
                        <MoreHorizontal size={16} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        onClick={() => console.log("Renomear", req.id)}
                      >
                        Renomear
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Duplicar", req.id)}
                      >
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Deletar", req.id)}
                        className="text-red-500"
                      >
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
