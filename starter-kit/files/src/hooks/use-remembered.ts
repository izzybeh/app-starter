"use client";

import { useEffect, useState } from "react";

/**
 * Like useState, but remembers the choice on this device for next time
 * (a sort order, a filter, the last category picked).
 * Heuristics: 6 (recognition over recall) and 7 (efficiency for regulars).
 */
export function useRemembered<T>(key: string, initial: T) {
  const storageKey = `remembered:${key}`;
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      // Restoring a saved choice after the first render is intentional here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved !== null) setValue(JSON.parse(saved) as T);
    } catch {
      // Storage can be unavailable (private browsing); the default still works.
    }
  }, [storageKey]);

  const update = (next: T) => {
    setValue(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Ignore: remembering is a convenience, not a requirement.
    }
  };

  return [value, update] as const;
}
