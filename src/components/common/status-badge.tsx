import { Badge } from "@/components/ui/badge";
export function StatusBadge({ status }: { status: string }) {
  const tone = status === "Success" || status === "Live" ? "success" : status === "Failed" ? "danger" : "warning";
  return <Badge tone={tone}>{status}</Badge>;
}
