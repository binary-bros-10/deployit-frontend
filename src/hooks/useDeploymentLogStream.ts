"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  getDeploymentLogFingerprint,
  normalizeDeploymentLog,
  type DeploymentLog,
} from "@/lib/deployment-logs";

export type LogStreamStatus = "connecting" | "connected" | "reconnecting" | "disconnected";

const MAX_RECONNECT_ATTEMPTS = 5;
const INITIAL_RECONNECT_DELAY_MS = 1_000;
const MAX_RECONNECT_DELAY_MS = 30_000;

function getStreamUrl(deploymentId: string): string {
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5001").replace(/\/$/, "");
  return `${backendUrl}/deployments/${encodeURIComponent(deploymentId)}/logs/stream`;
}

function parseStreamPayload(payload: string): unknown {
  try {
    return JSON.parse(payload);
  } catch {
    return payload;
  }
}

export function useDeploymentLogStream(deploymentId: string, initialLogs: DeploymentLog[], enabled: boolean) {
  const [streamLogs, setStreamLogs] = useState<DeploymentLog[]>([]);
  const [status, setStatus] = useState<LogStreamStatus>("disconnected");
  const streamLogIndex = useRef(0);

  useEffect(() => {
    setStreamLogs([]);
    streamLogIndex.current = 0;
  }, [deploymentId]);

  useEffect(() => {
    if (!enabled || !deploymentId) {
      setStatus("disconnected");
      return;
    }

    if (typeof EventSource === "undefined") {
      setStatus("disconnected");
      return;
    }

    let active = true;
    let source: EventSource | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;

    const closeSource = () => {
      source?.close();
      source = null;
    };

    const connect = () => {
      if (!active) return;

      setStatus(attempts === 0 ? "connecting" : "reconnecting");
      closeSource();
      const eventSource = new EventSource(getStreamUrl(deploymentId));
      source = eventSource;

      eventSource.onopen = () => {
        if (source !== eventSource) return;
        attempts = 0;
        setStatus("connected");
      };

      eventSource.onmessage = (event) => {
        if (source !== eventSource) return;
        const log = normalizeDeploymentLog(parseStreamPayload(event.data), `stream-log-${streamLogIndex.current++}`);
        if (!log) return;

        setStreamLogs((currentLogs) => (
          currentLogs.some((currentLog) => getDeploymentLogFingerprint(currentLog) === getDeploymentLogFingerprint(log))
            ? currentLogs
            : [...currentLogs, log]
        ));
      };

      eventSource.onerror = () => {
        if (source !== eventSource) return;

        eventSource.close();
        source = null;
        if (!active) return;

        if (attempts >= MAX_RECONNECT_ATTEMPTS) {
          setStatus("disconnected");
          return;
        }

        const delay = Math.min(INITIAL_RECONNECT_DELAY_MS * 2 ** attempts, MAX_RECONNECT_DELAY_MS);
        attempts += 1;
        setStatus("reconnecting");
        retryTimer = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      active = false;
      if (retryTimer) clearTimeout(retryTimer);
      closeSource();
    };
  }, [deploymentId, enabled]);

  const logs = useMemo(() => {
    const fingerprints = new Set<string>();
    return [...initialLogs, ...streamLogs].filter((log) => {
      const fingerprint = getDeploymentLogFingerprint(log);
      if (fingerprints.has(fingerprint)) return false;
      fingerprints.add(fingerprint);
      return true;
    });
  }, [initialLogs, streamLogs]);

  return { logs, status };
}
