import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageShell } from "@/components/layout/page-shell";
import { CreateProjectModal } from "@/components/projects/create-project-modal";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <PageShell title="Projects" description="Deploy, open, and manage every GitHub-backed application." action={<CreateProjectModal />}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </PageShell>
    </DashboardLayout>
  );
}
