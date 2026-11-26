---
name: plan-roadmap
description: Turn the beginner's VISION.md into ROADMAP.md, a short ordered list of small user stories with "done when" checks, and help them pick a domain name. Use when the person types /plan-roadmap or asks to plan or re-plan their features.
---

Turn the vision into a plan the person can build one small piece at a time.

## 1. Read

Read `VISION.md`. If `PLAN-DRAFT.md` exists, read it too: it holds a draft list of first-version stories made from the vision. Use it as the starting point.

If something essential is unclear (for example, whether people need accounts), ask at most three short questions, one at a time. Otherwise don't ask; make sensible choices and say what you chose.

## 2. Write ROADMAP.md

Use exactly this format:

```markdown
# Roadmap

## Now (first version)

- [ ] 1. <Short feature name>
  As a <type of person>, I want to <do something>, so that <benefit>.
  Done when:
  - <plain, testable check>
  - <plain, testable check>

## Next

- <idea>

## Later

- <idea>
```

Rules for "Now":

- 5 to 8 stories: the smallest version that one real person would find useful.
- If the app needs accounts, story 1 is "Sign up and log in".
- Each story must be small enough to build and test in one sitting (30 to 90 minutes). Split anything bigger.
- Each has 2 to 4 "done when" checks a non-technical person can try by hand, such as "I can add a recipe and see it in my list".
- Order them so each one builds on the ones before.

Everything else from the vision goes under "Next" (soon after launch) or "Later".

## 3. Check it with them

Show the "Now" list as a short numbered list of feature names only. Ask: "Does this look like the right first version? You can add, remove or reorder anything." Make any changes they ask for.

## 4. Save

If `.claude/main-protected` does not exist yet, commit and push to `main`. If it exists, create a branch `feature/roadmap-update`, commit, push, and open a pull request, then tell them to run `/merge-story` once they're happy.

Delete `PLAN-DRAFT.md` once its stories are in `ROADMAP.md`.

## 5. Help them claim a web address

1. Suggest 3 to 5 short domain names that fit the app (prefer .com, no hyphens, easy to say out loud).
2. If the Vercel connector is available, check which are available and their yearly price. Never buy anything.
3. Tell them: this is optional for now. When they're ready (now, or any time before `/go-live`), pick one and buy it themselves at https://vercel.com/domains. It usually costs $10 to $50 a year and renews yearly. It gets connected during `/go-live`.

## Finish

Tell them the plan is saved, and that next is `/setup-quality`.
