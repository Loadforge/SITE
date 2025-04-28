import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Project, Request } from "@/db/types";
interface Props {
  project: Partial<Project>;
  selectedRequest: Request | null;
  setSelectedRequest: (request: Request | null) => void;
}

export function BreadCrumbs({project,selectedRequest,setSelectedRequest}: Props) {
  return (
    <div className="flex items-center">
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedRequest(null);
              }}
            >
              {project?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {selectedRequest && (
            <div className="font-bold flex gap-2">
              <BreadcrumbSeparator />
              <BreadcrumbItem>{selectedRequest?.title}</BreadcrumbItem>
            </div>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
