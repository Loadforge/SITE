import { NewProjectButton, ProjectCard } from "@/components";
import { ListPageLayout } from "@/layouts";
import { FaAutoprefixer } from "react-icons/fa";

const projects = [
  { title: "Project 1", icon: FaAutoprefixer },
  { title: "Project 2", icon: FaAutoprefixer },
  { title: "Project 3", icon: FaAutoprefixer },
  { title: "Project 4", icon: FaAutoprefixer },
  { title: "Project 5", icon: FaAutoprefixer },
  { title: "Project 6", icon: FaAutoprefixer },
  { title: "Project 7", icon: FaAutoprefixer },
];

export function ListPage() {
  return (
    <div className="flex bg-background items-center justify-between  min-h-svh">
      <ListPageLayout>
        <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-4 p-4">
          <NewProjectButton />
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              icon={project.icon}
            />
          ))}
        </div>
      </ListPageLayout>
    </div>
  );
}
