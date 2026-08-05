import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardDeployment } from "@/lib/dashboard";

type RecentProjectsProps = {
  deployments: DashboardDeployment[];
  isLoading?: boolean;
  isError?: boolean;
};

export function RecentProjects({ deployments, isLoading = false, isError = false }: RecentProjectsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {isLoading && Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-[66px] w-full" />)}
        {isError && <p role="alert" className="py-6 text-sm text-secondary">Unable to load projects. Please try again shortly.</p>}
        {!isLoading && !isError && deployments.length === 0 && <p className="py-6 text-sm text-secondary">No projects found.</p>}
        {!isLoading && !isError && deployments.slice(0, 4).map((deployment) => (
          <Link key={deployment.id} href={deployment.projectId ? `/projects/${deployment.projectId}` : "/projects"} className="flex items-center justify-between gap-4 rounded-md border bg-white/[0.03] p-3 transition hover:border-primary/60">
            <div>
              <p className="font-medium text-foreground">{deployment.projectId ?? "Project unavailable"}</p>
              <p className="text-xs text-secondary">Deployment · {deployment.createdAt ?? "Date unavailable"}</p>
            </div>
            <StatusBadge status={deployment.status ?? "Unknown"} />
          </Link>
        ))}
      </div>
    </Card>
  );
}
