import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  primary: "bg-signal text-white hover:bg-signal-dark",
  secondary: "bg-ink text-white hover:bg-ink-light",
  ghost: "bg-transparent text-ink border border-line hover:border-ink",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
}: BaseProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
