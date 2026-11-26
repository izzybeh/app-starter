"use client";

import { Toaster as SonnerToaster } from "sonner";

/** Where success and error messages appear. Already placed in the layout. */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      closeButton
      toastOptions={{
        style: {
          background: "var(--surface)",
          color: "var(--ink)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
        },
      }}
    />
  );
}
