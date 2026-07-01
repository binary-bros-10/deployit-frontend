import { Badge } from "@/components/ui/badge";
import type { DeploymentStatus, ProjectStatus } from "@/types";

export function StatusBadge({ status }: { status: ProjectStatus | DeploymentStatus }) {
  const tone = status === "Success" || status === "Live" ? "success" : status === "Failed" ? "danger" : "warning";
  return <Badge tone={tone}>{status}</Badge>;
}
