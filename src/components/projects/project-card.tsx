"use client";

import Link from "next/link";
import { ExternalLink, Rocket, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import type { ProjectListDeployment } from "@/lib/project-list";
import { motion } from "framer-motion";

export function ProjectCard({ deployment }: { deployment: ProjectListDeployment }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="flex min-h-72 flex-col">
        <CardHeader>
          <div>
            <CardTitle>{deployment.name ?? deployment.repository ?? "Unnamed deployment"}</CardTitle>
            <CardDescription>{deployment.branch ? `Branch: ${deployment.branch}` : "Branch unavailable"}</CardDescription>
          </div>
          <StatusBadge status={deployment.status ?? "Unknown"} />
        </CardHeader>
        <div className="space-y-3 text-sm text-secondary">
          <p className="truncate">{deployment.repository ?? "Repository unavailable"}</p>
          <p>Last deployment {deployment.updatedAt ?? deployment.createdAt ?? "Date unavailable"}</p>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
          <Button asChild variant="secondary" size="sm">
            <Link href={`/projects/${deployment.id}`}><ExternalLink size={15} /> Open</Link>
          </Button>
          <Button variant="secondary" size="sm"><Rocket size={15} /> Deploy</Button>
          <Button variant="ghost" size="sm"><Settings size={15} /> Settings</Button>
          <Button variant="ghost" size="sm" className="text-red-200"><Trash2 size={15} /> Delete</Button>
        </div>
      </Card>
    </motion.div>
  );
}
