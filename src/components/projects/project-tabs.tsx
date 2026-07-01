import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  ["Overview", ""],
  ["Deployments", "/deployments"],
  ["Environment Variables", "/variables"],
  ["Domains", "/domains"],
  ["Settings", "#settings"],
];

export function ProjectTabs({ projectId, active }: { projectId: string; active: string }) {
  return (
    <Tabs value={active} className="overflow-x-auto">
      <TabsList>
        {tabs.map(([label, suffix]) => (
          <TabsTrigger key={label} value={label} asChild>
            <Link href={suffix === "#settings" ? "/settings" : `/projects/${projectId}${suffix}`}>{label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
