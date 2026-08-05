import api from "./api";

export type DeploymentDetails = {
  id: string;
  name: string | null;
  status: string | null;
  repository: string | null;
  branch: string | null;
  commitHash: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  containerId: string | null;
  image: string | null;
  cpu: string | null;
  memory: string | null;
  url: string | null;
  domain: string | null;
};

type DeploymentRecord = Record<string, unknown>;

function getString(value: unknown): string | null {
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function getDeployment(payload: unknown): DeploymentRecord {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return {};
  }

  const envelope = payload as { deployment?: unknown; data?: unknown };
  const candidate = envelope.deployment ?? envelope.data ?? payload;
  return typeof candidate === "object" && candidate !== null && !Array.isArray(candidate)
    ? candidate as DeploymentRecord
    : {};
}

function toDeploymentDetails(payload: unknown, deploymentId: string): DeploymentDetails {
  const deployment = getDeployment(payload);

  return {
    id: getString(deployment.id ?? deployment._id) ?? deploymentId,
    name: getString(deployment.name),
    status: getString(deployment.status),
    repository: getString(deployment.repository ?? deployment.repo),
    branch: getString(deployment.branch),
    commitHash: getString(deployment.commitHash ?? deployment.commit_hash),
    createdAt: getString(deployment.createdAt ?? deployment.created_at),
    updatedAt: getString(deployment.updatedAt ?? deployment.updated_at),
    containerId: getString(deployment.containerId),
    image: getString(deployment.image),
    cpu: getString(deployment.cpu),
    memory: getString(deployment.memory),
    url: getString(deployment.url),
    domain: getString(deployment.domain),
  };
}

export const deploymentDetailsApi = {
  getById: async (deploymentId: string): Promise<DeploymentDetails> => {
    const response = await api.get<unknown>(`/deployments/${encodeURIComponent(deploymentId)}`);
    return toDeploymentDetails(response.data, deploymentId);
  },
};
