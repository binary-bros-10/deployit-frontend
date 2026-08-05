"use client";

import { useQuery } from "@tanstack/react-query";
import { deploymentDetailsApi } from "@/lib/deployment-details";

export function useDeploymentDetails(deploymentId: string) {
  return useQuery({
    queryKey: ["deployments", "details", deploymentId],
    queryFn: () => deploymentDetailsApi.getById(deploymentId),
    enabled: Boolean(deploymentId),
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
  });
}
