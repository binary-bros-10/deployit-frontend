"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { domainsApi } from "@/lib/domains";
import { toast } from "sonner";

export function useDomains(projectId?: string) {
  return useQuery({
    queryKey: ["domains", projectId],
    queryFn: () => domainsApi.getAll(projectId),
    enabled: !projectId || !!projectId,
  });
}

export function useProjectDomains(projectId: string) {
  return useQuery({
    queryKey: ["projects", projectId, "domains"],
    queryFn: () => domainsApi.getByProject(projectId),
    enabled: !!projectId,
  });
}

export function useDomain(id: string) {
  return useQuery({
    queryKey: ["domains", id],
    queryFn: () => domainsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { projectId: string; domain: string }) =>
      domainsApi.create(data),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
      queryClient.invalidateQueries({ queryKey: ["projects", projectId, "domains"] });
      toast.success("Domain added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add domain");
      console.error(error);
    },
  });
}

export function useVerifyDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => domainsApi.verify(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
      toast.success("Domain verified successfully");
    },
    onError: (error) => {
      toast.error("Failed to verify domain");
      console.error(error);
    },
  });
}

export function useDeleteDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => domainsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
      toast.success("Domain deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete domain");
      console.error(error);
    },
  });
}
