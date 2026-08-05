"use client";

import { useQuery } from "@tanstack/react-query";
import { deploymentLogsApi } from "@/lib/deployment-logs";

export function useDeploymentLogs(deploymentId: string) {
  return useQuery({
    queryKey: ["deployments", deploymentId, "logs"],
    queryFn: () => deploymentLogsApi.getByDeploymentId(deploymentId),
    enabled: Boolean(deploymentId),
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
  });
}
