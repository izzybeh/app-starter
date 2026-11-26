---
name: setup-quality
description: One-time setup of the beginner's quality checks - design system, tests, GitHub checks, usability rules, security check, and main-branch protection. Resumable; run again to continue. Use when the person types /setup-quality.
disable-model-invocation: true
---

Set up the automatic checks that every future feature must pass. The person doesn't need to understand the details, only what each part protects them from.

This takes a while, so work in phases. **Check what's already done and start at the first unfinished phase.** At the start, show a short checklist of the phases with ✓ for the ones already done. After each phase: commit, push to `main`, say in one sentence what the person now has, and ask whether to keep going or stop for today (they can run `/setup-quality` again later to continue). If the conversation is getting long, suggest starting a new session and running `/setup-quality` again.

## Phase A: Choose the look → `DESIGN.md`

Done if `DESIGN.md` exists.

1. Ask them to paste 2 or 3 screenshots of apps or websites whose look they like (or describe the feel they want in a few words). Read VISION.md for who the users are.
2. Build a temporary page at `/style-preview` showing two clearly different style options side by side (colors, fonts, buttons, a sample card and form). Open it in the preview and ask which they prefer, or what to change.
3. Write `DESIGN.md`: colors (with exact values), fonts, text sizes, spacing, corner rounding, button styles, form styles, how success/error/empty/loading states look, and the tone of voice for on-screen words (with examples). Apply it to the existing home page. Delete the `/style-preview` page.

## Phase B: Automatic checks

Done if `package.json` has a `check` script and `playwright.config.*` exists.

1. Turn on TypeScript strict mode. Make sure ESLint works with `npx eslint .` and add Prettier.
2. Add Vitest for unit tests, with one small passing example test.
3. Add Playwright with two projects, desktop Chrome and a phone (for example "Pixel 7"), and `@axe-core/playwright`. Add one end-to-end test that opens the home page and runs an accessibility scan that fails on serious or critical issues. Install the Playwright browsers.
4. Add npm scripts: `typecheck`, `lint`, `test` (Vitest), `e2e` (Playwright), and `check` (typecheck + lint + test + build, in that order).
5. **A test login for automated tests.** Real sign-up emails can't be sent from tests, so tests log in with one test account instead. Have the person create it in Supabase: **Authentication → Users → Add user → Create new user**, any email and password, with **Auto Confirm User** on. Then have them add two lines to `.env.local` themselves (show them how to open it): `E2E_EMAIL=...` and `E2E_PASSWORD=...`. Add a Playwright setup project that logs in once with these and saves the session for other tests. Tests must never send real sign-up emails: for sign-up flows, only check the form and the "check your email" screen. Add both names (no values) to `.env.example`.
6. Run `npm run check` and `npm run e2e`. Both must pass. Show them the passing summary and say: "Green means go."

## Phase C: Checks on GitHub

Done if `.github/workflows/checks.yml` exists.

1. Add a GitHub Actions workflow that runs on every pull request: install, `npm run check`, install Playwright browsers, `npm run e2e`.
2. Store every value in `.env.local` as GitHub Actions secrets with `gh secret set -f .env.local` (this never prints them). In the workflow, pass each secret to the build and test steps as an environment variable with the same name.
3. Turn on Dependabot security alerts: `gh api -X PUT repos/{owner}/{repo}/vulnerability-alerts`.

## Phase D: Usability rules → `HEURISTICS.md`

Done if `HEURISTICS.md` exists.

Write `HEURISTICS.md` with one section per Nielsen Norman Group usability heuristic, in this order:

1. Visibility of system status
2. Match between the system and the real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, and recover from errors
10. Help and documentation

For each, write 2 to 4 concrete, checkable rules **for this app** (use VISION.md and ROADMAP.md), each with a one-line pass example and fail example. Then add a "Severity scale" section: 0 not a problem, 1 cosmetic, 2 minor, 3 major (must fix before shipping), 4 catastrophe (must fix before shipping).

Then add Playwright helpers and tests for the rules a robot can check, to be reused by every feature: no raw error text ("undefined", "null", "NaN", stack traces, "Error:" codes) on screen; every form and dialog has a visible way to cancel or go back; double-clicking a submit button never saves twice; destructive actions ask for confirmation or offer undo. Keep them passing on the current app.

## Phase E: Security check

Done if Phase F is done.

If the Supabase connector is available, run the Supabase security and performance advisors and explain anything they flag in plain English. Fix anything about Row Level Security now.

## Phase F: Prove it works

Done if `gh pr list --state closed --head feature/check-the-checks` shows a pull request.

1. Create a branch `feature/check-the-checks`. Break one test on purpose and add a temporary Save button that gives no feedback when clicked. Commit, push, and open a pull request with `gh pr create`.
2. Wait for the GitHub checks (`gh pr checks --watch`). Show them the pull request link and the red X, and explain: this is what stops a broken change from reaching real people.
3. Run the `usability-reviewer` subagent on the page with the silent Save button and show its rating (it should rate the missing feedback as 3 or 4 under "Visibility of system status"). Explain: `/ship-story` won't open a pull request while a problem like this exists.
4. Close the pull request with `gh pr close --delete-branch`, switch back to `main`, and pull.

## Phase G: Protect the live version

1. Create the file `.claude/main-protected` containing one line: "Changes reach main only through /ship-story and /merge-story."
2. Commit and push it to `main`. This is the last direct push to `main`: from now on the project's safety hook blocks direct pushes, and every change goes through a pull request.
3. Explain the merge rule in plain words: a feature goes live only when the checks are green, the usability review has no 3s or 4s, and they've tried every "done when" check on the preview on their own phone. `/merge-story` asks about each.
4. Tell them to run `/backup` once a week to save a copy of their data.

## Finish

Tell them quality checks are on, and next is `/next-feature`.
