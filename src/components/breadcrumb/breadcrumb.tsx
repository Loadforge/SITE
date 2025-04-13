import React from "react";
import { useLocation } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function BreadCrumbs() {
  const location = useLocation();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  const fullPaths = pathSegments.map((_, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      path,
    };
  });

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {fullPaths.length > 0 ? (
          <>
            {fullPaths.slice(0, -1).map((segment, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={segment.path}>
                    {segment.path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            ))}

            <BreadcrumbItem>
              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Página Inicial</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
