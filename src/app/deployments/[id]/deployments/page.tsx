import { notFound } from "next/navigation";
import { DeploymentCard } from "@/components/deployments/deployment-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { deployments } from "@/data/deployments";
import { projects } from "@/data/projects";

export default async function DeploymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();
  const projectDeployments = deployments.filter((item) => item.projectId === id);

  return (
    <DashboardLayout>
      <PageShell title={`${project.name} Deployments`} description="Build history, commit hashes, status, and duration.">
        <ProjectTabs projectId={id} active="Deployments" />
        <div className="space-y-4">
          {projectDeployments.map((deployment) => <DeploymentCard key={deployment.id} deployment={deployment} />)}
        </div>
      </PageShell>
    </DashboardLayout>
  );
}
