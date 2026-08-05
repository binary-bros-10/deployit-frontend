"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCard({ label, value, icon, isLoading = false }: { label: string; value: string; icon: React.ReactNode; isLoading?: boolean }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">{label}</p>
          {isLoading ? <Skeleton className="mt-3 h-9 w-12" /> : <p className="mt-3 text-3xl font-semibold">{value}</p>}
        </div>
        <div className="rounded-md bg-primary p-3 text-surface">
          {icon}
        </div>
      </div>
    </Card>
  );
}
