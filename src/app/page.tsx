import Link from "next/link";
import { ArrowRight, GitPullRequest, Server, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold"><span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-surface"><Zap size={20} /></span>DeployIt</Link>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost"><Link href="/login">Login</Link></Button>
          <Button asChild><Link href="/dashboard">Get Started</Link></Button>
        </div>
      </nav>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="mb-5 inline-flex rounded-full border px-3 py-1 text-sm text-primary">GitHub to production in seconds</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">Deploy your apps in one click.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-secondary">From GitHub to production in seconds. Build, ship, inspect, and scale from a focused dashboard built for developers.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild><Link href="/dashboard">Get Started <ArrowRight size={17} /></Link></Button>
            <Button asChild variant="secondary"><Link href="/login"><GitPullRequest size={17} /> GitHub</Link></Button>
          </div>
        </div>
        <Card className="p-4">
          <div className="rounded-md bg-[#111015] p-5 font-mono text-sm text-secondary">
            <p><span className="text-primary">$</span> deployit connect github.com/acme/app</p>
            <p className="mt-4">✓ Repository cloned</p>
            <p>✓ Dependencies installed</p>
            <p>✓ Build completed</p>
            <p className="mt-4 text-primary">https://acme.deployit.app</p>
          </div>
        </Card>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:grid-cols-3">
        {[
          [GitPullRequest, "Connect GitHub", "Import repositories and ship every branch with predictable previews."],
          [Server, "Managed runtime", "Deploy Node, React, Next.js, and Express projects with clean defaults."],
          [ShieldCheck, "Domains and SSL", "Verify custom domains and keep certificates active from one view."],
        ].map(([Icon, title, description]) => (
          <Card key={title as string}>
            <Icon className="mb-5 text-primary" size={26} />
            <CardTitle>{title as string}</CardTitle>
            <CardDescription className="mt-2">{description as string}</CardDescription>
          </Card>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <Card className="grid gap-5 md:grid-cols-3">
          {["Choose a repository", "Configure framework", "Deploy to production"].map((step, index) => (
            <div key={step} className="flex gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-sm font-semibold text-surface">{index + 1}</span>
              <div><h3 className="font-semibold">{step}</h3><p className="mt-1 text-sm text-secondary">A focused flow with sensible defaults and room for advanced settings.</p></div>
            </div>
          ))}
        </Card>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12">
        <h2 className="mb-8 text-center text-3xl font-semibold">Simple, transparent pricing</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Free", price: "$0", features: ["1 project", "100GB bandwidth", "Community support"] },
            { name: "Pro", price: "$20", features: ["10 projects", "1TB bandwidth", "Priority support", "Custom domains"] },
            { name: "Enterprise", price: "Custom", features: ["Unlimited projects", "Unlimited bandwidth", "Dedicated support", "SSO", "SLA"] },
          ].map((plan) => (
            <Card key={plan.name} className="flex flex-col p-6">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-3xl font-semibold">{plan.price}<span className="text-sm text-secondary">/month</span></p>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-secondary">
                    <span className="text-primary">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full" variant={plan.name === "Pro" ? "default" : "secondary"}>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t px-5 py-8 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>DeployIt</p>
        <p>Modern deployments for developer teams.</p>
      </footer>
    </main>
  );
}
