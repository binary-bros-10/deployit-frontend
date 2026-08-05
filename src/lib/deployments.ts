import api from "./api";
import type { Deployment } from "@/types";

export const deploymentsApi = {
  getAll: async (projectId?: string): Promise<Deployment[]> => {
    const response = await api.get("/api/deployments", {
      params: projectId ? { projectId } : undefined,
    });
    return response.data;
  },

  getById: async (id: string): Promise<Deployment> => {
    const response = await api.get(`/api/deployments/${id}`);
    return response.data;
  },

  create: async (data: { projectId: string; commitHash: string }): Promise<Deployment> => {
    const response = await api.post("/api/deployments", data);
    return response.data;
  },

  getByProject: async (projectId: string): Promise<Deployment[]> => {
    const response = await api.get(`/api/projects/${projectId}/deployments`);
    return response.data;
  },
};
