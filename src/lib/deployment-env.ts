import api from "./api";

export type DeploymentEnvironmentVariable = {
  id: string | null;
  key: string;
  value: string | null;
  isSecret: boolean;
  isMasked: boolean;
};

type EnvironmentRecord = Record<string, unknown>;

function getString(value: unknown): string | null {
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function getBoolean(value: unknown): boolean {
  return value === true || value === 1 || value === "true" || value === "1";
}

function getEnvironmentItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (typeof payload !== "object" || payload === null) {
    return [];
  }

  const envelope = payload as { env?: unknown; variables?: unknown; data?: unknown };
  return getEnvironmentItems(envelope.env ?? envelope.variables ?? envelope.data);
}

function toEnvironmentVariable(item: unknown): DeploymentEnvironmentVariable | null {
  if (typeof item !== "object" || item === null || Array.isArray(item)) {
    return null;
  }

  const variable = item as EnvironmentRecord;
  const key = getString(variable.key ?? variable.name ?? variable.variable);
  if (!key) return null;

  const maskedValue = typeof variable.masked === "string" ? variable.masked : null;
  return {
    id: getString(variable.id ?? variable._id),
    key,
    value: getString(variable.value) ?? maskedValue,
    isSecret: getBoolean(variable.isSecret) || getBoolean(variable.secret),
    isMasked: getBoolean(variable.masked) || maskedValue !== null,
  };
}

export const deploymentEnvApi = {
  getByDeploymentId: async (deploymentId: string): Promise<DeploymentEnvironmentVariable[]> => {
    const response = await api.get<unknown>(`/deployments/${encodeURIComponent(deploymentId)}/env`);
    return getEnvironmentItems(response.data)
      .map(toEnvironmentVariable)
      .filter((variable): variable is DeploymentEnvironmentVariable => variable !== null);
  },
};
