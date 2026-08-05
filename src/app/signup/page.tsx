import Link from "next/link";
import { Zap } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { SignupForm } from "@/components/auth/signup-form";


export default function SignupPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <Card className="w-full max-w-md p-8">
        <Link href="/" className="mb-8 flex items-center gap-3 text-lg font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-surface"><Zap size={20} /></span>
          DeployIt
        </Link>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription className="mt-2">Create an account to start deploying your projects.</CardDescription>
        <div className="mt-8">
          <SignupForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </main>
  );
}