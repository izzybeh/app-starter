import { PageHeader, EmptyState } from "@/components/patterns/page";
import { site } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <PageHeader title={`Hello from ${site.name}`} description={site.description} />
      <EmptyState
        title="Your app is live"
        description="This is where your first feature will go. Next, plan your features with /plan-roadmap."
      />
    </>
  );
}
