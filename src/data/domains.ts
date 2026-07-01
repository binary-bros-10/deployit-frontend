import type { Domain } from "@/types";

export const domains: Domain[] = [
  { id: "dom_1", projectId: "atlas-web", domain: "atlas.dev", verified: true, ssl: true },
  { id: "dom_2", projectId: "atlas-web", domain: "www.atlas.dev", verified: true, ssl: true },
  { id: "dom_3", projectId: "merchant-api", domain: "api.merchant.dev", verified: false, ssl: false },
  { id: "dom_4", projectId: "pulse-dashboard", domain: "pulse.ops", verified: true, ssl: true },
];
