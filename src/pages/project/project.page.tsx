import { useEffect } from "react";
import { FaHistory, FaIceCream } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
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
import { ProjectPageLayout } from "@/layouts";
import { useProjectStore } from "@/stores/project.store";

export function ProjectPage() {
  const location = useLocation();
  const { id } = location.state || {};

  const {
    selectedRequest,
    setProject,
  } = useProjectStore();


  const mockProject: ProjectEntity = {
    id: crypto.randomUUID(),
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
        url: "https://minhaapi.com/configuracoes",
      },
      {
        id: crypto.randomUUID(),
        title: "Atualizar sistema",
        method: "PUT",
        url: "https://minhaapi.com/sistema",
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
            url: "https://minhaapi.com/usuarios",
          },
          {
            id: crypto.randomUUID(),
            title: "Criar novo usuário",
            method: "POST",
            url: "https://minhaapi.com/usuarios",
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
            url: "https://minhaapi.com/produtos",
          },
          {
            id: crypto.randomUUID(),
            title: "Deletar produto",
            method: "DELETE",
            url: "https://minhaapi.com/produtos/:id",
          },
        ],
      },
    ],
  };

  useEffect(() => {
    if (id) {
      setProject(mockProject);
    }
  }, [id]);

  return (
    <ProjectPageLayout

    >
      {!selectedRequest ? (
        <NotReqSelected />
      ) : (
        <div className="flex flex-col gap-4 ">
          <SetUrl
  
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
              <DocsReq />
            </TabsContent>
            <TabsContent value="history">
              <div className="">Histórico da requisição</div>
            </TabsContent>
          </Tabs>
          <ResponseSheet />
        </div>
      )}
    </ProjectPageLayout>
  );
}
