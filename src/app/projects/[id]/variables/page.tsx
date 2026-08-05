"use client";

import { isAxiosError } from "axios";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { VariablesTable } from "@/components/variables/variables-table";
import { useDeploymentEnv } from "@/hooks/useDeploymentEnv";
import { useEffect, useState } from "react";

export default function VariablesPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const { data: variables = [], isLoading, isError, error } = useDeploymentEnv(id);

  useEffect(() => {
    params.then((routeParams) => setId(routeParams.id));
  }, [params]);

  if (!id) return <DashboardLayout><PageShell title="Loading..." description=""><div className="py-12 text-secondary">Loading...</div></PageShell></DashboardLayout>;

  const isNotFound = isAxiosError(error) && error.response?.status === 404;
  if (isNotFound) {
    return <DashboardLayout><PageShell title="Deployment not found" description="This deployment does not exist or its environment is unavailable."><div className="py-12 text-secondary">Deployment not found.</div></PageShell></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <PageShell title="Deployment Variables" description="Manage runtime configuration without exposing sensitive values.">
        <ProjectTabs projectId={id} active="Environment Variables" />
        <VariablesTable variables={variables} isLoading={isLoading} isError={isError} />
      </PageShell>
    </DashboardLayout>
  );
}
