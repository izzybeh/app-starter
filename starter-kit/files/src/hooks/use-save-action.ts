"use client";

import { useCallback, useRef, useState } from "react";
import { notify } from "@/lib/notify";

type Options<T> = {
  /** Message after it works, e.g. "Recipe saved." Set to false for none. */
  success?: string | false;
  /** Runs after it works, e.g. to close a dialog or go to another page. */
  onSuccess?: (result: T) => void;
  /** Used when the error can't be explained more specifically. */
  errorFallback?: string;
};

/**
 * Wrap any save, send or delete. It shows a loading state, ignores extra
 * clicks while working, confirms success, and explains errors in plain words.
 * Heuristics: 1 (status), 5 (no double saves), 9 (plain errors).
 *
 *   const save = useSaveAction(saveRecipe, { success: "Recipe saved." });
 *   <Button loading={save.pending} onClick={() => save.run(recipe)}>Save</Button>
 */
export function useSaveAction<Args extends unknown[], T>(
  action: (...args: Args) => Promise<T>,
  { success = "Saved.", onSuccess, errorFallback }: Options<T> = {},
) {
  const [pending, setPending] = useState(false);
  const busy = useRef(false);

  const run = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      if (busy.current) return undefined;
      busy.current = true;
      setPending(true);
      try {
        const result = await action(...args);
        if (success) notify.success(success);
        onSuccess?.(result);
        return result;
      } catch (err) {
        notify.error(err, errorFallback);
        return undefined;
      } finally {
        busy.current = false;
        setPending(false);
      }
    },
    [action, success, onSuccess, errorFallback],
  );

  return { run, pending };
}
