import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  AdvancedReq,
  AuthReq,
  BodyReq,
  DocsReq,
  HeadersReq,
  NotReqSelected,
  ParamsReq,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { ResponseSheet } from "@/components/project/response";
import { SetUrl } from "@/components/setUrl/seturl";
import { Project } from "@/db/types";
import { Method, Request } from "@/db/types/request.type";
import { ProjectPageLayout } from "@/layouts";
import { ProjectService } from "@/services/project/project.service";
import { RequestService } from "@/services/request/request.service";
import { ResponseService } from "@/services/request/response.service";

export function ProjectPage() {
  const { t } = useTranslation();
  const [project, setProject] = useState<Project>({} as Project);
  const [response, setResponse] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const { id: projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      ProjectService.getById(projectId)
        .then((project) => {
          setProject(project);
        })
        .catch((error) => {
          console.error("Erro ao obter o projeto:", error);
        });
      RequestService.getByProjectId(projectId).then(setRequests);
    }
  }, [projectId]);

  useEffect(() => {
    if (selectedRequest) {
      localStorage.setItem(
        `selectedRequest_${projectId}`,
        JSON.stringify(selectedRequest.id)
      );
    }
  }, [selectedRequest, projectId]);

  useEffect(() => {
    if (requests.length && projectId) {
      const savedId = localStorage.getItem(`selectedRequest_${projectId}`);
      if (savedId) {
        const found = requests.find((r) => r.id === JSON.parse(savedId));
        if (found) setSelectedRequest(found);
      }
    }
  }, [requests, projectId]);

  const handleProjectRename = (id: string, newTitle: string) => {
    ProjectService.rename(id, newTitle)
      .then(() => {
        setProject((prevProject) => ({
          ...prevProject,
          title: newTitle,
        }));
        toast.success(t("project.rename.success"));
      })
      .catch((error) => {
        console.error("Erro ao renomear o projeto:", error);
        toast.error(t("project.rename.error"));
      });
  };

  const handleProjectIconChange = (id: string, newIcon: string) => {
    ProjectService.updateIcon(id, newIcon)
      .then(() => {
        setProject((prevProject) => ({
          ...prevProject,
          icon: newIcon,
        }));
        toast.success(t("project.icon.success"));
      })
      .catch((error) => {
        console.error("Erro ao alterar o ícone do projeto:", error);
        toast.error(t("project.icon.error"));
      });
  };

  function handleCreateRequest() {
    if (!projectId) return;
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
        toast.success(t("request.delete.success"));
      })
      .catch((error) => {
        toast.error(t("request.delete.error") + error.message);
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
        toast.error(t("request.rename.error") + error.message);
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
        toast.error(t("request.method.error") + error.message);
      });
  }

  function handleUpdateUrlRequest(id: string, url: string) {
    RequestService.updateUrl(id, url)
      .then(() => {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, url } : r))
        );
        setSelectedRequest((prev) =>
          prev && prev.id === id ? { ...prev, url } : prev
        );
      })
      .catch((error) => {
        toast.error(t("request.url.error") + error.message);
      });
  }

  function handleDuplicateRequest(request: Request) {
    RequestService.duplicate(request).then((req) => {
      setRequests([...requests, req]);
      setSelectedRequest(req);
      toast.success(t("request.duplicate.success"));
    });
  }

  function handleSendResponse(requestId: string) {
    setIsLoading(true);
    ResponseService.sendRequest(requestId)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        toast.error(
          `${t("request.send.error")}: ${error.message || t("error.unknown")}`
        );
        console.error("Erro ao enviar requisição:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!selectedRequest) return;
    ResponseService.getResponse(selectedRequest.id).then((res) => {
      setResponse(res);
    });
  }, [selectedRequest]);

  return (
    <ProjectPageLayout
      handleProjectIconChange={handleProjectIconChange}
      handleRenameRequest={handleRenameRequest}
      handleDeleteRequest={handleDeleteRequest}
      selectedRequest={selectedRequest}
      setSelectedRequest={setSelectedRequest}
      handleCreateRequest={handleCreateRequest}
      handleDuplicateRequest={handleDuplicateRequest}
      requests={requests}
      handleProjectRename={handleProjectRename}
      project={project}
    >
      {!selectedRequest ? (
        <NotReqSelected handleCreateRequest={handleCreateRequest} />
      ) : (
        <div className="flex flex-col gap-4 ">
          <SetUrl
            id={selectedRequest.id}
            loading={isLoading}
            handleUpdateMethodRequest={handleUpdateMethodRequest}
            handleUpdateUrlRequest={handleUpdateUrlRequest}
            handleSendResponse={handleSendResponse}
          />

          <Tabs defaultValue="body">
            <TabsList className="flex">
              <TabsTrigger value="params">{t("tabs.params")}</TabsTrigger>
              <TabsTrigger value="auth">{t("tabs.auth")}</TabsTrigger>
              <TabsTrigger value="headers">{t("tabs.headers")}</TabsTrigger>
              <TabsTrigger value="body">{t("tabs.body")}</TabsTrigger>
              <TabsTrigger value="advanced">{t("tabs.advanced")}</TabsTrigger>
              <TabsTrigger value="docs">{t("tabs.docs")}</TabsTrigger>
            </TabsList>

            <TabsContent value="params">
              <ParamsReq id={selectedRequest.id} url={selectedRequest.url} />
            </TabsContent>
            <TabsContent value="auth">
              <AuthReq id={selectedRequest.id} />
            </TabsContent>
            <TabsContent value="headers">
              <HeadersReq id={selectedRequest.id} />
            </TabsContent>
            <TabsContent value="body">
              <BodyReq id={selectedRequest.id} />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedReq id={selectedRequest.id} />
            </TabsContent>
            <TabsContent value="docs">
              <DocsReq id={selectedRequest.id} />
            </TabsContent>
          </Tabs>
          <ResponseSheet response={response} />
        </div>
      )}
    </ProjectPageLayout>
  );
}
