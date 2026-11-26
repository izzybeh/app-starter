import type { ReactNode } from "react";

/**
 * A small "?" that opens a short explanation right where it's needed.
 * Works without JavaScript and with a keyboard. Heuristic 10.
 */
export function HelpTip({ label = "What's this?", children }: { label?: string; children: ReactNode }) {
  return (
    <details className="group inline-block align-middle text-sm">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-semibold text-primary [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="flex size-5 items-center justify-center rounded-full border border-current text-xs"
        >
          ?
        </span>
        {label}
      </summary>
      <div className="mt-1 max-w-prose rounded-ui bg-accent p-3 text-ink">{children}</div>
    </details>
  );
}
