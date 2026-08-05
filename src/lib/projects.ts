import api from "./api";
import type { Project } from "@/types";

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get("/api/projects");
    return response.data;
  },

  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },

  create: async (data: { name: string; repository: string; framework: string }): Promise<Project> => {
    const response = await api.post("/api/projects", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    const response = await api.put(`/api/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/projects/${id}`);
  },
};
