import { ProjectRepository } from "@/db/repositories/project.repository";
import { Project } from "@/db/types";
import { downloadJsonFile } from "@/util/download.json";

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
  static async reorder(projects: Project[]): Promise<void> {
    return this.repository.reorderProjects(projects);
  }
  static async duplicate(id: string): Promise<Project> {
    return this.repository.duplicateProject(id);
  }
  static async exportToJson(id: string): Promise<void> {
    const json = await this.repository.exportProjectToJson(id);
    console.log("json", json);
    if (json) {
      const filename = `projeto-${id}`;
      downloadJsonFile(json, filename);
    } else {
      console.error("Projeto não encontrado.");
    }
  }
  static async importFromJson(file: File): Promise<Project> {
    return await this.repository.importProjectFromJson(file);
  }
}
