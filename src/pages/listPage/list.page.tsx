import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  ImportProjectButton,
  NewProjectButton,
  SortableCard,
} from "@/components";
import { Project } from "@/db/types";
import { ListPageLayout } from "@/layouts";
import { ProjectService } from "@/services/project/project.service";

export function ListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const handleAddProject = () => {
    ProjectService.create()
      .then((project) => {
        navigate("/project", {
          state: { id: project.id, title: project.title, icon: project.icon },
        });
      })
      .catch((error) => {
        console.error("Erro ao adicionar o projeto:", error);
        toast.error("Erro ao adicionar o projeto. Tente novamente!");
      });
  };

  const handleDelete = (id: string, event?: React.MouseEvent) => {
    event?.preventDefault();

    ProjectService.delete(id)
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        toast.success("Projeto Excluido com Sucesso");
      })
      .catch((error) => {
        console.error("Erro ao excluir o projeto:", error);
      });
  };
  const handleRename = (id: string, newTitle: string) => {
    const updatedProject = projects.find((p) => p.id === id);

    if (!updatedProject) return;

    ProjectService.rename(id, newTitle)
      .then(() => {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, title: newTitle } : p))
        );
        toast.success("Projeto renomeado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao renomear o projeto:", error);
        toast.error("Erro ao renomear o projeto. Tente novamente!");
      });
  };
  useEffect(() => {
    ProjectService.getAll()
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Erro ao carregar os projetos:", error);
      });
  }, []);

  const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);

      const reorderedProjects = newProjects.map((project, index) => ({
        ...project,
        index: index + 1, 
      }));

      setProjects(reorderedProjects);

      ProjectService.reorder(reorderedProjects)
        .then(() => {
        })
        .catch((error) => {
          console.error("Erro ao reordenar os projetos:", error);
          toast.error("Erro ao reordenar os projetos. Tente novamente!");
        });
    }
  };

  return (
    <div className="flex bg-background items-center justify-between min-h-svh">
      <ListPageLayout>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map((p) => p.id)}
            strategy={rectSortingStrategy}
          >
            <div className="hidden lg:grid lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 justify-items-center gap-10 p-4">
              <NewProjectButton onClick={handleAddProject} />
              <ImportProjectButton />
              {projects
                .sort((a, b) => a.index - b.index)
                .map((project) => (
                  <SortableCard
                    key={project.id}
                    {...project}
                    onClick={handleDelete}
                    onRename={handleRename}
                  />
                ))}
            </div>
          </SortableContext>
        </DndContext>
      </ListPageLayout>
    </div>
  );
}
