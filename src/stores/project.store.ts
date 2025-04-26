import { create } from "zustand";

import { ProjectEntity, RequestEntity } from "@/@entities";

function updateRequestInProject(
  project: ProjectEntity,
  updatedRequest: RequestEntity
): ProjectEntity {
  const requests = project.requests?.map((r) =>
    r.id === updatedRequest.id ? updatedRequest : r
  );

  return {
    ...project,
    requests,
    updatedAt: new Date().toISOString(),
  };
}

interface ProjectStoreState {
  project: ProjectEntity | null;
  selectedRequest: RequestEntity | null;

  setProject: (project: ProjectEntity) => void;
  updateRequest: (request: RequestEntity) => void;
  updateProjectMeta: (
    data: Partial<Pick<ProjectEntity, "title" | "icon">>
  ) => void;
  mergeProject: (data: Partial<ProjectEntity>) => void;

  setSelectedRequest: (request: RequestEntity | null) => void;
  resetSelections: () => void;
  clearProject: () => void;
}

export const useProjectStore = create<ProjectStoreState>((set, get) => ({
  project: null,
  selectedRequest: null,
  selectedFolder: null,

  setProject: (project) => set({ project }),

  updateRequest: (updatedRequest) => {
    const state = get();
    if (!state.project) return;

    const updatedProject = updateRequestInProject(
      state.project,
      updatedRequest
    );
    set({ project: updatedProject });
  },

  updateProjectMeta: (data) => {
    const state = get();
    if (!state.project) return;

    set({
      project: {
        ...state.project,
        ...data,
        updatedAt: new Date().toISOString(),
      },
    });
  },

  mergeProject: (data) => {
    const state = get();
    if (!state.project) return;

    set({
      project: {
        ...state.project,
        ...data,
        updatedAt: new Date().toISOString(),
      },
    });
  },

  setSelectedRequest: (request) => set({ selectedRequest: request }),
  resetSelections: () => set({ selectedRequest: null }),
  clearProject: () => set({ project: null, selectedRequest: null }),
}));
