import { useEffect, useState } from "react";
import { FaIceCream } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
import { SetUrl } from "@/components/setUrl/seturl";
import { ProjectPageLayout } from "@/layouts";

export function ProjectPage() {
  const location = useLocation()
  const { id } = location.state || null;
  const [project, setProject] = useState<ProjectEntity | null>(null);

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
    <ProjectPageLayout project={project}>
      <div className="text-muted-foreground">
        <SetUrl/>
      </div>
    </ProjectPageLayout>
  );
}
