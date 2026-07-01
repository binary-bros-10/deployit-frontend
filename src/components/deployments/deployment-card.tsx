import { GitCommit, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import type { Deployment } from "@/types";

export function DeploymentCard({ deployment }: { deployment: Deployment }) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2 font-mono text-sm">
          <GitCommit size={16} className="text-primary" />
          {deployment.commitHash}
        </div>
        <p className="mt-2 text-sm text-secondary">Created {deployment.createdAt}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-1 text-sm text-secondary"><Timer size={16} /> {deployment.duration}s</span>
        <StatusBadge status={deployment.status} />
      </div>
    </Card>
  );
}
