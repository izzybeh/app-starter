# Project guide for Claude

## Who you're working with

The person building this app has never written code before. They follow a step-by-step guide and drive the work with slash commands (listed at the bottom).

- Explain everything in plain American English. Define any technical word the first time you use it.
- Do one thing at a time. When they need to click something outside Claude Code (GitHub, Supabase, Vercel, Resend), give short numbered steps with the exact button names, then stop and wait for them to say "done".
- Never ask them to paste a password or secret key into the chat. Tell them exactly where to paste it themselves (for example `.env.local`, Vercel settings, or Supabase settings).
- Before anything that is hard to undo (deleting data, changing the live database, merging, force-anything), say in one sentence what will happen and ask for a clear yes.
- Finish every task by telling them the one next thing to do, usually a slash command.
- If they seem stuck or confused, offer `/explain` or `/unstuck`.

## The app

- App name: (filled in by /start-app)
- What it is and who it's for: read `VISION.md`.
- What to build, in order: `ROADMAP.md`.
- How it should look and sound: `theme.json` (the look) and `DESIGN.md` (how screens are built and the tone of voice).
- How it must behave for people: `HEURISTICS.md` (Nielsen Norman Group's 10 usability heuristics, applied to this app).

## Building blocks

The app comes with a usability kit: `src/components/ui`, `src/components/patterns`, `src/hooks` and `src/lib`. It builds Nielsen Norman Group's 10 heuristics into the pieces themselves. Read `docs/USABILITY-KIT.md` before building any screen, and see every piece at `/style-guide`.

- Build every screen from these pieces: `PageHeader` (one main action), `Field` + `Input`/`Select`/`Textarea`, `Button` (with `loading`), `useSaveAction` for saves, `ConfirmDialog` or `notify.undo` for deletes, `EmptyState`, `LoadingList`, `ErrorState`, `DateText`, `friendlyError`.
- Use only theme colors (`bg-primary`, `text-ink`, `text-muted`, `bg-surface`…). The look changes only through `theme.json` and `npm run theme`; never edit `src/styles/theme.css` by hand.
- Lint blocks raw `<button>`, `<input>`, `<select>`, `<textarea>`, fixed colors and `alert()` in screens. Fix the code; don't disable the rule.
- If a screen needs something the kit doesn't have, add it to `src/components/` using theme colors, and show it on `/style-guide`.

## Stack

Next.js (App Router) with TypeScript and Tailwind CSS. Supabase for the database, logins and file storage. Code on GitHub, deployed by Vercel. Email through Resend (added by /go-live).

## Rules

- Build one user story at a time, on its own branch named `feature/<short-name>`.
- Write Playwright tests from a story's "done when" checks before building it.
- Every database change is a SQL migration file in `supabase/migrations/` (named `<timestamp>_<short_name>.sql`), and every table has Row Level Security turned on with policies that let people see only what they should.
- Write migrations so the current live code keeps working after they're applied: add tables and columns; don't rename or drop them in the same step. (Live migrations are applied just before a merge.)
- Tests log in with the test account in `.env.local` (`E2E_EMAIL`, `E2E_PASSWORD`). Tests never send real sign-up emails.
- Never put secrets in code. Never commit `.env` files (only `.env.example`, with no real values).
- Follow `DESIGN.md` and `HEURISTICS.md` on every screen: show loading, empty, success and error states in plain words; never show raw error codes.
- Only merge a pull request when the person runs `/merge-story`.
- Never force-push, rewrite history, or reset away work without first listing exactly what would be lost and getting a yes.

### Databases

- Before `/go-live` there is one Supabase project. Apply migrations to it while building.
- After `/go-live` there are two: a **test** project (used by localhost, tests and Vercel previews) and the **live** project (real users). While building, apply migrations to the test project only. The live project changes only during `/merge-story`, after showing the person what will change, and just before merging.
- The project IDs are recorded below once known.
  - Live project ID: (not set yet)
  - Test project ID: (not set yet)

## Definition of Done

A story is done only when all of these are true. `/ship-story` checks them.

1. Every "done when" check has a Playwright test, and it passes.
2. `npm run check` passes (types, lint, unit tests, build).
3. It works at phone size and the accessibility scan finds no serious problems.
4. Built from the usability kit; loading, empty, success and error states are handled in plain words.
5. Database changes are migration files; every table has Row Level Security; the Supabase security advisor shows no new warnings. (Ignore warnings that can only be fixed on a paid plan; mention them once.)
6. No secrets in the code.
7. It follows `DESIGN.md`, and the usability review finds no problems rated 3 or 4.
8. The story is checked off in `ROADMAP.md`.

## Commands the person uses

- `/whats-next`: where am I, and what do I do now?
- `/start-app`: build the starter app and put it online.
- `/plan-roadmap`: turn the vision into a list of small features.
- `/setup-quality`: turn on the automatic checks (run once).
- `/next-feature`: plan and build the next feature.
- `/ship-story`: check the feature and open a pull request with a preview link.
- `/merge-story`: put a tested feature live.
- `/go-live`: own domain, real email, test database, privacy basics.
- `/explain`: explain anything in plain English.
- `/unstuck`: figure out what's wrong without changing anything.
- `/backup`: save a copy of the app's data to this computer.
