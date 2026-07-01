import Link from "next/link";
import { GitPullRequest, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";


export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <Card className="w-full max-w-md p-8">
        <Link href="/" className="mb-8 flex items-center gap-3 text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-surface"><Zap size={20} /></span>
          DeployIt
        </Link>
        <CardTitle className="text-2xl">Login with GitHub</CardTitle>
        <CardDescription className="mt-2">Authenticate to create projects, inspect deployments, and manage production settings.</CardDescription>
        <Button asChild className="mt-8 w-full">
          <Link href="/dashboard"><GitPullRequest size={18} /> Continue with GitHub</Link>
        </Button>
      </Card>
    </main>
  );
}

