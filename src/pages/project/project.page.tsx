import { useEffect, useState } from "react";
import { FaHistory, FaIceCream } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
import {
  AdvancedReq,
  AuthReq,
  BodyReq,
  DocsReq,
  HeadersReq,
  InDevelopment,
  NotReqSelected,
  ParamsReq,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { ResponseSheet } from "@/components/project/response";
import { SetUrl } from "@/components/setUrl/seturl";
import { Request } from "@/db/types/request.type";
import { ProjectPageLayout } from "@/layouts";
import { RequestService } from "@/services/request/request.service";
import { useProjectStore } from "@/stores/project.store";

export function ProjectPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  const location = useLocation();
  const { id: projectId, title, icon } = location.state || {};

  const { selectedRequest, setProject } = useProjectStore();

  const mockProject: ProjectEntity = {
    id: crypto.randomUUID(),
    title: "Project 1",
    icon: FaIceCream,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    requests: [
      {
        id: crypto.randomUUID(),
        title: "Buscar configurações",
        method: "GET",
        url: "https://minhaapi.com/configuracoes",
        body: { type: "json", content: "{}" },
      },
      {
        id: crypto.randomUUID(),
        title: "Atualizar sistema",
        method: "PUT",
        url: "https://minhaapi.com/sistema",
        body: { type: "json", content: "{}" },
      },
    ],
  };
  function handleCreateRequest() {
    if (!projectId) return;

    RequestService.create(projectId).then(() => {
      RequestService.getByProjectId(projectId).then(setRequests);
    });
  }
  useEffect(() => {
    if (projectId) {
      setProject(mockProject);
    }
  }, [projectId]);
  useEffect(() => {
    if (projectId) {
      RequestService.getByProjectId(projectId).then(setRequests);
    }
  }, [projectId, handleCreateRequest]);

  return (
    <ProjectPageLayout
      requests={requests}
      dbproject={{ id: projectId, title: title, icon: icon }}
    >
      {!selectedRequest ? (
        <NotReqSelected handleCreateRequest={handleCreateRequest} />
      ) : (
        <div className="flex flex-col gap-4 ">
          <SetUrl />

          <Tabs defaultValue="body">
            <TabsList className="flex">
              <TabsTrigger value="params">Params</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="docs">Docs</TabsTrigger>
              <TabsTrigger
                value="history"
                className="ml-auto text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <FaHistory />
                  History
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="params">
              <ParamsReq />
            </TabsContent>
            <TabsContent value="auth">
              <AuthReq />
            </TabsContent>
            <TabsContent value="headers">
              <HeadersReq />
            </TabsContent>
            <TabsContent value="body">
              <BodyReq />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedReq />
            </TabsContent>
            <TabsContent value="docs">
              <DocsReq />
            </TabsContent>
            <TabsContent value="history">
              <InDevelopment />
            </TabsContent>
          </Tabs>
          <ResponseSheet />
        </div>
      )}
    </ProjectPageLayout>
  );
}
