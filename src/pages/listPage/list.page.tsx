import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";


import { toast } from "sonner";

import { ProjectCardEntity } from "@/@entities";
import {
  ImportProjectButton,
  NewProjectButton,
  SortableCard,
} from "@/components";
import { ListPageLayout } from "@/layouts";
import { ProjectService } from "@/services/project/project.service";


export function ListPage() {
  const [projects, setProjects] = useState<ProjectCardEntity[]>([]);
  

  const handleAddProject = () => {
    ProjectService.create()
      .then(() => {
      })
      .catch((error) => {
        console.error("Erro ao adicionar o projeto:", error);
        toast.error("Erro ao adicionar o projeto. Tente novamente!");
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
  }, [handleAddProject]);

  const handleDragEnd = (event: import("@dnd-kit/core").DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over?.id);

      setProjects((items) => arrayMove(items, oldIndex, newIndex));
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
              {projects.map((project) => (
                <SortableCard key={project.id} {...project} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </ListPageLayout>
    </div>
  );
}
