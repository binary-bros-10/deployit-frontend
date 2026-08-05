"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export function SignupForm() {
  const router = useRouter();
  const { mutate: signup, isPending } = useSignup();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  function onSubmit(values: FormValues) {
    signup(values, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-secondary">Name</label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...form.register("name")}
          disabled={isPending}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
        )}
      </div>
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
        {isPending ? <Loader2 size={16} className="animate-spin" /> : "Create Account"}
      </Button>
    </form>
  );
}
