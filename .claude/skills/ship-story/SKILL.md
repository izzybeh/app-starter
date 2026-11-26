---
name: ship-story
description: Check a finished feature against the Definition of Done, run the usability review, and open a pull request with a preview link. Never merges. Use when the person types /ship-story.
---

Make sure the feature on this branch meets the Definition of Done in `CLAUDE.md`, then open a pull request. If anything can't be fixed, stop and explain why in plain English. Don't open the pull request.

## 1. Check the branch

Run `git branch --show-current`. If it's `main`, stop: explain that features are built on their own branch, and suggest `/next-feature`.

If this branch isn't a roadmap story (for example `feature/go-live`, `feature/test-database` or `feature/roadmap-update`), skip the steps about "done when" checks and checking off ROADMAP.md, and describe the change instead.

## 2. Run the checks

1. Run `npm run check` and `npm run e2e`. Fix any failure, explaining each fix in one sentence. Re-run until both pass.
2. Make sure every "done when" check of this story has a Playwright test.
3. If the Supabase connector is available, run the security advisor and fix any new warnings, especially about Row Level Security.
4. Search the changed files for anything that looks like a secret (API keys, passwords, tokens). Remove any you find and tell the person.

## 3. Usability review

Ask the `usability-reviewer` subagent to review the screens this branch changed, at desktop and phone size, against `HEURISTICS.md`. Tell it which story this is and its "done when" checks.

- Problems rated **3 or 4**: fix them, then run the review again. Repeat until there are none. If one truly can't be fixed now, stop and explain; don't open the pull request.
- Problems rated **2**: add them under "Later" in `ROADMAP.md`, one line each.
- Problems rated **0 or 1**: fix them if quick; otherwise ignore.

## 4. Check it off

Check the story's box in `ROADMAP.md` (`- [x]`).

## 5. Open the pull request

Commit and push the branch. Open a pull request with `gh pr create`:

- Title: the story's name.
- Body: what changed, in plain English (3 to 5 bullets); the "done when" checklist; a short usability review summary; and any database changes described in plain words ("adds a recipes table where each person can only see their own recipes").

## 6. Wait for checks and the preview

Run `gh pr checks --watch`. If a check fails, fix it, push, and wait again.

Find the Vercel preview link (in the pull request's comments or checks, or with the Vercel connector).

## Finish

Tell them:

1. Open the preview link **on your phone** and try every "done when" check yourself. The first time, Vercel asks you to log in on your phone: use the same Vercel account.
2. If anything is wrong, describe it here and I'll fix it.
3. If it all works, type `/merge-story` to put it live.

Show the preview link and the pull request link.
