"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/lib/dashboard";

export function useDashboardDeployments() {
  return useQuery({
    queryKey: ["dashboard", "deployments"],
    queryFn: dashboardApi.getDeployments,
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
  });
}
