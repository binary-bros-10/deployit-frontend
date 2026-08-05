import axios, { type AxiosInstance } from "axios";

const DEFAULT_BACKEND_URL = "http://localhost:5001";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // The backend does not currently use cross-origin cookie authentication.
  withCredentials: false,
});

export { apiClient };
export default apiClient;
