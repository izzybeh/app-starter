"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";
import { friendlyError } from "@/lib/friendly-error";
import { Button } from "./button";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

/**
 * A pop-up window. It always has a title, can be closed with Escape or the
 * Close button, and keeps keyboard focus inside while open.
 * Heuristics: 3 (an easy way out), 4 (consistent).
 */
export function DialogContent({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
      <RadixDialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-ui bg-surface p-6 shadow-xl focus:outline-none">
        <RadixDialog.Title className="font-heading text-xl font-bold text-ink">{title}</RadixDialog.Title>
        {description ? (
          <RadixDialog.Description className="mt-2 text-muted">{description}</RadixDialog.Description>
        ) : (
          <RadixDialog.Description className="sr-only">{title}</RadixDialog.Description>
        )}
        <div className="mt-5">{children}</div>
        <RadixDialog.Close
          className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-ui text-muted hover:bg-accent"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-2xl leading-none">×</span>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

/**
 * Ask before anything that's hard to undo, like deleting.
 * Heuristics: 3 (Cancel is always there), 5 (prevents accidents),
 * 1 and 9 (shows progress and plain errors).
 *
 *   <ConfirmDialog
 *     trigger={<Button variant="danger">Delete recipe</Button>}
 *     title="Delete this recipe?"
 *     description="This can't be undone."
 *     confirmLabel="Delete recipe"
 *     onConfirm={() => deleteRecipe(id)}
 *   />
 */
export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  destructive = true,
  onConfirm,
}: {
  trigger: ReactNode;
  title: string;
  description?: ReactNode;
  /** Say what will happen, e.g. "Delete recipe", not "OK". */
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => Promise<unknown> | unknown;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirm = async () => {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      await onConfirm();
      setOpen(false);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!pending) {
          setOpen(next);
          setError(null);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent title={title} description={description}>
        {error ? (
          <p role="alert" className="mb-4 font-semibold text-danger">
            {error}
          </p>
        ) : null}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button variant="secondary" disabled={pending}>
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button variant={destructive ? "danger" : "primary"} loading={pending} onClick={confirm}>
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
