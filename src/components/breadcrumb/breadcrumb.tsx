import React from "react";
import { useLocation } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  project: ProjectEntity;
}

export function BreadCrumbs({ project }: Props) {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const queryParams = new URLSearchParams(location.search);
  const folderId = queryParams.get("folder");
  const requisitionId = queryParams.get("requisition");

  const folder = project.folders?.find((f) => f.id === folderId);

  const requisition =
    folder?.requests?.find((r) => r.id === requisitionId) ||
    project.requests?.find((r) => r.id === requisitionId);

  const baseSegments = pathSegments.slice(2);

  const fullPaths = baseSegments.map((_, index) => {
    const path = "/" + pathSegments.slice(0, index + 3).join("/");
    return {
      path,
      label: baseSegments[index],
    };
  });

  const extraParams: { label: string; path: string }[] = [];

  if (folder) {
    extraParams.push({
      label: folder.title,
      path: `${location.pathname}?folder=${folder.id}`,
    });
  }

  if (requisition) {
    extraParams.push({
      label: requisition.title,
      path: `${location.pathname}?folder=${folder?.id}&requisition=${requisition.id}`,
    });
  }

  return (
    <div className="flex items-center">
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">{project.title}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {fullPaths.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={segment.path}>{segment.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ))}

          {extraParams.map((param, index) => (
            <React.Fragment key={`param-${index}`}>
              <BreadcrumbItem>
                <BreadcrumbPage>{param.label}</BreadcrumbPage>
              </BreadcrumbItem>
              {index !== extraParams.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
