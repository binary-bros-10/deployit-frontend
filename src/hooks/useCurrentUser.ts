"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated,
    retry: false,
  });
}
