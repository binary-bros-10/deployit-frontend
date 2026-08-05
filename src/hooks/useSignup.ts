"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/auth";
import { useAuthStore } from "@/store/authStore";

export function useSignup() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: ({ email, password, name }: { email: string; password: string; name?: string }) =>
      authApi.signup({ email, password, name }),
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
}
