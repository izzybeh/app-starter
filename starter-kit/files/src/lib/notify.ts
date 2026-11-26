"use client";

import { toast } from "sonner";
import { friendlyError } from "./friendly-error";

/**
 * Short messages that confirm what happened. Use these instead of alerts.
 * Heuristics: 1 (system status), 3 (undo), 9 (plain errors).
 */
export const notify = {
  /** "Recipe saved." Confirm every save, delete and send. */
  success(message: string) {
    toast.success(message);
  },
  /** Shows a plain-English version of any error. */
  error(err: unknown, fallback?: string) {
    toast.error(friendlyError(err, fallback));
  },
  /** "Recipe deleted." with an Undo button for a few seconds. */
  undo(message: string, onUndo: () => void | Promise<void>, seconds = 6) {
    toast(message, {
      duration: seconds * 1000,
      action: { label: "Undo", onClick: () => void onUndo() },
    });
  },
  /** Neutral information. */
  info(message: string) {
    toast(message);
  },
};
