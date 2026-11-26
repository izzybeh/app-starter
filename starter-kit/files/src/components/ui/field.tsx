"use client";

import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  required?: boolean;
};

type FieldProps = {
  /** Always visible. Never rely on placeholder text instead. */
  label: string;
  /** A short tip under the label, e.g. "We'll never share your email." */
  hint?: ReactNode;
  /** A plain-English problem with this field, shown next to it. */
  error?: string | null;
  required?: boolean;
  /** One control: <Input />, <Textarea /> or <Select />. */
  children: ReactElement<ControlProps>;
};

/**
 * Wraps one form control with a visible label, an optional hint and an
 * error message, all connected for screen readers.
 * Heuristics: 6 (labels stay visible), 9 (errors next to the field),
 * 10 (help right where it's needed).
 */
export function Field({ label, hint, error, required, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })
    : children;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-muted font-normal"> (required)</span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {control}
      {error ? (
        <p id={errorId} className="text-sm font-semibold text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
