"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login({ email, password }),
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
}
