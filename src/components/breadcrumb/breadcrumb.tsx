
import { FolderEntity, ProjectEntity, RequestEntity } from "@/@entities";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  project: ProjectEntity;
  setselectedRequest: (request: RequestEntity | null) => void;
  setSelectedFolder: (folder: FolderEntity | null) => void;
  selectedFolder: FolderEntity | null;
  selectedRequest: RequestEntity | null;
}

export function BreadCrumbs({
  project,
  selectedFolder,
  selectedRequest,
  setSelectedFolder,
  setselectedRequest,
}: Props) {
  return (
    <div className="flex items-center">
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFolder(null);
                setselectedRequest(null);
              }}
            >
              {project.title}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {selectedFolder && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{selectedFolder.title}</BreadcrumbItem>
            </>
          )}

          {selectedRequest && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{selectedRequest.title}</BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
