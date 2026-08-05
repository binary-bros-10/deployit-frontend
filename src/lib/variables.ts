import api from "./api";

export interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  projectId: string;
  sensitive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const variablesApi = {
  getAll: async (projectId: string): Promise<EnvironmentVariable[]> => {
    const response = await api.get(`/api/projects/${projectId}/variables`);
    return response.data;
  },

  create: async (data: { projectId: string; key: string; value: string; sensitive?: boolean }): Promise<EnvironmentVariable> => {
    const response = await api.post("/api/variables", data);
    return response.data;
  },

  update: async (id: string, data: { key?: string; value?: string; sensitive?: boolean }): Promise<EnvironmentVariable> => {
    const response = await api.put(`/api/variables/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/variables/${id}`);
  },
};
