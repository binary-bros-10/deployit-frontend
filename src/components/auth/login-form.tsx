"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: FormValues) {
    login(values, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-secondary">Email</label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...form.register("email")}
          disabled={isPending}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-secondary">Password</label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...form.register("password")}
          disabled={isPending}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-400">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
      </Button>
    </form>
  );
}
