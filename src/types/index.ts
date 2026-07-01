export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  githubUsername: string;
};

export type ProjectStatus = "Live" | "Building" | "Failed" | "Paused";

export type Project = {
  id: string;
  name: string;
  framework: string;
  status: ProjectStatus;
  url: string;
  lastDeployed: string;
  productionDomain: string;
  repository: string;
};

export type DeploymentStatus = "Building" | "Success" | "Failed";

export type Deployment = {
  id: string;
  projectId: string;
  status: DeploymentStatus;
  commitHash: string;
  duration: number;
  createdAt: string;
};

export type Domain = {
  id: string;
  projectId: string;
  domain: string;
  verified: boolean;
  ssl: boolean;
};

export type EnvironmentVariable = {
  id: string;
  projectId: string;
  key: string;
  value: string;
  sensitive: boolean;
};
