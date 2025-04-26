import { ProjectRepository } from "@/db/repositories/project.repository";
import { Project } from "@/db/types";

export class ProjectService {
  private static repository: ProjectRepository = new ProjectRepository();

  static async create(): Promise<void> {
    const defaultProject: Project = {
      id: crypto.randomUUID(),
      title: "Novo Projeto",
      icon: "FaAutoprefixer",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.createProject(defaultProject);
  }

  static async getAll(): Promise<Project[]> {
    return this.repository.getAllProjects();
  }

  static async getById(id: string): Promise<Project | undefined> {
    return this.repository.getProjectById(id);
  }

  static async update(project: Project): Promise<void> {
    return this.repository.updateProject(project);
  }

  static async delete(id: string): Promise<void> {
    return this.repository.deleteProject(id);
  }

  static async duplicate(id: string): Promise<void> {
    const project = await this.getById(id);
    if (project) {
      const duplicatedProject = {
        ...project,
        id: crypto.randomUUID(),
      };
      return this.repository.createProject(duplicatedProject);
    }
    throw new Error("Projeto não encontrado para duplicação");
  }
}
