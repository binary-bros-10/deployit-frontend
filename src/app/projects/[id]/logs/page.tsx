"use client";

import { isAxiosError } from "axios";
import { LogsTerminal } from "@/components/deployments/logs-terminal";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { useDeploymentLogs } from "@/hooks/useDeploymentLogs";
import { useDeploymentLogStream } from "@/hooks/useDeploymentLogStream";
import { useEffect, useState } from "react";

export default function LogsPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const { data: logs = [], isLoading, isError, error, isSuccess } = useDeploymentLogs(id);
  const { logs: terminalLogs, status: streamStatus } = useDeploymentLogStream(id, logs, isSuccess);

  useEffect(() => {
    params.then((routeParams) => setId(routeParams.id));
  }, [params]);

  if (!id) return <DashboardLayout><PageShell title="Loading..." description=""><div className="py-12 text-secondary">Loading...</div></PageShell></DashboardLayout>;

  const isNotFound = isAxiosError(error) && error.response?.status === 404;

  if (isNotFound) {
    return <DashboardLayout><PageShell title="Deployment not found" description="This deployment does not exist or its logs are unavailable."><div className="py-12 text-secondary">Deployment not found.</div></PageShell></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <PageShell title="Deployment Logs" description="Streaming deployment output in a terminal-style view.">
        <ProjectTabs projectId={id} active="Logs" />
        <LogsTerminal logs={terminalLogs} isLoading={isLoading} isError={isError} streamStatus={streamStatus} />
      </PageShell>
    </DashboardLayout>
  );
}
