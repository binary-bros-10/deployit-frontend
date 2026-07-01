import { notFound } from "next/navigation";
import { LogsTerminal } from "@/components/deployments/logs-terminal";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { projects } from "@/data/projects";

export default async function LogsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <DashboardLayout>
      <PageShell title={`${project.name} Logs`} description="Streaming deployment output in a terminal-style view.">
        <ProjectTabs projectId={id} active="Logs" />
        <LogsTerminal />
      </PageShell>
    </DashboardLayout>
  );
}
