import Link from "next/link";
import type { ReactNode } from "react";
import { Card, Skeleton } from "@/components/ui/card";

/**
 * The top of every page: a back link when it helps, one clear title, a
 * sentence of explanation, and at most ONE main action.
 * Heuristics: 3 (a way back), 4 (consistent), 8 (one main action).
 */
export function PageHeader({
  title,
  description,
  action,
  back,
}: {
  title: string;
  description?: ReactNode;
  /** A single main action for this page, usually one <Button> or <ButtonLink>. */
  action?: ReactNode;
  /** Where "Back" goes, e.g. { href: "/recipes", label: "All recipes" }. */
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-8">
      {back ? (
        <Link
          href={back.href}
          className="mb-3 inline-flex min-h-11 items-center gap-1 font-semibold text-primary hover:underline"
        >
          <span aria-hidden="true">←</span> {back.label}
        </Link>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-3xl font-bold text-ink">{title}</h1>
          {description ? <p className="mt-2 max-w-prose text-lg text-muted">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

/**
 * What to show when there's nothing here yet: what this place is for and
 * the first thing to do. Heuristic 10 (help where it's needed).
 */
export function EmptyState({ title, description, action }: { title: string; description?: ReactNode; action?: ReactNode }) {
  return (
    <Card className="flex flex-col items-center gap-3 py-12 text-center">
      <h2 className="font-heading text-xl font-bold text-ink">{title}</h2>
      {description ? <p className="max-w-prose text-muted">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </Card>
  );
}

/**
 * When something fails: say what happened in plain words and offer a way
 * forward. Heuristics: 9 (recover from errors), 3 (a way out).
 */
export function ErrorState({
  title = "Something went wrong",
  description = "This didn't load. Please try again. If it keeps happening, come back in a few minutes.",
  action,
  fullPage = false,
}: {
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  /** True when this is the whole page (error and not-found pages), so the title is the page's main heading. */
  fullPage?: boolean;
}) {
  const Heading = fullPage ? "h1" : "h2";
  return (
    <Card role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
      <Heading className="font-heading text-xl font-bold text-ink">{title}</Heading>
      <p className="max-w-prose text-muted">{description}</p>
      {action ? <div className="mt-2 flex flex-wrap justify-center gap-3">{action}</div> : null}
    </Card>
  );
}

/** Placeholder rows while a list loads. Heuristic 1. */
export function LoadingList({ rows = 3, label = "Loading…" }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-3">
      <span className="sr-only">{label}</span>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );
}

/**
 * The buttons at the end of a form: the main action, plus Cancel.
 * Pressing Enter in the form submits it (heuristic 7); Cancel is always
 * there (heuristic 3).
 */
export function FormActions({
  submit,
  cancelHref,
  onCancel,
  cancelLabel = "Cancel",
}: {
  /** Usually <Button type="submit" loading={…}>Save recipe</Button>. */
  submit: ReactNode;
  cancelHref?: string;
  onCancel?: () => void;
  cancelLabel?: string;
}) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
      {submit}
      {cancelHref ? (
        <Link href={cancelHref} className="flex min-h-11 items-center justify-center px-4 font-semibold text-primary hover:underline">
          {cancelLabel}
        </Link>
      ) : onCancel ? (
        <button type="button" onClick={onCancel} className="flex min-h-11 items-center justify-center px-4 font-semibold text-primary hover:underline">
          {cancelLabel}
        </button>
      ) : null}
    </div>
  );
}
