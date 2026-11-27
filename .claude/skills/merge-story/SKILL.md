---
name: merge-story
description: Put a tested feature live by merging its pull request, after confirming the checks passed and the person tried it on their phone. Runs only when the person types /merge-story.
disable-model-invocation: true
---

This puts a feature in front of real people. Go step by step, and stop at any "no".

## 1. Find the pull request

Run `gh pr view --json number,title,url,state,headRefName` on the current branch. If there's no open pull request, stop: tell them to finish the feature and run `/ship-story` first.

## 2. Confirm the checks are green

Run `gh pr checks`. If any check failed or is still running, stop. Explain which one in plain words, and offer to fix it (then they'll need `/ship-story` again).

## 3. Confirm they tested it

If the branch is `feature/roadmap-update`, just ask whether they're happy with the plan, and skip the checklist. If it's any other branch that isn't a roadmap story, ask instead whether they reviewed the change in the preview, and skip the checklist.

Ask: "Did you open the preview link on your phone and try every 'done when' check?" List the checks. Continue only on a clear yes.

## 4. Database changes

Check whether this pull request adds files in `supabase/migrations/`.

- If it does, and a **test project** is recorded in CLAUDE.md (after `/go-live`), explain in plain words what will change in the **live** database and whether any existing data could be affected. Ask for a clear yes. Then **apply the new migration files to the live project now, before merging**, in order, with the Supabase connector. If any fails, stop: don't merge, explain what happened, and fix it on the branch. (Applying first means the new code never goes live without the database it needs.)
- Before `/go-live` (only one project), the changes were already applied while building. Just mention them.

## 5. Merge

Run `gh pr merge --squash --delete-branch`. Then switch to `main` and pull.

If migrations were applied in step 4, run the security advisor on the live project.

## 6. Confirm it's live

Check that Vercel's production deployment of `main` succeeded (Vercel connector, or ask them to look at their Vercel project). If it failed, explain why and fix it on a new branch.

## 7. Close the loop on feedback

If the story in `ROADMAP.md` has a `From feedback:` line, close each of those notes once it's live: `gh issue close <number> --comment "This is now live."` Tell them which people asked for it (from the notes), so they can let them know.

## Finish

Tell them the feature is live. Ask them to open their live site and try it once more. Then say what's next:

- More unchecked stories under "Now" in ROADMAP.md → `/next-feature`.
- All done and not yet launched → `/go-live`.
- All done and already live → share the app, save what people say with `/feedback`, then plan the next round with `/plan-roadmap`.

If something breaks on the live site later, tell them to type `/unstuck`. Vercel can roll back to the previous version while the fix is made. After a rollback, new merges don't go live on their own until the newest version is promoted in Vercel's **Deployments** page.
