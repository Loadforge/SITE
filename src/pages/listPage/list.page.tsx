import { NewProjectButton, ProjectCard } from "@/components";
import { ListPageLayout } from "@/layouts";
import { FaAutoprefixer } from "react-icons/fa";
import { ProjectEntity } from "@/@entities";
import { useState } from "react";

export function ListPage() {
  const [projects, setProjects] = useState<ProjectEntity[]>([]);

  const handleAddProject = () => {
    const nextNumber = projects.length + 1;
    const newProject: ProjectEntity = {
      id: crypto.randomUUID(), 
      title: `Project ${nextNumber}`,
      icon: FaAutoprefixer,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="flex bg-background items-center justify-between min-h-svh">
      <ListPageLayout>
        <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center gap-10 p-4">
          <NewProjectButton onClick={handleAddProject} />
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              icon={project.icon}
            />
          ))}
        </div>
      </ListPageLayout>
    </div>
  );
}
