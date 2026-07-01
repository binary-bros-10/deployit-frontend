"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const logs = [
  "Cloning repository...",
  "Installing dependencies...",
  "Building project...",
  "Starting container...",
  "Deployment successful.",
];

export function LogsTerminal() {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Card className="h-[520px] overflow-auto bg-[#111015] p-0 font-mono deployit-scrollbar">
      <div className="sticky top-0 flex items-center gap-2 border-b bg-[#151219] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
      </div>
      <div className="space-y-3 p-5 text-sm">
        {logs.map((line, index) => (
          <p key={line} className="text-secondary">
            <span className="mr-3 text-primary">$</span>
            {line}
            {index === logs.length - 1 && <span className="ml-2 text-emerald-300">done</span>}
          </p>
        ))}
        <div ref={endRef} />
      </div>
    </Card>
  );
}
