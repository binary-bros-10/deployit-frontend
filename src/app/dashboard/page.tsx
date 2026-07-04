import { Boxes, CircleCheck, Globe2, TriangleAlert } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentDeployments } from "@/components/dashboard/recent-deployments";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { deployments } from "@/data/deployments";
import { domains } from "@/data/domains";
import { projects } from "@/data/projects";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PageShell title="Dashboard" description="A fast read on every project, deployment, and production domain.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Projects" value={String(projects.length)} icon={<Boxes size={22} />} />
          <StatCard label="Successful Deployments" value={String(deployments.filter((item) => item.status === "Success").length)} icon={<CircleCheck size={22} />} />
          <StatCard label="Failed Deployments" value={String(deployments.filter((item) => item.status === "Failed").length)} icon={<TriangleAlert size={22} />} />
          <StatCard label="Active Domains" value={String(domains.filter((item) => item.verified).length)} icon={<Globe2 size={22} />} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <RecentDeployments deployments={deployments} />
          <RecentProjects projects={projects} />
        </div>
      </PageShell>
    </DashboardLayout>
  );
}
