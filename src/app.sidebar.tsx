import { ChevronDown, ChevronRight, Folder, Plus } from "lucide-react"
import { useState, useEffect } from "react"
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


const generateRequests = () => [
  {
    title: "User",
    id: crypto.randomUUID(), 
    items: [
      { title: "CreateUser", method: "POST", id: crypto.randomUUID() },
      { title: "GetUsers", method: "GET", id: crypto.randomUUID() },
    ],
  },
  {
    title: "Product",
    id: crypto.randomUUID(), 
    items: [
      { title: "CreateProduct", method: "POST", id: crypto.randomUUID() },
      { title: "GetProducts", method: "GET", id: crypto.randomUUID() },
    ],
  },
]

export function AppSidebar() {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  const [requests] = useState(generateRequests) // Inicializa uma única vez
  const navigate = useNavigate()
  const location = useLocation()

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  const handleRequestClick = (folderId: string, requisitionId: string) => {
    const searchParams = new URLSearchParams()
    searchParams.set("folder", folderId) 
    searchParams.set("requisition", requisitionId) 

    const newUrl = `${location.pathname}?${searchParams.toString()}`
    navigate(newUrl)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const folder = params.get("folder")
    if (folder) {
      setOpenGroups((prev) => ({ ...prev, [folder]: true }))
    }
  }, [location.search])

  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        {requests.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between cursor-pointer px-2"
            >
              <div className="flex items-center gap-2">
                {openGroups[group.id] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <Folder size={16} />
                <span>{group.title}</span>
              </div>
              <Plus size={14} className="opacity-60 hover:opacity-100" />
            </SidebarGroupLabel>

            {openGroups[group.id] && (
              <SidebarGroupContent className="ml-6">
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() =>
                          handleRequestClick(group.id, item.id) 
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
