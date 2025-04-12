import { useState, useEffect } from "react";
import { FaIceCream } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { ProjectEntity } from "@/@entities";
import { ProjectPageLayout } from "@/layouts";

export function ProjectPage() {
  const { id } = useParams<{ id: string }>(); 
  const [project, setProject] = useState<ProjectEntity | null>(null);

  useEffect(() => {
    if (id) {
      const fetchedProject: ProjectEntity = {
        id: id,
        title: "New Project",  
        icon: FaIceCream,     
      };
      setProject(fetchedProject);
    }
  }, [id]);

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  return (
    <ProjectPageLayout project={project}>
      <></>
    </ProjectPageLayout>
  );
}
