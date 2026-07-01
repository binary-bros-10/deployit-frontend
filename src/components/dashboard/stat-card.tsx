import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">{label}</p>
          <p className="mt-3 text-3xl font-semibold">{value}</p>
        </div>
        <div className="rounded-md bg-primary p-3 text-surface">
          <Icon size={22} />
        </div>
      </div>
    </Card>
  );
}
