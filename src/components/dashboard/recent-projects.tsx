import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import type { Project } from "@/types";

export function RecentProjects({ projects }: { projects: Project[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {projects.slice(0, 4).map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="flex items-center justify-between gap-4 rounded-md border bg-white/[0.03] p-3 transition hover:border-primary/60">
            <div>
              <p className="font-medium text-foreground">{project.name}</p>
              <p className="text-xs text-secondary">{project.framework} · {project.lastDeployed}</p>
            </div>
            <StatusBadge status={project.status} />
          </Link>
        ))}
      </div>
    </Card>
  );
}
