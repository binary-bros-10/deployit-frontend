"use client";

import { DeploymentCard } from "@/components/deployments/deployment-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { useProjectDeployments } from "@/hooks/useDeployments";
import { useProject } from "@/hooks/useProjects";
import { useEffect, useState } from "react";

export default function DeploymentsPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const { data: project } = useProject(id);
  const { data: deployments = [] } = useProjectDeployments(id);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) return <DashboardLayout><PageShell title="Loading..." description=""><div className="py-12 text-secondary">Loading...</div></PageShell></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageShell title={`${project?.name || "Project"} Deployments`} description="Build history, commit hashes, status, and duration.">
        <ProjectTabs projectId={id} active="Deployments" />
        <div className="space-y-4">
          {deployments.map((deployment) => <DeploymentCard key={deployment.id} deployment={deployment} />)}
        </div>
      </PageShell>
    </DashboardLayout>
  );
}
