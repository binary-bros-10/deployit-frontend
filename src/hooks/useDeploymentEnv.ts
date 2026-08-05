"use client";

import { useQuery } from "@tanstack/react-query";
import { deploymentEnvApi } from "@/lib/deployment-env";

export function useDeploymentEnv(deploymentId: string) {
  return useQuery({
    queryKey: ["deployments", deploymentId, "env"],
    queryFn: () => deploymentEnvApi.getByDeploymentId(deploymentId),
    enabled: Boolean(deploymentId),
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
  });
}
