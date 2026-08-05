import api from "./api";
import type { Domain } from "@/types";

export const domainsApi = {
  getAll: async (projectId?: string): Promise<Domain[]> => {
    const response = await api.get("/api/domains", {
      params: projectId ? { projectId } : undefined,
    });
    return response.data;
  },

  getById: async (id: string): Promise<Domain> => {
    const response = await api.get(`/api/domains/${id}`);
    return response.data;
  },

  create: async (data: { projectId: string; domain: string }): Promise<Domain> => {
    const response = await api.post("/api/domains", data);
    return response.data;
  },

  verify: async (id: string): Promise<Domain> => {
    const response = await api.post(`/api/domains/${id}/verify`);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/domains/${id}`);
  },

  getByProject: async (projectId: string): Promise<Domain[]> => {
    const response = await api.get(`/api/projects/${projectId}/domains`);
    return response.data;
  },
};
