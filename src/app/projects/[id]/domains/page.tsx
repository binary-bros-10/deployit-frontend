"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DomainCard } from "@/components/domains/domain-card";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectTabs } from "@/components/projects/project-tabs";
import { useProject } from "@/hooks/useProjects";
import { useProjectDomains } from "@/hooks/useDomains";
import { useEffect, useState } from "react";

export default function DomainsPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const { data: project } = useProject(id);
  const { data: domains = [] } = useProjectDomains(id);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) return <DashboardLayout><PageShell title="Loading..." description=""><div className="py-12 text-secondary">Loading...</div></PageShell></DashboardLayout>;

  return (
    <DashboardLayout>
      <PageShell title={`${project?.name || "Project"} Domains`} description="Custom domains, verification state, and SSL status." action={<Button><Plus size={16} /> Add Domain</Button>}>
        <ProjectTabs projectId={id} active="Domains" />
        <div className="space-y-4">
          {domains.map((domain) => <DomainCard key={domain.id} domain={domain} />)}
        </div>
      </PageShell>
    </DashboardLayout>
  );
}
