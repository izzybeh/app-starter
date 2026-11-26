import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** A panel that groups related things, like one item in a list. */
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-ui border border-border bg-surface p-5 shadow-sm", className)}
      {...props}
    />
  );
}

/** Placeholder shapes shown while content loads (heuristic 1). */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-ui bg-border", className)} />;
}

/** A small label, e.g. a status. Pair the color with words, never color alone. */
export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: "neutral" | "success" | "warning" | "danger" }) {
  const tones = {
    neutral: "bg-accent text-ink",
    success: "bg-accent text-success",
    warning: "bg-accent text-warning",
    danger: "bg-accent text-danger",
  };
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-semibold", tones[tone], className)}
      {...props}
    />
  );
}
