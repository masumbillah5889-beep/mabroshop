"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Product cards want a subtle tilt; hero art can go bigger. */
  strength?: number;
};

/**
 * Wraps content in a card that tilts toward the cursor in 3D and shows a soft
 * moving shine, the way glass or brushed metal catches light. Mouse-move only —
 * this is motion that answers the user's own action, not an ambient animation.
 * Touch devices get a fixed, gentle resting tilt instead of a drag-follow effect.
 */
export default function TiltCard({ children, className, strength = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * strength * 2;
    const rx = (0.5 - py) * strength * 2;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("tilt-card relative", className)}
    >
      {children}
      <div className="tilt-shine absolute inset-0 rounded-[inherit]" />
    </div>
  );
}
