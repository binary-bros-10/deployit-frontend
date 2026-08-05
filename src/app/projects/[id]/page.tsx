"use client";

import { ExternalLink, Rocket, RotateCcw } from "lucide-react";
import { isAxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/common/status-badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { useDeploymentDetails } from "@/hooks/useDeploymentDetails";
import { useEffect, useState } from "react";

function DeploymentDetailsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div><Skeleton className="h-5 w-24" /><Skeleton className="mt-2 h-4 w-72" /></div>
        <Skeleton className="h-6 w-16" />
      </CardHeader>
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => <div key={index} className="rounded-md border bg-white/[0.03] p-4"><Skeleton className="h-4 w-28" /><Skeleton className="mt-2 h-5 w-40" /></div>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-3"><Skeleton className="h-9 w-20" /><Skeleton className="h-9 w-24" /><Skeleton className="h-9 w-16" /></div>
    </Card>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const { data: deployment, isLoading, isError, error } = useDeploymentDetails(id);

  useEffect(() => {
    params.then((routeParams) => setId(routeParams.id));
  }, [params]);

  if (!id || isLoading) {
    return <DashboardLayout><PageShell title="Loading..." description=""><DeploymentDetailsSkeleton /></PageShell></DashboardLayout>;
  }

  const isNotFound = isAxiosError(error) && error.response?.status === 404;

  if (isNotFound) {
    return <DashboardLayout><PageShell title="Deployment not found" description="This deployment does not exist or is no longer available."><div className="py-12 text-secondary">Deployment not found.</div></PageShell></DashboardLayout>;
  }

  if (isError || !deployment) {
    return <DashboardLayout><PageShell title="Unable to load deployment" description="Please try again shortly."><div className="py-12 text-secondary">Unable to load deployment.</div></PageShell></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <PageShell title={deployment.name ?? deployment.repository ?? "Deployment"} description={deployment.repository ?? "Repository unavailable"}>
        <ProjectTabs projectId={deployment.id} active="Overview" />
        <Card>
          <CardHeader>
            <div><CardTitle>Overview</CardTitle><CardDescription>Current production state and deployment controls.</CardDescription></div>
            <StatusBadge status={deployment.status ?? "Unknown"} />
          </CardHeader>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Framework", "Not available"],
              ["Current URL", deployment.url ?? "Not available"],
              ["Last Deployment", deployment.updatedAt ?? deployment.createdAt ?? "Not available"],
              ["Production Domain", deployment.domain ?? "Not available"],
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
