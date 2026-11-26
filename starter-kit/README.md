# Usability kit

Building blocks that make good usability the default. `/start-app` installs this kit into the app and copies this file to `docs/USABILITY-KIT.md`. See every piece live, in the current theme, at `/style-guide`.

**Rule:** build every screen from these pieces. If something new is needed, add it to `src/components/` using only theme colors, and show it on `/style-guide`.

## The 10 heuristics, built in

| # | Nielsen Norman Group heuristic | Built into | Rule for every screen |
| --- | --- | --- | --- |
| 1 | Visibility of system status | `Button loading`, `useSaveAction`, `notify.success`, `LoadingList`, `Skeleton`, `AppShell` (current page marked) | Every save, send or delete shows it's working, then confirms. Lists show placeholders while loading. |
| 2 | Match between the system and the real world | `friendlyError`, `formatDate` / `DateText`, `formatMoney`, `pluralize` | Use the words in VISION.md, never technical terms or codes. Dates read like "Yesterday at 3:15 PM". |
| 3 | User control and freedom | `PageHeader back`, `FormActions` (Cancel), `Dialog` (Escape and Close), `ConfirmDialog`, `notify.undo` | There's always a way back or out. Deleting offers Undo or asks first. |
| 4 | Consistency and standards | Theme (`theme.json`), `Button` variants, `AppShell`, `PageHeader`, lint rules | Same layout, buttons and words everywhere. Only theme colors. Lint blocks raw `<button>`, `<input>` and fixed colors in screens. |
| 5 | Error prevention | `Button loading` (no double clicks), `useSaveAction`, `ConfirmDialog`, `Field required`, `Select` | Prevent mistakes: confirm risky actions, check forms before saving, offer choices instead of typing where possible. |
| 6 | Recognition rather than recall | `Field` (labels always visible), `Select`, `AppShell` nav with current page, `useRemembered` | Never use placeholder text as the only label. Show options; remember recent choices. |
| 7 | Flexibility and efficiency of use | Real `<form>` + `FormActions` (Enter submits), `useRemembered`, sensible defaults | Forms submit with Enter. Remember choices regular users make often. Keep common tasks to as few steps as possible. |
| 8 | Aesthetic and minimalist design | `PageHeader` (one main `action`), `AppShell` width, theme spacing, `Card` | One main action per screen. Only what's needed; move extras to a secondary button or another page. |
| 9 | Help users recognize, diagnose, and recover from errors | `Field error`, `friendlyError`, `notify.error`, `ErrorState`, `app/error.tsx`, `app/not-found.tsx` | Errors appear next to the field, in plain words, saying how to fix them. Pages never go blank. |
| 10 | Help and documentation | `EmptyState`, `Field hint`, `HelpTip` | Empty screens say what to do first. Tricky fields get a one-line hint. |

## Pieces

- `@/components/ui/button`: `Button` (`variant`: primary, secondary, ghost, danger; `loading`, `loadingText`), `ButtonLink`.
- `@/components/ui/field`: `Field` (`label`, `hint`, `error`, `required`) wrapping one control.
- `@/components/ui/inputs`: `Input`, `Textarea`, `Select`, `Checkbox`.
- `@/components/ui/dialog`: `Dialog`, `DialogTrigger`, `DialogContent` (`title`, `description`), `DialogClose`, `ConfirmDialog`.
- `@/components/ui/card`: `Card`, `Skeleton`, `Badge` (always with words, never color alone).
- `@/components/ui/help-tip`: `HelpTip`.
- `@/components/ui/date-text`: `DateText`.
- `@/components/patterns/page`: `PageHeader`, `EmptyState`, `ErrorState`, `LoadingList`, `FormActions`.
- `@/components/patterns/app-shell`: `AppShell` (already in the layout). Menu items live in `src/config/site.ts`.
- `@/hooks/use-save-action`: `useSaveAction(fn, { success })` returns `{ run, pending }`.
- `@/hooks/use-remembered`: `useRemembered(key, initial)`.
- `@/lib/notify`: `notify.success`, `notify.error`, `notify.undo`, `notify.info`.
- `@/lib/friendly-error`: `friendlyError(err)`.
- `@/lib/format`: `formatDate`, `formatNumber`, `formatMoney`, `pluralize`.

## Theme colors (Tailwind classes)

`bg-background`, `bg-surface`, `text-ink`, `text-muted`, `border-border` (dividers), `border-field-border` (form fields), `bg-primary` / `text-primary-ink`, `text-primary` (links), `bg-accent`, `text-success`, `text-warning`, `text-danger`, `rounded-ui`, `font-heading`, `font-body`.

## Changing the look

Edit `theme.json`, then run `npm run theme`:

```json
{
  "base": "warm",
  "name": "Warm",
  "colors": { "primary": "#a64a22" },
  "fonts": { "heading": "Fraunces", "body": "Source Sans 3" },
  "radius": "12px",
  "textSize": "normal"
}
```

- `base`: one of `calm`, `warm`, `fresh`, `bold`, `playful`, `professional` (see `scripts/theme-presets.json`). Anything left out comes from the base.
- `colors`: any of `background`, `surface`, `ink`, `muted`, `border`, `primary`, `accent`, `success`, `warning`, `danger`, as `#rrggbb`. Colors that would be hard to read are darkened automatically.
- `fonts`: `Inter`, `Source Sans 3`, `DM Sans`, `Space Grotesk`, `Nunito`, `IBM Plex Sans`, `Fraunces`, `Lora`, `Work Sans`, `Atkinson Hyperlegible`, `Poppins`, `Playfair Display`.
- `textSize`: `normal` or `large` (larger text everywhere, good for older eyes).

## Notes for this version of Next.js

- Pages are pre-built ahead of time, so don't read the current time (`new Date()`) while rendering. Use `DateText`, which fills in "Today" in the browser.
- Read `AGENTS.md` and `node_modules/next/dist/docs/` before using Next.js features you aren't sure about.
