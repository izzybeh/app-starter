"use client";

import { useState } from "react";
import { PageHeader, EmptyState, ErrorState, LoadingList, FormActions } from "@/components/patterns/page";
import { Button, ButtonLink } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { HelpTip } from "@/components/ui/help-tip";
import { Checkbox, Input, Select, Textarea } from "@/components/ui/inputs";
import { useRemembered } from "@/hooks/use-remembered";
import { useSaveAction } from "@/hooks/use-save-action";
import { DateText } from "@/components/ui/date-text";
import { formatMoney, pluralize } from "@/lib/format";
import { notify } from "@/lib/notify";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * The living style guide: every building block, in every state, in the
 * current theme. Claude and the usability reviewer use it as the reference.
 */
export default function StyleGuidePage() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [sort, setSort] = useRemembered("style-guide-sort", "newest");
  const save = useSaveAction(async () => wait(900), { success: "Saved." });

  return (
    <>
      <PageHeader
        back={{ href: "/", label: "Home" }}
        title="Style guide"
        description="Every building block of this app, in the current theme. Build new screens from these."
        action={<Button onClick={() => notify.success("This is the one main action.")}>Main action</Button>}
      />

      <section className="mb-10 flex flex-col gap-4" aria-labelledby="sg-buttons">
        <h2 id="sg-buttons" className="text-2xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading loadingText="Saving…">Save</Button>
          <ButtonLink href="/" variant="secondary">Link button</ButtonLink>
        </div>
      </section>

      <section className="mb-10" aria-labelledby="sg-form">
        <h2 id="sg-form" className="mb-4 text-2xl font-bold">Form</h2>
        <Card>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) {
                setNameError("Please enter a name.");
                return;
              }
              setNameError(null);
              void save.run();
            }}
            className="flex flex-col gap-5"
          >
            <Field label="Name" hint="This is how others will see it." error={nameError} required>
              <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
            </Field>
            <Field label="Notes">
              <Textarea placeholder="Anything else to remember?" />
            </Field>
            <Field label="Sort by" hint="Your choice is remembered on this device.">
              <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest first</option>
                <option value="name">Name, A to Z</option>
              </Select>
            </Field>
            <Checkbox label="Email me when something changes" />
            <HelpTip>Help text sits right next to the thing it explains.</HelpTip>
            <FormActions
              submit={
                <Button type="submit" loading={save.pending} loadingText="Saving…">
                  Save
                </Button>
              }
              cancelHref="/"
            />
          </form>
        </Card>
      </section>

      <section className="mb-10 flex flex-col gap-4" aria-labelledby="sg-feedback">
        <h2 id="sg-feedback" className="text-2xl font-bold">Feedback</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => notify.success("Recipe saved.")}>Show success</Button>
          <Button variant="secondary" onClick={() => notify.error(new Error("Failed to fetch"))}>Show error</Button>
          <Button variant="secondary" onClick={() => notify.undo("Recipe deleted.", () => notify.info("Restored."))}>
            Show undo
          </Button>
          <ConfirmDialog
            trigger={<Button variant="danger">Delete something</Button>}
            title="Delete this recipe?"
            description="This can't be undone."
            confirmLabel="Delete recipe"
            onConfirm={() => wait(700)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Draft</Badge>
          <Badge tone="success">Published</Badge>
          <Badge tone="warning">Needs review</Badge>
          <Badge tone="danger">Overdue</Badge>
        </div>
        <p className="text-muted">
          {pluralize(3, "recipe")} · updated <DateText value="2026-03-05T15:15:00" /> · {formatMoney(12.5)}
        </p>
      </section>

      <section className="mb-10 flex flex-col gap-4" aria-labelledby="sg-states">
        <h2 id="sg-states" className="text-2xl font-bold">Page states</h2>
        <EmptyState
          title="No recipes yet"
          description="Recipes you add will show up here."
          action={<Button>Add your first recipe</Button>}
        />
        <LoadingList rows={2} />
        <ErrorState action={<Button variant="secondary">Try again</Button>} />
      </section>
    </>
  );
}
