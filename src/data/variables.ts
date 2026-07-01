import type { EnvironmentVariable } from "@/types";

export const variables: EnvironmentVariable[] = [
  { id: "env_1", projectId: "atlas-web", key: "NEXT_PUBLIC_API_URL", value: "https://api.atlas.dev", sensitive: false },
  { id: "env_2", projectId: "atlas-web", key: "DATABASE_URL", value: "postgres://atlas:secret@db", sensitive: true },
  { id: "env_3", projectId: "atlas-web", key: "GITHUB_TOKEN", value: "ghp_1a2b3c4d5e", sensitive: true },
  { id: "env_4", projectId: "merchant-api", key: "NODE_ENV", value: "production", sensitive: false },
];
