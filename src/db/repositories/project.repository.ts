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
    return store.getAll();
  }

  async getProjectById(id: string): Promise<Project | undefined> {
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
}
