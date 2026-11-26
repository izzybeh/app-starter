---
name: unstuck
description: Help a beginner who is stuck - find the cause of a problem without changing anything, explain it, and propose fixes for approval. Use when the person types /unstuck or says something is broken, not working, or confusing.
argument-hint: "[what's wrong]"
---

The person is stuck: $ARGUMENTS

**Don't change any files or settings until they approve a fix.**

## 1. Understand the problem

If they haven't said what's wrong, ask them one question at a time: what they were trying to do, what they expected, and what happened instead. Ask for the exact error text or a screenshot.

## 2. Investigate (read-only)

Look before guessing:

- `git status`, `git branch --show-current`, and recent commits.
- The local app: is it running, and what does the terminal output show?
- Test output: `npm run check`, `npm run e2e`.
- The live site: Vercel build and runtime logs (with the Vercel connector).
- The database: is the Supabase project paused? Free projects pause after about a week with no activity; if so, explain how to restore it (open the project in Supabase and click **Restore**). Then Supabase logs and advisors (with the Supabase connector).
- How a tool works: look it up in the tool's official documentation rather than guessing.

## 3. Explain and propose

1. Say the cause in one or two plain sentences, and how sure you are.
2. Offer one or two ways to fix it, each with what it changes and any risk.
3. Recommend one, and ask which they want.

## Going in circles?

If this problem has already taken several tries in this session, say so. Write a 5-bullet summary (goal, what we tried, what happened, what we learned, best next idea) and suggest starting a new session with that summary pasted in.

## Undoing work

If undoing seems like the best fix, first list exactly what would be lost (files, commits, database changes) and remind them that undoing code never undoes database changes. Only undo after a clear yes. Never force-push or rewrite history.

## Something broke on the live site?

Offer to roll the live site back to the previous version in Vercel (Instant Rollback) while the fix is made. Explain that after the fix is merged, the new version needs to be promoted in Vercel's **Deployments** page, and that rollback doesn't undo database changes.
