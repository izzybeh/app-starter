/**
 * Turn any error into a short, plain-English message a person can act on.
 * Never show raw error codes or technical messages on screen; pass every
 * caught error through this first.
 * Heuristics: 2 (real-world words) and 9 (recognize, diagnose, recover).
 */
const RULES: Array<[RegExp, string | ((m: RegExpMatchArray) => string)]> = [
  [/failed to fetch|network ?error|fetch failed|load failed|ECONNREFUSED|ENOTFOUND/i, "We couldn't reach the server. Check your internet connection and try again."],
  [/invalid login credentials|invalid (email|password)/i, "That email and password don't match. Check them and try again."],
  [/email not confirmed/i, "Please confirm your email first. Look for our message in your inbox (and spam folder)."],
  [/user already registered|already been registered|email.*already.*(exists|use)/i, "An account with this email already exists. Try logging in instead."],
  [/password should be at least (\d+)/i, (m) => `Your password needs to be at least ${m[1]} characters long.`],
  [/(weak|pwned|leaked).*password|password.*(weak|known)/i, "That password is too easy to guess. Please choose a different one."],
  [/unable to validate email|invalid email|email address .* is invalid/i, "That email address doesn't look right. Check it and try again."],
  [/rate limit|too many requests|\b429\b/i, "Too many tries in a short time. Please wait a minute and try again."],
  [/jwt expired|session.*(expired|missing)|refresh token/i, "Your session ended. Please log in again."],
  [/row-level security|permission denied|\b42501\b|not authorized|unauthorized|\b401\b|\b403\b/i, "You don't have permission to do that. Try logging in again."],
  [/duplicate key|unique constraint|\b23505\b/i, "That already exists. Try a different name."],
  [/foreign key|\b23503\b/i, "This is still connected to something else, so it can't be changed yet."],
  [/not-null|null value in column|\b23502\b/i, "Some required information is missing. Please fill in every required field."],
  [/PGRST116|no rows|not found|\b404\b/i, "We couldn't find that. It may have been moved or deleted."],
  [/payload too large|file size|too large|\b413\b/i, "That file is too large. Please choose a smaller one."],
  [/timeout|timed out/i, "That took too long. Please try again."],
];

export const DEFAULT_ERROR_MESSAGE = "Something went wrong on our end. Please try again.";

function textOf(err: unknown): string {
  if (!err) return "";
  if (typeof err === "string") return err;
  if (err instanceof Error) return `${err.name} ${err.message}`;
  if (typeof err === "object") {
    const e = err as Record<string, unknown>;
    return [e.code, e.status, e.message, e.error_description, e.error, e.details].filter(Boolean).join(" ");
  }
  return String(err);
}

export function friendlyError(err: unknown, fallback: string = DEFAULT_ERROR_MESSAGE): string {
  const text = textOf(err);
  for (const [pattern, message] of RULES) {
    const m = text.match(pattern);
    if (m) return typeof message === "function" ? message(m) : message;
  }
  return fallback;
}
