import { ErrorState } from "@/components/patterns/page";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <ErrorState
      fullPage
      title="We couldn't find that page"
      description="It may have moved, or the link might have a typo."
      action={<ButtonLink href="/">Go to the home page</ButtonLink>}
    />
  );
}
