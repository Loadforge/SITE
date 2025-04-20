import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProjectStore } from "@/stores/project.store";

export function BreadCrumbs() {
  const {
    project,
    selectedRequest,
    selectedFolder,
    resetSelections,
  } = useProjectStore();
  return (
    <div className="flex items-center">
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                resetSelections();
              }}
            >
              {project?.title}
            </BreadcrumbLink>
          </BreadcrumbItem>

          {selectedFolder && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{selectedFolder.title}</BreadcrumbItem>
            </>
          )}

          {selectedRequest && (
            <div className="font-bold flex gap-2">
              <BreadcrumbSeparator />
              <BreadcrumbItem>{selectedRequest.title}</BreadcrumbItem>
            </div>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
