"use client";

import { useQuery } from "@tanstack/react-query";
import { projectListApi } from "@/lib/project-list";

export function useProjectListDeployments() {
  return useQuery({
    queryKey: ["projects", "deployments"],
    queryFn: projectListApi.getDeployments,
    staleTime: 30_000,
    refetchInterval: 60_000,
    retry: 1,
  });
}
