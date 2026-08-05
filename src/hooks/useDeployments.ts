"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deploymentsApi } from "@/lib/deployments";
import { toast } from "sonner";

export function useDeployments(projectId?: string) {
  return useQuery({
    queryKey: ["deployments", projectId],
    queryFn: () => deploymentsApi.getAll(projectId),
    enabled: !projectId || !!projectId,
  });
}

export function useProjectDeployments(projectId: string) {
  return useQuery({
    queryKey: ["projects", projectId, "deployments"],
    queryFn: () => deploymentsApi.getByProject(projectId),
    enabled: !!projectId,
  });
}

export function useDeployment(id: string) {
  return useQuery({
    queryKey: ["deployments", id],
    queryFn: () => deploymentsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateDeployment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { projectId: string; commitHash: string }) =>
      deploymentsApi.create(data),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["deployments"] });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId, "deployments"] });
      toast.success("Deployment started successfully");
    },
    onError: (error) => {
      toast.error("Failed to start deployment");
      console.error(error);
    },
  });
}
