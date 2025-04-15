
import { ProjectEntity } from "@/@entities";
import {
  Sidebar
} from "@/components/ui/sidebar";



interface Props {
  project: ProjectEntity;
}

export function AppSidebar({ project }: Props) {

  return (
    <Sidebar className="mt-14 h-[calc(100vh-3.5rem)]">
      
    </Sidebar>
  );
}
