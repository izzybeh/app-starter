import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-ui border border-field-border bg-surface px-3.5 py-2.5 text-base text-ink " +
  "placeholder:text-muted aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/25 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

/** Text box. Wrap it in <Field label="…">. */
export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "min-h-11", className)} {...props} />;
}

/** Multi-line text box. Wrap it in <Field label="…">. */
export function Textarea({ className, rows = 4, ...props }: ComponentProps<"textarea">) {
  return <textarea rows={rows} className={cn(control, className)} {...props} />;
}

/** Pick from a list, so people choose instead of typing (heuristic 6). Wrap it in <Field label="…">. */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(control, "min-h-11 appearance-auto", className)} {...props}>
      {children}
    </select>
  );
}

/** A checkbox with its label beside it. */
export function Checkbox({ label, className, ...props }: ComponentProps<"input"> & { label: string }) {
  return (
    <label className={cn("flex min-h-11 cursor-pointer items-center gap-3 text-ink", className)}>
      <input type="checkbox" className="size-5 accent-primary" {...props} />
      <span>{label}</span>
    </label>
  );
}
