import React from "react";
import { useLocation } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Separator } from "../ui";

interface Props {
  project: ProjectEntity;
}

export function BreadCrumbs({ project }: Props) {
  console.log(project);
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const baseSegments = pathSegments.slice(2);

  const fullPaths = baseSegments.map((_, index) => {
    const path = "/" + pathSegments.slice(0, index + 3).join("/");
    return {
      path,
      label: baseSegments[index],
    };
  });

  return (
    <div className="flex items-center">
      <Separator
        orientation="vertical"
        className="h-6 w-[1px] bg-separators mr-2"
      />

      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          {fullPaths.length === 0 ? (
            <BreadcrumbItem>
              <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              {fullPaths.slice(0, -1).map((segment, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href={segment.path}>
                      {segment.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </React.Fragment>
              ))}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
