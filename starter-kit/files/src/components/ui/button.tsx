import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Spinner } from "./spinner";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-ui px-5 font-semibold transition-colors " +
  "disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

const variants = {
  /** The one main action on a screen. */
  primary: "bg-primary text-primary-ink hover:opacity-90",
  /** Other actions. */
  secondary: "border border-field-border bg-surface text-ink hover:bg-accent",
  /** Low-emphasis actions like Cancel. */
  ghost: "text-primary hover:bg-accent",
  /** Deleting or anything that can't be undone easily. */
  danger: "bg-danger text-white hover:opacity-90",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  /** Shows a spinner and ignores clicks while something is saving. */
  loading?: boolean;
  /** What the button says while loading, e.g. "Saving…". */
  loadingText?: string;
};

/**
 * The app's button. Heuristics: 1 (shows when it's working), 4 (consistent),
 * 5 (can't be double-clicked while saving).
 */
export function Button({
  variant = "primary",
  loading = false,
  loadingText,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, className)}
      {...props}
    >
      {loading && <Spinner />}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

/** A link that looks like a button, for moving to another page. */
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
