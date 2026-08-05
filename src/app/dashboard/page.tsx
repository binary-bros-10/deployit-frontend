"use client";

import { Boxes, CircleCheck, Globe2, TriangleAlert } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentDeployments } from "@/components/dashboard/recent-deployments";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { useDashboardDeployments } from "@/hooks/useDashboardDeployments";

export default function DashboardPage() {
  const { data: deployments = [], isLoading, isError } = useDashboardDeployments();
  const successfulDeployments = deployments.filter((deployment) => deployment.status?.toLowerCase() === "success").length;
  const failedDeployments = deployments.filter((deployment) => deployment.status?.toLowerCase() === "failed").length;

  return (
    <DashboardLayout>
      <PageShell title="Dashboard" description="A fast read on every project, deployment, and production domain.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Projects" value={isError ? "—" : String(deployments.length)} icon={<Boxes size={22} />} isLoading={isLoading} />
          <StatCard label="Successful Deployments" value={isError ? "—" : String(successfulDeployments)} icon={<CircleCheck size={22} />} isLoading={isLoading} />
          <StatCard label="Failed Deployments" value={isError ? "—" : String(failedDeployments)} icon={<TriangleAlert size={22} />} isLoading={isLoading} />
          <StatCard label="Active Domains" value="—" icon={<Globe2 size={22} />} isLoading={isLoading} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <RecentDeployments deployments={deployments} isLoading={isLoading} isError={isError} />
          <RecentProjects deployments={deployments} isLoading={isLoading} isError={isError} />
        </div>
      </PageShell>
    </DashboardLayout>
  );
}
