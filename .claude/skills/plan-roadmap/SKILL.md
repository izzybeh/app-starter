---
name: plan-roadmap
description: Turn the beginner's VISION.md into ROADMAP.md, a short ordered list of small user stories with "done when" checks, and help them pick a domain name. Run it again after a round of features is done to plan the next round from feedback. Use when the person types /plan-roadmap or asks to plan, re-plan, or decide what to build next.
---

Turn the vision into a plan the person can build one small piece at a time.

**Which mode?** If `ROADMAP.md` doesn't exist yet, follow **First plan**. If it exists, follow **Next round**.

# First plan

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

Follow **Saving the roadmap** below. Delete `PLAN-DRAFT.md` once its stories are in `ROADMAP.md`.

## 5. Help them claim a web address

1. Suggest 3 to 5 short domain names that fit the app (prefer .com, no hyphens, easy to say out loud).
2. If the Vercel connector is available, check which are available and their yearly price. Never buy anything.
3. Tell them: this is optional for now. When they're ready (now, or any time before `/go-live`), pick one and buy it themselves at https://vercel.com/domains. It usually costs $10 to $50 a year and renews yearly. It gets connected during `/go-live`.

## Finish

Tell them the plan is saved, and that next is `/setup-quality`.

# Next round

Plan a small batch of improvements based on what real people said.

## 1. Check the current round

Read `ROADMAP.md`. If stories under "Now" are still unchecked, list them and ask: "You have these left in this round. Finish them first, or plan a new round now? (Unfinished ones can go into the new round.)" If they want to finish first, tell them to run `/next-feature` and stop.

## 2. Gather what you know

1. Read `VISION.md`, and the "Next" and "Later" lists in `ROADMAP.md` (these include smaller usability problems found during reviews).
2. Read open feedback: `gh issue list --label feedback --state open --limit 100 --json number,title,body,comments`. Count how many people mentioned each thing (a comment on a note is one more person).
3. Ask one question: "Has anything changed about your idea or who it's for since you wrote your vision?" If yes, update `VISION.md` with their answer and show them the change in a few lines.

If there's no feedback yet, say so, and suggest they share the app with a few people and save what they say with `/feedback`. Offer to plan from the "Next" list anyway.

## 3. Propose the round

Pick **3 to 5** stories, in this order of priority:

1. Anything broken, or something people found hard to use.
2. What the most people asked for.
3. Ideas from "Next" that fit what people are asking for.
4. Unchecked stories they chose to carry over.

Same rules as the first plan: small enough for one sitting, 2 to 4 "done when" checks each, ordered so each builds on the ones before. Number new stories after the highest number already in `ROADMAP.md` (if the last was 8, start at 9), so numbers are never reused.

Show them a short numbered list: the feature name and one line on why, such as "3 people asked for this" or "Fixes the confusing Save button". Also list, in one line each, the feedback you're leaving for later. Ask: "Does this look like the right next round? You can add, remove or reorder anything." Make any changes they ask for.

## 4. Update ROADMAP.md

- Move every checked story from "Now" into a `## Done` section at the bottom of the file, one line each (`- [x] 3. Add a recipe`). Keep the "done when" checks out of it to keep the file short.
- Replace "Now" with `## Now (round <n>)`. The first version was round 1, so the first time this runs it's round 2.
- Each new story uses the usual format. If it came from feedback notes, add a line under its "done when" checks: `From feedback: #12, #15`.
- Remove ideas from "Next" and "Later" that became stories. Add feedback you're leaving for later under "Next" or "Later", with its note number.

## 5. Update the feedback notes

For each feedback note used in a story, comment: "Planned as story <number>: <name>." Leave it open; `/merge-story` closes it when that story goes live.

If they decided not to do something at all, ask before closing it, then close it with a one-line reason.

## 6. Save

Follow **Saving the roadmap** below.

## Finish

Tell them the new round is saved, how many stories it has, and that next is `/next-feature` (after `/merge-story`, if a pull request was opened).

# Saving the roadmap

If `.claude/main-protected` does not exist yet, commit and push to `main`. If it exists, create a branch `feature/roadmap-update`, commit, push, and open a pull request, then tell them to run `/merge-story` once they're happy. (They don't need to test a preview for this one: only the plan changed.)
