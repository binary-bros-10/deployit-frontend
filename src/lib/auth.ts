import api from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    githubUsername?: string;
  };
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const response = await api.post("/api/auth/signup", credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthResponse["user"]> => {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};
