import { useState } from "react";
import { FaAutoprefixer } from "react-icons/fa";

import { ProjectEntity } from "@/@entities";
import { NewProjectButton, ProjectCard } from "@/components";
import { ListPageLayout } from "@/layouts";


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
        <div className="hidden lg:grid lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 justify-items-center gap-10 p-4">
          <NewProjectButton onClick={handleAddProject} />
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              icon={project.icon}
            />
          ))}
        </div>
      </ListPageLayout>
    </div>
  );
}
