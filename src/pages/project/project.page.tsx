import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { toast } from "sonner";

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
import { Method, Request } from "@/db/types/request.type";
import { ProjectPageLayout } from "@/layouts";
import { RequestService } from "@/services/request/request.service";

export function ProjectPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const location = useLocation();
  const { id: projectId, title, icon } = location.state || {};

  function handleCreateRequest() {
    RequestService.create(projectId).then((req) => {
      setRequests((prev) => [...prev, req]);
      setSelectedRequest(req);
    });
  }
  function handleDeleteRequest(id: string) {
    if (id === selectedRequest?.id) {
      setSelectedRequest(null);
    }
    RequestService.delete(id)
      .then(() => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        toast.success("Requisição deletada com sucesso!");
      })
      .catch((error) => {
        toast.error("Erro ao deletar a requisição: " + error.message);
      });
  }
  function handleRenameRequest(id: string, newTitle: string) {
    RequestService.rename(id, newTitle)
      .then((req) => {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, title: req.title } : r))
        );
        if (req.id === selectedRequest?.id) {
          setSelectedRequest(req);
        }
      })
      .catch((error) => {
        toast.error("Erro ao Renomear a requisição: " + error.message);
      });
  }
  function handleUpdateMethodRequest(id: string, method: string) {
    RequestService.updateMethod(id, method)
      .then(() => {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, method: method as Method } : r
          )
        );
      })
      .catch((error) => {
        toast.error(
          "Erro ao atualizar o método da requisição: " + error.message
        );
      });
  }

  function handleUpdateUrlRequest(id: string, url: string) {
    RequestService.updateUrl(id, url)
      .then(() => {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, url } : r))
        );
      })
      .catch((error) => {
        toast.error("Erro ao atualizar a URL da requisição: " + error.message);
      });
  }
  useEffect(() => {
    if (projectId) {
      RequestService.getByProjectId(projectId).then(setRequests);
    }
  }, [projectId]);

  return (
    <ProjectPageLayout
      handleRenameRequest={handleRenameRequest}
      handleDeleteRequest={handleDeleteRequest}
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
          <SetUrl
            id={selectedRequest.id}
            handleUpdateMethodRequest={handleUpdateMethodRequest}
            handleUpdateUrlRequest={handleUpdateUrlRequest}
          />

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
              <DocsReq id={selectedRequest.id}  />
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
