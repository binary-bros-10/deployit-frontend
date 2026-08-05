import api from "./api";

export type DeploymentLog = {
  id: string;
  timestamp: string | null;
  level: string | null;
  message: string | null;
};

type LogRecord = Record<string, unknown>;

function getString(value: unknown): string | null {
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function getLogItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (typeof payload !== "object" || payload === null) {
    return [];
  }

  const envelope = payload as { logs?: unknown; data?: unknown };
  return getLogItems(envelope.logs ?? envelope.data);
}

export function normalizeDeploymentLog(log: unknown, fallbackId: string): DeploymentLog | null {
  if (typeof log === "string") {
    return { id: fallbackId, timestamp: null, level: null, message: log };
  }

  if (typeof log !== "object" || log === null || Array.isArray(log)) {
    return null;
  }

  const record = log as LogRecord;
  return {
    id: getString(record.id ?? record._id) ?? fallbackId,
    timestamp: getString(record.timestamp),
    level: getString(record.level),
    message: getString(record.message ?? record.log ?? record.text),
  };
}

export function getDeploymentLogFingerprint(log: DeploymentLog): string {
  return `${log.timestamp ?? ""}|${log.level ?? ""}|${log.message ?? ""}`;
}

export const deploymentLogsApi = {
  getByDeploymentId: async (deploymentId: string): Promise<DeploymentLog[]> => {
    const response = await api.get<unknown>(`/deployments/${encodeURIComponent(deploymentId)}/logs`);
    return getLogItems(response.data)
      .map((log, index) => normalizeDeploymentLog(log, `log-${index}`))
      .filter((log): log is DeploymentLog => log !== null);
  },
};
