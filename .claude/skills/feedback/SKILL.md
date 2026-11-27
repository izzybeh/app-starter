---
name: feedback
description: Save what someone said about the app (a request, a complaint, a bug, praise) as a feedback note on GitHub, so the next round of planning can use it. Use when the person types /feedback, pastes a message from a user, or says something like "my friend said…" or "people keep asking for…".
argument-hint: "[what they said]"
---

Save feedback so it shapes what gets built next. Don't change any code or files in the project.

Feedback is saved as a GitHub issue with the label `feedback`, in the app's own (private) repository. Explain this once, the first time: "An issue is just a note on GitHub. Saving feedback there keeps it safe and out of the way of your code."

## 1. Get the feedback

Use $ARGUMENTS if given. Otherwise ask: "What did they say? Paste their words, or describe it in your own." If they share a screenshot, describe what it shows in words.

If it's more than one idea, split it into separate notes, one per idea, and say so.

## 2. Understand it (one question at most)

Work out, without asking if you can:

- **Kind**: Something's broken · Hard to use · Wants something new · Likes something.
- **Who**: a first name or a description like "a new user" or "Mom". Never save email addresses, phone numbers or other personal details. Leave them out even if they were pasted.
- **How many people**: if a matching note already exists (step 3), this adds one more person to it.

If one thing is truly unclear, ask one short question. Otherwise don't ask.

**Something's broken** on the live site is more urgent than a note. Say so, save the note, then suggest `/unstuck` to look into it now.

## 3. Check for a matching note

Run `gh label create feedback --color FBCA04 --description "What people said about the app" 2>/dev/null || true` so the label exists.

Run `gh issue list --label feedback --state open --limit 100 --json number,title,body`. If one is about the same thing, add a comment to it instead of making a new one (`gh issue comment <number> --body "..."`), and say "That's the second (third…) person to mention this."

## 4. Save it

Otherwise create one: `gh issue create --label feedback --title "<kind>: <short plain summary>" --body "<body>"`. Body:

```
**What they said**
<their words, lightly cleaned up, personal details removed>

**Who**: <first name or description>
**Kind**: <kind>
**Where in the app**: <screen or feature, if known>
```

If the feedback is about a story that's still unchecked under "Now" in `ROADMAP.md`, mention that story's number in the body.

## Finish

In two or three short lines: what you saved and how many feedback notes are open now. Then the one next step:

- Fewer than 3 open notes and stories still unchecked under "Now" → keep building with `/next-feature`; feedback will be used when they plan the next round.
- All "Now" stories are checked → `/plan-roadmap` to plan the next round from this feedback.
- Otherwise → keep collecting with `/feedback`, and run `/plan-roadmap` when the current round is done.
