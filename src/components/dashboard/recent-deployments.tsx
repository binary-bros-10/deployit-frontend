import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import type { Deployment } from "@/types";

export function RecentDeployments({ deployments }: { deployments: Deployment[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Deployments</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {deployments.slice(0, 4).map((deployment) => (
          <div key={deployment.id} className="flex items-center justify-between gap-4 rounded-md border bg-white/[0.03] p-3">
            <div>
              <p className="font-mono text-sm text-foreground">{deployment.commitHash}</p>
              <p className="text-xs text-secondary">{deployment.createdAt} · {deployment.duration}s</p>
            </div>
            <StatusBadge status={deployment.status} />
          </div>
        ))}
      </div>
    </Card>
  );
}
