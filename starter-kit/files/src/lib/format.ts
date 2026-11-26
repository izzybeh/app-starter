/**
 * Show dates, numbers and money the way people read them, not the way
 * computers store them. Heuristic 2 (match the real world).
 */
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/**
 * "Mar 5, 2026" or, when you pass `now`, "Today at 3:15 PM" / "Yesterday at 9:02 AM".
 * On screen, use <DateText> from @/components/ui/date-text: it fills in `now`
 * safely in the browser.
 */
export function formatDate(
  value: Date | string | number,
  options: { withTime?: boolean; now?: Date } = {},
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const time = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const { now } = options;
  if (now) {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (sameDay(date, now)) return `Today at ${time}`;
    if (sameDay(date, yesterday)) return `Yesterday at ${time}`;
  }
  const day = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: !now || date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
  return options.withTime ? `${day} at ${time}` : day;
}

/** "1,234" */
export function formatNumber(value: number, maximumFractionDigits = 1): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits }).format(value);
}

/** "$12.50" */
export function formatMoney(value: number, currency = "USD"): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
}

/** "1 recipe", "3 recipes", "0 recipes". Pass the plural if it isn't just +s. */
export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${formatNumber(count, 0)} ${count === 1 ? singular : plural}`;
}
