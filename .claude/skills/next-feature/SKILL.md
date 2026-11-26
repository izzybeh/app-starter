---
name: next-feature
description: Plan and build the next user story from ROADMAP.md for a beginner, test-first, on its own branch. Use when the person types /next-feature, optionally with a story number, such as "/next-feature 3".
argument-hint: "[story number]"
---

Build one feature from the roadmap, start to finish, with the person approving the plan first.

## 1. Get ready

1. Run `git status`. If there are uncommitted changes, stop: explain what they look like and ask whether to save them (on a branch) or set them aside. Don't discard anything without a yes.
2. If a branch named `feature/go-live` or `feature/test-database` exists, stop and tell them to finish `/go-live` first.
3. If any pull request is still open (`gh pr list --state open`), stop: tell them to test its preview and run `/merge-story` first, so two features don't collide.
4. Switch to `main` and pull the latest.
5. If `ROADMAP.md` is missing, tell them to run `/plan-roadmap` first and stop.

## 2. Pick the story

If a story number was given ($ARGUMENTS), use that story. Otherwise use the first unchecked story under "Now" in `ROADMAP.md`. If none are left, tell them the first version is complete, and suggest `/go-live` (if not done yet) or moving ideas from "Next" into "Now".

Show the story and its "done when" checks, and say which number it is out of how many.

## 3. Plan it (and wait)

Create a branch `feature/<short-name>`.

Explain your plan in plain English, in under 200 words:

- What they'll see change on screen.
- What information the app will store (if any), and who can see it.
- Which usability rules from `HEURISTICS.md` matter most here, and how the design handles them.
- Anything you're unsure about, as questions.

Then ask: "Does this match what you pictured?" **Wait for a yes** (or changes) before writing any code.

## 4. Build it, test-first

1. Write Playwright tests for every "done when" check first, plus the checks in HEURISTICS.md that apply. Run them and confirm they fail (nothing is built yet).
2. Build the feature, following `DESIGN.md` and `HEURISTICS.md`. Handle loading, empty, success and error states in plain words.
3. Database changes: write a migration file in `supabase/migrations/` with Row Level Security and policies, and apply it with the Supabase connector. Before `/go-live`, apply it to the only project. After `/go-live`, apply it **only to the test project** (see CLAUDE.md); the live project changes during `/merge-story`.
4. Run the tests and `npm run check` until everything passes. Commit as you go with clear messages, and push the branch.

## 5. Let them try it

Start the app and open it in the preview. Give them a short checklist to try by hand: each "done when" check, in plain words.

If the feature involves logging in, they can use the test account from `.env.local` (`E2E_EMAIL`), or make another: in Supabase (the test project, after `/go-live`), open **Authentication → Users**, click **Add user**, choose **Create new user**, enter any email and password, and turn on **Auto Confirm User**.

Ask them to tell you anything that looks wrong or confusing. For each problem: fix it, re-run the tests, and ask them to try again.

## Finish

When they say it works, tell them: "Next, type `/ship-story`. It runs every check and gives you a preview link to try on your phone."
