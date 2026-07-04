"use client";

import { Card } from "@/components/ui/card";

export function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary">{label}</p>
          <p className="mt-3 text-3xl font-semibold">{value}</p>
        </div>
        <div className="rounded-md bg-primary p-3 text-surface">
          {icon}
        </div>
      </div>
    </Card>
  );
}
