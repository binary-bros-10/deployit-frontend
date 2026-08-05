"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateProjectModal } from "@/components/projects/create-project-modal";
import { ProjectCard } from "@/components/projects/project-card";
import { useProjectListDeployments } from "@/hooks/useProjectListDeployments";

function ProjectCardSkeleton() {
  return (
    <div className="min-h-72 rounded-lg border bg-surface p-5 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2"><Skeleton className="h-5 w-32" /><Skeleton className="h-4 w-20" /></div>
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="mt-8 space-y-3"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-40" /></div>
      <div className="mt-16 grid grid-cols-2 gap-2"><Skeleton className="h-8" /><Skeleton className="h-8" /><Skeleton className="h-8" /><Skeleton className="h-8" /></div>
    </div>
  );
}

export default function ProjectsPage() {
  const { data: deployments = [], isLoading, isError } = useProjectListDeployments();

  return (
    <DashboardLayout>
      <PageShell title="Projects" description="Deploy, open, and manage every GitHub-backed application." action={<CreateProjectModal />}>
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
            <div className="col-span-full flex items-center gap-2 text-sm text-secondary"><LoadingSpinner /> Loading projects</div>
            {Array.from({ length: 6 }, (_, index) => <ProjectCardSkeleton key={index} />)}
          </div>
        )}
        {!isLoading && isError && <div role="alert"><EmptyState title="Unable to load projects" description="Please try again shortly." /></div>}
        {!isLoading && !isError && deployments.length === 0 && <EmptyState title="No projects found" description="Deployments will appear here when they are available." />}
        {!isLoading && !isError && deployments.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {deployments.map((deployment) => <ProjectCard key={deployment.id} deployment={deployment} />)}
          </div>
        )}
      </PageShell>
    </DashboardLayout>
  );
}
