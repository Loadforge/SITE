import { useLocation } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "@/components/ui/breadcrumb";

interface Props {
  project: ProjectEntity;
}

export function BreadCrumbs({ project }: Props) {
  const location = useLocation();
  console.log(location)



  return (
    <div className="flex items-center">
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">{project.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
