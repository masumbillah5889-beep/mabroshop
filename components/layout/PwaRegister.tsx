"use client";

import { useEffect } from "react";

export default function PwaRegister({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (enabled && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // installability just won't be offered — nothing else depends on this
      });
    }
  }, [enabled]);
  return null;
}
