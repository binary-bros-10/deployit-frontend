import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { VariablesTable } from "@/components/variables/variables-table";
import { projects } from "@/data/projects";
import { variables } from "@/data/variables";

export default async function VariablesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <DashboardLayout>
      <PageShell title={`${project.name} Variables`} description="Manage runtime configuration without exposing sensitive values.">
        <ProjectTabs projectId={id} active="Environment Variables" />
        <VariablesTable variables={variables.filter((item) => item.projectId === id)} />
      </PageShell>
    </DashboardLayout>
  );
}
