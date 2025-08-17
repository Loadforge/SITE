"use client";

import { useWebSocketStore } from '@/contexts/socket/websocketStore';
import { useEffect, useState } from 'react';

export function TestTimer() {
    const { test, duration } = useWebSocketStore();
    const [seconds, setSeconds] = useState(duration);

    if(!test)return null;

    useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (test) {
      interval = setInterval(() => {
        setSeconds((prev) => {
            if (prev > 0) return prev - 1;
            return 0;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [test]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (!test) return null;

  return (
    <div className="text-md text-muted-foreground bg-accent-foreground p-2 rounded-md">
      Time: {formatTime(seconds)}
    </div>
  );

}