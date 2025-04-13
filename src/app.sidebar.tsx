import { ChevronDown, ChevronRight, Folder, Plus } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const methodColors: Record<string, string> = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
}

const requests = [
  {
    title: "User",
    items: [
      { title: "CreateUser", method: "POST" },
      { title: "GetUsers", method: "GET" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "CreateProduct", method: "POST" },
      { title: "GetProducts", method: "GET" },
    ],
  },
]

export function AppSidebar() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  const navigate = useNavigate()
  const location = useLocation()

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const handleRequestClick = (folder: string, requisition: string) => {
    const searchParams = new URLSearchParams()
    searchParams.set("folder", folder)
    searchParams.set("requisition", requisition)

    const newUrl = `${location.pathname}?${searchParams.toString()}`
    navigate(newUrl)
  }

  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        {requests.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel
              onClick={() => toggleGroup(group.title)}
              className="flex items-center justify-between cursor-pointer px-2"
            >
              <div className="flex items-center gap-2">
                {openGroups[group.title] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <Folder size={16} />
                <span>{group.title}</span>
              </div>
              <Plus size={14} className="opacity-60 hover:opacity-100" />
            </SidebarGroupLabel>

            {openGroups[group.title] && (
              <SidebarGroupContent className="ml-6">
                <SidebarMenu>
                  {group.items.map((item, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton
                        onClick={() =>
                          handleRequestClick(group.title, item.title)
                        }
                        className="flex items-center gap-2 text-sm"
                      >
                        <span
                          className={`px-2 py-0.5 rounded-sm text-white text-xs ${methodColors[item.method] || "bg-gray-500"}`}
                        >
                          {item.method}
                        </span>
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
