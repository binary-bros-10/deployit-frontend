import { Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DomainCard } from "@/components/domains/domain-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { domains } from "@/data/domains";
import { projects } from "@/data/projects";

export default async function DomainsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <DashboardLayout>
      <PageShell title={`${project.name} Domains`} description="Custom domains, verification state, and SSL status." action={<Button><Plus size={16} /> Add Domain</Button>}>
        <ProjectTabs projectId={id} active="Domains" />
        <div className="space-y-4">
          {domains.filter((item) => item.projectId === id).map((domain) => <DomainCard key={domain.id} domain={domain} />)}
        </div>
      </PageShell>
    </DashboardLayout>
  );
}
