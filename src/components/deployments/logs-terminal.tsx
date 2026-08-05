"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import type { DeploymentLog } from "@/lib/deployment-logs";
import type { LogStreamStatus } from "@/hooks/useDeploymentLogStream";

type LogsTerminalProps = {
  logs: DeploymentLog[];
  isLoading?: boolean;
  isError?: boolean;
  streamStatus?: LogStreamStatus;
};

export function LogsTerminal({ logs, isLoading = false, isError = false, streamStatus = "disconnected" }: LogsTerminalProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !isError && logs.length > 0) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isError, isLoading, logs]);

  return (
    <Card className="h-[520px] overflow-auto bg-[#111015] p-0 font-mono deployit-scrollbar">
      <div className="sticky top-0 flex items-center gap-2 border-b bg-[#151219] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-primary" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-auto text-xs text-secondary">{streamStatus === "connected" ? "Connected" : streamStatus === "connecting" ? "Connecting..." : streamStatus === "reconnecting" ? "Reconnecting..." : "Disconnected"}</span>
      </div>
      <div className="space-y-3 p-5 text-sm">
        {isLoading && <div className="flex items-center gap-2 text-secondary"><LoadingSpinner /> Loading logs...</div>}
        {isLoading && Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-4 w-full" />)}
        {!isLoading && isError && <p role="alert" className="text-secondary"><span className="mr-3 text-primary">$</span>Unable to load deployment logs.</p>}
        {!isLoading && !isError && logs.length === 0 && <p className="text-secondary"><span className="mr-3 text-primary">$</span>No logs available.</p>}
        {!isLoading && !isError && logs.map((log) => (
          <p key={log.id} className="text-secondary">
            <span className="mr-3 text-primary">$</span>
            {log.message ?? "Log message unavailable"}
          </p>
        ))}
        <div ref={endRef} />
      </div>
    </Card>
  );
}
