"use client";

import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";


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
  handleDeleteRequest: (id: string) => void;
  handleRenameRequest: (id: string, newTitle: string) => void;
  handleDuplicateRequest: (request: Request) => void;
}

export function Navigation({
  selectedRequest,
  setSelectedRequest,
  requests,
  handleCreateRequest,
  handleDeleteRequest,
  handleRenameRequest,
  handleDuplicateRequest,
}: Props) {
  const [renamingRequestId, setRenamingRequestId] = useState<string | null>(
    null
  );
  const [newTitle, setNewTitle] = useState("");

  function handleRenameStart(req: Request) {
    setRenamingRequestId(req.id);
    setNewTitle(req.title);
  }

  function handleRenameSubmit(id: string) {
    if (newTitle.trim()) {
      handleRenameRequest(id, newTitle.trim());
    }
    setRenamingRequestId(null);
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between text-sm">
        Requests
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-text hover:text-primary transition-all">
                <Plus onClick={handleCreateRequest} size={16} />
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
          const isRenaming = renamingRequestId === req.id;

          return (
            <SidebarMenuItem
              key={index}
              className="group flex items-center justify-between"
            >
              <SidebarMenuButton
                asChild
                className={`w-full flex items-center justify-between hover:bg-separators/30 hover:text-text active:bg-transparent active:text-text rounded-none ${
                  isSelected ? "bg-separators/25 border-l-2 border-primary" : ""
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
                    {isRenaming ? (
                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={() => handleRenameSubmit(req.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleRenameSubmit(req.id);
                          } else if (e.key === "Escape") {
                            setRenamingRequestId(null);
                          }
                        }}
                        autoFocus
                        className="flex-1 max-w-30 bg-transparent border-b border-primary focus:outline-none text-sm"
                      />
                    ) : (
                      <span>{req.title}</span>
                    )}
                  </a>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="opacity-50 hover:opacity-100 hover:text-primary transition-opacity p-1">
                        <MoreHorizontal size={16} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => handleRenameStart(req)}>
                        Renomear
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDuplicateRequest(req)}
                      >
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteRequest(req.id)}
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
