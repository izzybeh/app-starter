"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/format";

/**
 * Shows a date the way people say it: "Today at 3:15 PM", "Yesterday", or
 * "Mar 5, 2026". Heuristic 2 (match the real world).
 */
export function DateText({ value, withTime = false }: { value: Date | string | number; withTime?: boolean }) {
  const [now, setNow] = useState<Date | undefined>(undefined);
  // "Today" depends on the viewer's clock, so it's filled in after the page loads.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setNow(new Date()), []);
  const date = value instanceof Date ? value : new Date(value);
  return (
    <time dateTime={Number.isNaN(date.getTime()) ? undefined : date.toISOString()}>
      {formatDate(value, { withTime, now })}
    </time>
  );
}
