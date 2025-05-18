import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const handleAddProject = () => {
    ProjectService.create()
      .then((project) => {
        navigate(`/project/${project.id}`);
      })
      .catch((error) => {
        console.error(t("errors.addProject"), error);
        toast.error(t("errors.addProjectToast"));
      });
  };

  const handleDelete = (id: string, event?: React.MouseEvent) => {
    event?.preventDefault();

    ProjectService.delete(id)
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        toast.success(t("success.projectDeleted"));
      })
      .catch((error) => {
        console.error(t("errors.deleteProject"), error);
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
        toast.success(t("success.projectRenamed"));
      })
      .catch((error) => {
        console.error(t("errors.renameProject"), error);
        toast.error(t("errors.renameProjectToast"));
      });
  };

  const handleDuplicate = (id: string) => {
    ProjectService.duplicate(id)
      .then((project) => {
        setProjects((prev) => [...prev, project]);
        toast.success(t("success.projectDuplicated"));
      })
      .catch((error) => {
        console.error(t("errors.duplicateProject"), error);
        toast.error(t("errors.duplicateProjectToast"));
      });
  };

  const handleExport = (id: string) => {
    ProjectService.exportToJson(
      id,
      projects.find((p) => p.id === id)?.title || ""
    )
      .then(() => {
        console.log(t("success.projectExported"));
      })
      .catch((error) => {
        console.error(t("errors.exportProject"), error);
      });
  };

  const handleImport = (file: File) => {
    ProjectService.importFromJson(file)
      .then((project) => {
        toast.success(t("success.projectImported"));
        setProjects((prev) => [...prev, project]);
      })
      .catch((error) => {
        console.error(t("errors.importProject"), error);
        toast.error(t("errors.importProjectToast"));
      });
  };

  useEffect(() => {
    ProjectService.getAll()
      .then(setProjects)
      .catch((error) => {
        console.error(t("errors.loadProjects"), error);
      });
  }, [t]);

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

      ProjectService.reorder(reorderedProjects).catch((error) => {
        console.error(t("errors.reorderProjects"), error);
        toast.error(t("errors.reorderProjectsToast"));
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
              <ImportProjectButton handleImport={handleImport} />
              {projects.map((project) => (
                <SortableCard
                  key={project.id}
                  {...project}
                  onClick={handleDelete}
                  onRename={handleRename}
                  onDuplicate={handleDuplicate}
                  onExport={handleExport}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </ListPageLayout>
    </div>
  );
}
