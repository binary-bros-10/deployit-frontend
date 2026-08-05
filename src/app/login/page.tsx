import Link from "next/link";
import { Zap } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";


export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <Card className="w-full max-w-md p-8">
        <Link href="/" className="mb-8 flex items-center gap-3 text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-surface"><Zap size={20} /></span>
          DeployIt
        </Link>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription className="mt-2">Authenticate to create projects, inspect deployments, and manage production settings.</CardDescription>
        <div className="mt-8">
          <LoginForm />
        </div>
      </Card>
    </main>
  );
}

