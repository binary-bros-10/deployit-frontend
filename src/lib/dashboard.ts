import api from "./api";

export type DashboardDeployment = {
  id: string;
  projectId: string | null;
  status: string | null;
  commitHash: string | null;
  duration: number | null;
  createdAt: string | null;
};

type DeploymentRecord = Record<string, unknown>;

function getString(value: unknown): string | null {
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function getNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
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

function toDashboardDeployment(deployment: DeploymentRecord, index: number): DashboardDeployment {
  return {
    id: getString(deployment.id ?? deployment._id) ?? `deployment-${index}`,
    projectId: getString(deployment.projectId ?? deployment.project_id),
    status: getString(deployment.status),
    commitHash: getString(deployment.commitHash ?? deployment.commit_hash ?? deployment.commit),
    duration: getNumber(deployment.duration),
    createdAt: getString(deployment.createdAt ?? deployment.created_at),
  };
}

export const dashboardApi = {
  getDeployments: async (): Promise<DashboardDeployment[]> => {
    const response = await api.get<unknown>("/deployments");
    return getDeployments(response.data).map(toDashboardDeployment);
  },
};
