"use client";

import { useEffect, useState } from "react";

import { useWebSocketStore } from "@/contexts/socket/websocketStore";

export function TestTimer() {
  const { test, duration } = useWebSocketStore();
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (!test || typeof duration !== "number" || duration <= 0) {
      setSeconds(0);
      console.log(test,  typeof duration, duration);
      console.log("Timer stopped or invalid duration");
      return;
    }

    setSeconds(duration); 

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
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

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="text-md text-text bg-background p-2 rounded-md">
      Time: {formatTime(seconds)}
    </div>
  );
}
