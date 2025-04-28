import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { useLocation } from "react-router-dom";

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

export function ProjectPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const location = useLocation();
  const { id: projectId, title, icon } = location.state || {};

  function handleCreateRequest() {
    if (!projectId) return;

    RequestService.create(projectId).then((req) => {setSelectedRequest(req)});
  }

  useEffect(() => {
    if (projectId) {
      RequestService.getByProjectId(projectId).then(setRequests);
    }
  }, [projectId, handleCreateRequest]);

  return (
    <ProjectPageLayout
      selectedRequest={selectedRequest}
      setSelectedRequest={setSelectedRequest}
      handleCreateRequest={handleCreateRequest}
      requests={requests}
      project={{ id: projectId, title: title, icon: icon }}
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
