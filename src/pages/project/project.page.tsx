import { useEffect, useState } from "react";
import { FaHistory, FaIceCream } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { FolderEntity, ProjectEntity, RequestEntity } from "@/@entities";
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
import { ProjectPageLayout } from "@/layouts";

export function ProjectPage() {
  const location = useLocation();
  const { id } = location.state || null;
  const [project, setProject] = useState<ProjectEntity | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RequestEntity | null>(
    null
  );
  const [selectedFolder, setSelectedFolder] = useState<FolderEntity | null>(
    null
  );

  useEffect(() => {
    if (id) {
      const fetchedProject: ProjectEntity = {
        id,
        title: "Project 1",
        icon: FaIceCream,
        description: "Projeto exemplo com pastas e requisições soltas",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

        requests: [
          {
            id: crypto.randomUUID(),
            title: "Buscar configurações",
            method: "GET",
          },
          {
            id: crypto.randomUUID(),
            title: "Atualizar sistema",
            method: "PUT",
          },
        ],

        folders: [
          {
            id: crypto.randomUUID(),
            title: "Usuários",
            requests: [
              {
                id: crypto.randomUUID(),
                title: "Buscar todos usuários",
                method: "GET",
              },
              {
                id: crypto.randomUUID(),
                title: "Criar novo usuário",
                method: "POST",
              },
            ],
          },
          {
            id: crypto.randomUUID(),
            title: "Produtos",
            requests: [
              {
                id: crypto.randomUUID(),
                title: "Listar produtos",
                method: "GET",
              },
              {
                id: crypto.randomUUID(),
                title: "Deletar produto",
                method: "DELETE",
              },
            ],
          },
        ],
      };

      setProject(fetchedProject);
    }
  }, [id]);

  return (
    <ProjectPageLayout
      project={project}
      setSelectedFolder={setSelectedFolder}
      setSelectedRequest={setSelectedRequest}
      selectedRequest={selectedRequest}
      selectedFolder={selectedFolder}
    >
      {!selectedRequest ? (
        <NotReqSelected />
      ) : (
        <div className="flex flex-col gap-4  ">
          <SetUrl selectedRequest={selectedRequest} />
          <Tabs defaultValue="body">
            <TabsList className="flex ">
              <TabsTrigger value="params">Params</TabsTrigger>
              <TabsTrigger value="auth">Auth</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="docs">Docs</TabsTrigger>
              <TabsTrigger
                value="history"
                className="ml-auto  text-sm font-semibold"
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
              <InDevelopment/>
            </TabsContent>
          </Tabs>
          <ResponseSheet />
        </div>
      )}
    </ProjectPageLayout>
  );
}
