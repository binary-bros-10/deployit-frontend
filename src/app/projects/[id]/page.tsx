import { ExternalLink, Rocket, RotateCcw } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { projects } from "@/data/projects";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <DashboardLayout>
      <PageShell title={project.name} description={project.repository}>
        <ProjectTabs projectId={project.id} active="Overview" />
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Current production state and deployment controls.</CardDescription>
            </div>
            <StatusBadge status={project.status} />
          </CardHeader>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Framework", project.framework],
              ["Current URL", project.url],
              ["Last Deployment", project.lastDeployed],
              ["Production Domain", project.productionDomain],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border bg-white/[0.03] p-4">
                <p className="text-sm text-secondary">{label}</p>
                <p className="mt-2 font-medium">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button><Rocket size={16} /> Deploy</Button>
            <Button variant="secondary"><RotateCcw size={16} /> Redeploy</Button>
            <Button variant="secondary"><ExternalLink size={16} /> Visit</Button>
          </div>
        </Card>
      </PageShell>
    </DashboardLayout>
  );
}
