---
name: go-live
description: Get a beginner's app ready for real users - separate test database, own domain, real email through Resend, privacy basics, and error alerts. Resumable; run again to continue. Use when the person types /go-live.
disable-model-invocation: true
---

Prepare the app for real people. Work in phases. **Check what's already done and start at the first unfinished phase**; show a short checklist with ✓ for finished phases first. Many steps happen in other websites: give short numbered steps with exact button names, then wait for "done". After each phase, say in one sentence what they now have and ask whether to continue or stop for today (`/go-live` picks up where it left off).

Phase A is shipped on its own branch, `feature/test-database`, right away, so the project is never left half-switched between databases. Later code and file changes go on `feature/go-live`, shipped at the end. The person runs `/ship-story` and `/merge-story` for each, like any feature.

Vercel's free Hobby plan is for personal, non-commercial projects. If the app will make money, mention that Vercel Pro is needed.

## Phase A: A separate test database

Done if CLAUDE.md on `main` (`git fetch` then `git show origin/main:CLAUDE.md`) has a "Test project ID" that isn't "(not set yet)". If it's set only on the `feature/test-database` branch, that pull request still needs `/ship-story` and `/merge-story`: tell them, and stop until it's merged.

1. Create the branch `feature/test-database`. Explain: from now on, building and testing use a copy of the database, so mistakes never touch real people's data. The free Supabase plan allows two projects. Free projects pause after about a week with no activity; if the test project pauses, open it in Supabase and click **Restore**.
2. Have them create a new Supabase project named `<app>-test` (**New project**, generate and save a password). Wait for "done".
3. The Supabase connector may be limited to the first project. Ask them to reconnect it with access to both: click **+** next to the prompt box → **Connectors** → manage Supabase, or re-add it without a project limit. Wait for "done", then confirm you can see both projects.
4. Apply every migration in `supabase/migrations/` to the test project, in order.
5. Set up the test project's login settings. Steps: in the **test** project, **Authentication → URL Configuration**: Site URL `http://localhost:3000`; Redirect URLs `http://localhost:3000/**` plus the Vercel preview wildcard used in the live project. Then create the automated-test account there too (**Authentication → Users → Add user → Create new user**, Auto Confirm User on) and have them update `E2E_EMAIL` and `E2E_PASSWORD` in `.env.local` if they used different values.
6. Point local development at the test project: update `.env.local` with its URL and publishable key.
7. Point Vercel **Preview** and GitHub Actions at the test project: update the Vercel Preview environment variables (Vercel connector, or step-by-step in **Settings → Environment Variables**) and the GitHub Actions secrets (`gh secret set -f .env.local`). Production stays on the live project.
8. Record both project IDs in CLAUDE.md under "Databases".
9. Commit, push, and tell them to run `/ship-story` and then `/merge-story` now, before continuing. When they come back to `/go-live`, Phase A counts as done once CLAUDE.md on `main` has the test project ID.

## Phase B: Connect the domain

1. Ask which domain they bought. If they haven't bought one, tell them to buy it at https://vercel.com/domains and come back.
2. Steps: in their Vercel project, open **Settings → Domains**, click **Add Domain**, type the domain, and accept Vercel's suggestion to add the `www` version too. Wait for "done".
3. Note which address Vercel shows as the main one (often the `www` version). Use exactly that address from now on.
4. Check that it opens with `https://`.

## Phase C: Update login links

Steps for the **live** Supabase project: **Authentication → URL Configuration**. Set **Site URL** to the main address, and add both the `www` and non-`www` versions (each ending in `/**`) to **Redirect URLs**. Wait for "done". Search the code for leftover `.vercel.app` addresses and fix them.

## Phase D: Real email with Resend

Explain: Supabase's built-in email only reaches members of their Supabase team, so real people wouldn't get sign-up or password emails.

1. Sign up at https://resend.com (free).
2. Open **Domains**, click **Add domain**, and type a subdomain of theirs for sending, as Resend recommends (for example `mail.<domain>`), then click **Auto Configure** and allow access to their Vercel DNS. If Auto Configure isn't offered or fails, look up Resend's current Vercel DNS guide and walk them through adding each record exactly as Resend's **Records** tab shows it (in Vercel, the Name field gets only the part before the domain, such as `send`).
3. Wait until Resend shows the domain as **Verified** (often within 15 minutes).
4. In Resend, open **Settings → Integrations**, click **Connect to Supabase**, choose the **live** project and the domain, and set the sender name to the app's name.
5. Tell them: Supabase limits login emails per hour by default. That's fine for friends and family; before any big announcement, raise it in Supabase under **Authentication → Rate Limits**.

## Phase E: Emails that sound like them

Write friendly versions of the Supabase email templates (confirm sign-up, magic link, reset password, change email) that follow DESIGN.md and HEURISTICS.md: plain words, one clear button, and what to do if they didn't ask for this. Give them each one with exactly where to paste it in the live project (**Authentication → Emails**), one at a time.

## Phase F: The basics real people expect

Create the branch `feature/go-live` (from an up-to-date `main`) if it doesn't exist, and add:

- A plain-English privacy policy and terms page, based on what the app actually stores (read the migrations). Mark anything a lawyer should review.
- A way for people to delete their account and their data. Do it without any secret admin key: a migration that adds a `delete_my_account()` database function (`security definer`, deleting from `auth.users` where `id = auth.uid()`), with the app's tables linked to users using `on delete cascade`. Test it with the test account in the test project.
- A support contact (ask them which email address to show).

Write tests for these like any feature.

## Phase G: Get told when something breaks

Help them add free error alerts. Suggest Sentry's free plan: they sign up at https://sentry.io, then you set it up for Next.js using Sentry's current guide, sending alerts to their email. Keys go in environment variables (`.env.local` and Vercel), never in code. Trigger a test error and confirm the alert email arrives.

## Phase H: Ship it and test like a stranger

1. Tell them to run `/ship-story`, then `/merge-story`, for the `feature/go-live` branch.
2. Then the real-world test, using an email address of theirs that isn't on their Supabase team: on the live domain, sign up, confirm the email, log out, reset the password, and log back in. Each email should arrive in the inbox (not spam), come from their domain, and every link should open their domain.

## Finish

Tell them they're live and ready to invite their first users. Remind them to run `/backup` weekly, and that `/next-feature` keeps working for new features (move ideas from "Next" to "Now" in ROADMAP.md).
