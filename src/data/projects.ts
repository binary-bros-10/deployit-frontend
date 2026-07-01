import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "atlas-web",
    name: "Atlas Web",
    framework: "Next.js",
    status: "Live",
    url: "https://atlas.deployit.app",
    productionDomain: "atlas.dev",
    repository: "github.com/karan/atlas-web",
    lastDeployed: "2 minutes ago",
  },
  {
    id: "merchant-api",
    name: "Merchant API",
    framework: "Express",
    status: "Building",
    url: "https://merchant-api.deployit.app",
    productionDomain: "api.merchant.dev",
    repository: "github.com/karan/merchant-api",
    lastDeployed: "18 minutes ago",
  },
  {
    id: "pulse-dashboard",
    name: "Pulse Dashboard",
    framework: "React",
    status: "Live",
    url: "https://pulse.deployit.app",
    productionDomain: "pulse.ops",
    repository: "github.com/karan/pulse-dashboard",
    lastDeployed: "1 hour ago",
  },
  {
    id: "jobs-worker",
    name: "Jobs Worker",
    framework: "Node.js",
    status: "Failed",
    url: "https://jobs.deployit.app",
    productionDomain: "worker.jobs.dev",
    repository: "github.com/karan/jobs-worker",
    lastDeployed: "Yesterday",
  },
];
