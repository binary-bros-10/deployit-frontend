"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { variablesApi } from "@/lib/variables";
import { toast } from "sonner";

export function useVariables(projectId: string) {
  return useQuery({
    queryKey: ["projects", projectId, "variables"],
    queryFn: () => variablesApi.getAll(projectId),
    enabled: !!projectId,
  });
}

export function useCreateVariable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { projectId: string; key: string; value: string }) =>
      variablesApi.create(data),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["projects", projectId, "variables"] });
      toast.success("Variable added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add variable");
      console.error(error);
    },
  });
}

export function useUpdateVariable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { key?: string; value?: string } }) =>
      variablesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variables"] });
      toast.success("Variable updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update variable");
      console.error(error);
    },
  });
}

export function useDeleteVariable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => variablesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["variables"] });
      toast.success("Variable deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete variable");
      console.error(error);
    },
  });
}
