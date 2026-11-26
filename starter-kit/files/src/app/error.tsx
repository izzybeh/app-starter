"use client";

import { ErrorState } from "@/components/patterns/page";
import { Button, ButtonLink } from "@/components/ui/button";

/** Shown when a page breaks unexpectedly, instead of a blank or technical screen. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState
      fullPage
      action={
        <>
          <Button onClick={() => reset()}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Go to the home page
          </ButtonLink>
        </>
      }
    />
  );
}
