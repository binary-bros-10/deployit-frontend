import api from "./api";

export type ProjectListDeployment = {
  id: string;
  name: string | null;
  status: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  repository: string | null;
  branch: string | null;
  commitHash: string | null;
};

type DeploymentRecord = Record<string, unknown>;

function getString(value: unknown): string | null {
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function getDeployments(payload: unknown): DeploymentRecord[] {
  if (Array.isArray(payload)) {
    return payload.filter((item): item is DeploymentRecord => typeof item === "object" && item !== null);
  }

  if (typeof payload !== "object" || payload === null) {
    return [];
  }

  const envelope = payload as { data?: unknown; deployments?: unknown };
  return getDeployments(envelope.deployments ?? envelope.data);
}

function toProjectListDeployment(deployment: DeploymentRecord): ProjectListDeployment | null {
  const id = getString(deployment.id ?? deployment._id);

  if (!id) {
    return null;
  }

  return {
    id,
    name: getString(deployment.name),
    status: getString(deployment.status),
    createdAt: getString(deployment.createdAt ?? deployment.created_at),
    updatedAt: getString(deployment.updatedAt ?? deployment.updated_at),
    repository: getString(deployment.repository ?? deployment.repo),
    branch: getString(deployment.branch),
    commitHash: getString(deployment.commitHash ?? deployment.commit_hash),
  };
}

export const projectListApi = {
  getDeployments: async (): Promise<ProjectListDeployment[]> => {
    const response = await api.get<unknown>("/deployments");
    return getDeployments(response.data)
      .map(toProjectListDeployment)
      .filter((deployment): deployment is ProjectListDeployment => deployment !== null);
  },
};
