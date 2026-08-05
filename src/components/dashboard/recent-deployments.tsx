import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardDeployment } from "@/lib/dashboard";

type RecentDeploymentsProps = {
  deployments: DashboardDeployment[];
  isLoading?: boolean;
  isError?: boolean;
};

export function RecentDeployments({ deployments, isLoading = false, isError = false }: RecentDeploymentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Deployments</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {isLoading && Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-[66px] w-full" />)}
        {isError && <p role="alert" className="py-6 text-sm text-secondary">Unable to load deployments. Please try again shortly.</p>}
        {!isLoading && !isError && deployments.length === 0 && <p className="py-6 text-sm text-secondary">No deployments found.</p>}
        {!isLoading && !isError && deployments.slice(0, 4).map((deployment) => (
          <div key={deployment.id} className="flex items-center justify-between gap-4 rounded-md border bg-white/[0.03] p-3">
            <div>
              <p className="font-mono text-sm text-foreground">{deployment.commitHash ?? "Commit unavailable"}</p>
              <p className="text-xs text-secondary">{deployment.createdAt ?? "Date unavailable"} · {deployment.duration === null ? "Duration unavailable" : `${deployment.duration}s`}</p>
            </div>
            <StatusBadge status={deployment.status ?? "Unknown"} />
          </div>
        ))}
      </div>
    </Card>
  );
}
