import { cn } from "@/lib/utils";

export function DiscountBadge({ percent }: { percent: number }) {
  return (
    <span className="absolute left-3 top-3 rounded-full bg-trust px-2.5 py-1 text-xs font-bold text-white shadow-sm">
      -{percent}%
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "signal" | "trust";
  className?: string;
}) {
  const tones = {
    neutral: "bg-ink/5 text-ink",
    signal: "bg-signal/10 text-signal-dark",
    trust: "bg-trust-bg text-trust",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
