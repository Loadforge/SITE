"use client";

import { useEffect, useState } from "react";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";

export function TestTimer() {
  const { test, duration } = useWebSocketStore();
  const [seconds, setSeconds] = useState(duration);
  useEffect(() => {
    setSeconds(duration);

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [test, duration]);

  if (!test) return null;

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  if (!test) return null;

  return (
    <div className="text-md text-muted-foreground bg-accent-foreground p-2 rounded-md">
      Time: {formatTime(seconds)}
    </div>
  );
}
