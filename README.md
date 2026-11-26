# App starter for Claude Code

A starting point for building a real web app with Claude Code when you've never coded before. It comes with commands that walk you through every step, and safety checks that keep your app working and your data private.

## How to use it

Follow the step-by-step guide you were given. It tells you when to copy this template. After that, everything happens in the Claude app's **Code** tab by typing these commands:

| Type this | What it does |
| --- | --- |
| `/whats-next` | Tells you where you are and what to do next |
| `/start-app` | Builds your starter app and puts it online |
| `/plan-roadmap` | Turns your vision into small features, in order |
| `/setup-quality` | Turns on automatic checks (once) |
| `/next-feature` | Plans and builds your next feature |
| `/ship-story` | Checks the feature and gives you a preview link |
| `/merge-story` | Puts a tested feature live |
| `/go-live` | Your own domain, real email, privacy basics |
| `/explain` | Explains anything in plain English |
| `/unstuck` | Finds what's wrong without changing anything |
| `/backup` | Saves a copy of your data to your computer |

New here? Type `/whats-next`.

## What's inside

- `CLAUDE.md`: house rules Claude follows in every session.
- `.claude/skills/`: the commands above.
- `.claude/agents/usability-reviewer.md`: an independent reviewer that grades each screen against Nielsen Norman Group's 10 usability heuristics.
- `.claude/hooks/`: safety checks that block saving secret keys to GitHub, force-pushing, and (after setup) changing the live version without a pull request.

The app itself (Next.js, TypeScript, Tailwind CSS, Supabase, deployed on Vercel) is created by `/start-app`, so it always uses current versions.
