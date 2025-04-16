"use client"

import { ChevronRight, FolderPlus, Plus } from "lucide-react"

import { FolderEntity, NavigationProjectEntity, RequestEntity } from "@/@entities"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface Props {
  project: NavigationProjectEntity
  setSelectedRequest: (request: RequestEntity | null) => void
  setSelectedFolder: (folder: FolderEntity | null) => void
}

export function Navigation({ project, setSelectedFolder, setSelectedRequest }: Props) {

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center justify-between">
        Requests
        <button className="text-muted-foreground hover:text-white">
          <Plus size={16} />
        </button>
      </SidebarGroupLabel>

      <SidebarMenu>
        {project.folders?.map((folder, index) => (
          <Collapsible key={index} asChild className="group/collapsible">
            <SidebarMenuSubItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuSubButton>
                  <span className="flex items-center gap-2">{folder.title}</span>
                  <div className="ml-auto flex items-center gap-1">
                    <button className="text-text hover:text-primary">
                      <FolderPlus size={14} />
                    </button>
                    <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </SidebarMenuSubButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub className="pl-4">
                  {folder.requests?.map((req, idx) => (
                    <SidebarMenuSubItem key={idx}>
                      <SidebarMenuSubButton asChild>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setSelectedRequest(req)
                            setSelectedFolder(folder)
                          }}
                          className="flex items-center gap-2"
                        >
                          <span>{req.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuSubItem>
          </Collapsible>
        ))}

        {project.requests?.map((req, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedRequest(req)
                  setSelectedFolder(null)
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
  )
}
