import { IDBPDatabase } from "idb";

import { openDb } from "../initialize.db";
import { Project } from "../types";

import { RequestRepository } from "./request.repository";

export class ProjectRepository {
  private db?: IDBPDatabase;
  private requestRepository: RequestRepository;

  constructor() {
    this.requestRepository = new RequestRepository();
  }

  private async getDb(): Promise<IDBPDatabase> {
    if (!this.db) {
      this.db = await openDb();
    }
    return this.db;
  }
  async createProject(): Promise<Project> {
    const projectCount = (await this.getAllProjects()).length;

    const defaultProject: Project = {
      id: crypto.randomUUID(),
      index: projectCount + 1,
      title: `Novo Projeto ${projectCount + 1}`,
      icon: "FaAutoprefixer",
    };
    const db = await this.getDb();
    const tx = db.transaction("project", "readwrite");
    const store = tx.objectStore("project");

    await store.add(defaultProject);

    await tx.done;

    return defaultProject;
  }

  async getAllProjects(): Promise<Project[]> {
    const db = await this.getDb();
    const tx = db.transaction("project", "readonly");
    const store = tx.objectStore("project");

    const projects = await store.getAll();
    await tx.done;

    return projects.sort((a, b) => a.index - b.index);
  }

  async getProjectById(id: string): Promise<Project> {
    const db = await this.getDb();
    const tx = db.transaction("project", "readonly");
    const store = tx.objectStore("project");
    return store.get(id);
  }

  async updateProject(project: Project): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("project", "readwrite");
    const store = tx.objectStore("project");
    await store.put(project);
  }

  async deleteProject(id: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("project", "readwrite");
    const store = tx.objectStore("project");
    await store.delete(id);
    await this.requestRepository.deleteAllRequestsByProjectId(id);
  }
  async renameProject(id: string, newTitle: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("project", "readwrite");
    const store = tx.objectStore("project");
    const project = await store.get(id);

    if (project) {
      project.title = newTitle;
      await store.put(project);
    }
    await tx.done;
  }

  async updateIcon(id: string, newIcon: string): Promise<void> {
    const db = await this.getDb();
    const tx = db.transaction("project", "readwrite");
    const store = tx.objectStore("project");
    const project = await store.get(id);

    if (project) {
      project.icon = newIcon;
      await store.put(project);
    }
    await tx.done;
  }
  async reorderProjects(projects: Project[]): Promise<void> {
    for (const project of projects) {
      await this.updateProject(project);
    }
  }
  async exportProjectToJson(id: string): Promise<string | null> {
    const project = await this.getProjectById(id);
    if (!project) return null;

    const requests = await this.requestRepository.getRequestsByProjectId(
      project.id
    );

    const fullRequests = [];
    for (const request of requests) {
      const fullRequest = await this.requestRepository.getFullRequestById(
        request.id
      );
      fullRequests.push(fullRequest);
    }

    const exportData = {
      project,
      requests: fullRequests,
    };

    return JSON.stringify(exportData, null, 2);
  }
  async duplicateProject(id: string): Promise<Project> {
    const db = await this.getDb();
    const tx = db.transaction("project", "readwrite");
    const store = tx.objectStore("project");

    const project = await store.get(id);
    if (!project) throw new Error("Project not found");
    const newProjectId = crypto.randomUUID();
    const duplicatedProject: Project = {
      ...project,
      id: newProjectId,
      index: project.index + 1,
      title: `${project.title} (Copy)`,
    };
    await store.add(duplicatedProject);
    await tx.done;
    await this.requestRepository.duplicateAllRequestsByProjectId(
      id,
      newProjectId
    );
    return duplicatedProject;
  }
  async importProjectFromJson(file: File): Promise<Project> {
    const text = await file.text();
    const data = JSON.parse(text);

    const db = await this.getDb();
    const tx = db.transaction("project", "readwrite");
    const store = tx.objectStore("project");
    const newProjectID = crypto.randomUUID();
    const project: Project = {
      ...data.project,
      id: newProjectID,
    };

    await store.add(project);
    await tx.done;
    await this.requestRepository.importRequestsFromJson(
      data.requests,
      newProjectID
    );
    return project;
  }
}
