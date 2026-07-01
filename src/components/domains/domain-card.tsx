import { Globe, ShieldCheck, Trash2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Domain } from "@/types";

export function DomainCard({ domain }: { domain: Domain }) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="flex items-center gap-2 font-medium"><Globe size={17} className="text-primary" /> {domain.domain}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone={domain.verified ? "success" : "warning"}><BadgeCheck size={12} /> {domain.verified ? "Verified" : "Pending verification"}</Badge>
          <Badge tone={domain.ssl ? "success" : "muted"}><ShieldCheck size={12} /> {domain.ssl ? "SSL active" : "SSL pending"}</Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">Verify Domain</Button>
        <Button variant="ghost" size="icon" aria-label="Delete domain"><Trash2 size={16} /></Button>
      </div>
    </Card>
  );
}
