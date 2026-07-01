import type { Deployment } from "@/types";

export const deployments: Deployment[] = [
  { id: "dep_1008", projectId: "atlas-web", status: "Success", commitHash: "a83f91c", duration: 42, createdAt: "2 minutes ago" },
  { id: "dep_1007", projectId: "merchant-api", status: "Building", commitHash: "e2d770a", duration: 18, createdAt: "18 minutes ago" },
  { id: "dep_1006", projectId: "pulse-dashboard", status: "Success", commitHash: "f77aa09", duration: 55, createdAt: "1 hour ago" },
  { id: "dep_1005", projectId: "jobs-worker", status: "Failed", commitHash: "b18c120", duration: 31, createdAt: "Yesterday" },
  { id: "dep_1004", projectId: "atlas-web", status: "Success", commitHash: "d452c88", duration: 39, createdAt: "Yesterday" },
];
