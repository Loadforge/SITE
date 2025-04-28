import { ProjectRepository } from "@/db/repositories/project.repository";
import { Project } from "@/db/types";

export class ProjectService {
  private static repository: ProjectRepository = new ProjectRepository();

  static async create(): Promise<Project> {
    return await this.repository.createProject();
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
  static async rename(id: string, newTitle: string): Promise<void> {
    return this.repository.renameProject(id, newTitle);
  }

  static async updateIcon(id: string, newIcon: string): Promise<void> {
    return this.repository.updateIcon(id, newIcon);
  }
}
