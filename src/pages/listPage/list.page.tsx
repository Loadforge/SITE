import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { FaAutoprefixer } from "react-icons/fa";

import { ProjectCardEntity } from "@/@entities";
import {
  ImportProjectButton,
  NewProjectButton,
  SortableCard,
} from "@/components";
import { ListPageLayout } from "@/layouts";

export function ListPage() {
  const [projects, setProjects] = useState<ProjectCardEntity[]>([]);

  const handleAddProject = () => {
    const nextNumber = projects.length + 1;
    const newProject: ProjectCardEntity = {
      id: crypto.randomUUID(),
      title: `Project ${nextNumber}`,
      icon: FaAutoprefixer,
    };
    setProjects((prev) => [...prev, newProject]);
  };

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
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map((p) => p.id)} strategy={rectSortingStrategy}>
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
