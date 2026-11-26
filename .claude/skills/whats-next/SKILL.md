---
name: whats-next
description: Tell a beginner where they are in building their app and the one thing to do next. Use when the person types /whats-next or asks "what do I do now?", "where was I?" or "what's next?".
---

Figure out where this project stands and tell the person the single next step. Do not change any files.

Check, in this order, and stop at the first that applies:

1. `VISION.md` is missing → they need to save their vision first. Tell them to copy the "Save your vision" prompt from the guide, or to paste their vision doc here so you can save it.
2. `package.json` is missing → next is `/start-app`.
3. `ROADMAP.md` is missing → next is `/plan-roadmap`.
4. `.claude/main-protected` is missing → next is `/setup-quality` (it picks up where it left off).
5. Run `git status` and `git branch --show-current`.
   - On `feature/go-live` or `feature/test-database` → they're partway through launch prep. Next is `/go-live` (it continues where it left off), unless a pull request is open for that branch, in which case: test the preview, then `/merge-story`.
   - On a `feature/...` branch with an open pull request (`gh pr view --json state,url` succeeds and state is OPEN) → they should test the preview link on their phone, then run `/merge-story`. Show the pull request link.
   - On a `feature/...` branch without a pull request → they're mid-feature. Summarize what the branch is for (from its name and recent commits), then say: keep testing in the preview, and run `/ship-story` when it works.
6. On `main`: read `ROADMAP.md`.
   - If any story under "Now" is unchecked → next is `/next-feature`. Name the story it will pick.
   - If every "Now" story is checked and the "Live project ID" in CLAUDE.md is still "(not set yet)" or no test project is recorded → next is `/go-live`.
   - Otherwise → they're live. Suggest picking stories from "Next" (move them to "Now" in ROADMAP.md, then `/next-feature`), and running `/backup` weekly.

Answer in at most four short lines: where they are, what's done, and the exact command to type next.
