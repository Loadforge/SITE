import { ChevronDown, ChevronRight, Folder, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const methodColors: Record<string, string> = {
  GET: "bg-blue-500",
  POST: "bg-green-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
};

interface Props {
  project: ProjectEntity;
}

export function AppSidebar({ project }: Props) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const handleRequestClick = (
    folderId: string | null,
    requisitionId: string
  ) => {
    const searchParams = new URLSearchParams();
    if (folderId) {
      searchParams.set("folder", folderId);
    }
    searchParams.set("requisition", requisitionId);

    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const folder = params.get("folder");
    if (folder) {
      setOpenGroups((prev) => ({ ...prev, [folder]: true }));
    }
  }, [location.search]);

  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      <SidebarContent>
        {project.requests && (
          <SidebarGroup>
            <SidebarGroupContent >
              <SidebarMenu>
                {project.requests?.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleRequestClick(null, item.id)}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={`px-2 py-0.5 rounded-sm text-white text-xs ${
                          methodColors[item.method] || "bg-gray-500"
                        }`}
                      >
                        {item.method}
                      </span>
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {project.folders?.map((folder) => (
          <SidebarGroup key={folder.id}>
            <SidebarGroupLabel
              onClick={() => toggleGroup(folder.id)}
              className="flex items-center justify-between cursor-pointer px-2"
            >
              <div className="flex items-center gap-2">
                {openGroups[folder.id] ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <Folder size={16} />
                <span>{folder.title}</span>
              </div>
              <Plus size={14} className="opacity-60 hover:opacity-100" />
            </SidebarGroupLabel>

            {openGroups[folder.id] && folder.requests && (
              <SidebarGroupContent className="ml-6">
                <SidebarMenu>
                  {folder.requests?.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => handleRequestClick(folder.id, item.id)}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span
                          className={`px-2 py-0.5 rounded-sm text-white text-xs ${
                            methodColors[item.method] || "bg-gray-500"
                          }`}
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
  );
}
