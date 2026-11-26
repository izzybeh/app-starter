---
name: start-app
description: Build the beginner's starter web app (Next.js, TypeScript, Tailwind, Supabase), save it to GitHub, and put it online with Vercel. Use when the person types /start-app.
disable-model-invocation: true
---

You are setting up a brand-new app for someone who has never coded. Work through the phases below in order. Before each phase, say in one sentence what you're about to do. Skip any phase that's already done (check first). If something fails, explain it in plain English and fix it; don't move on with a broken step.

## Phase 1: Check the basics

1. Run `node --version`, `git --version` and `gh auth status`.
   - Node.js missing or older than 20.9: ask them to install the LTS version from https://nodejs.org, quit and reopen the Claude app, then run `/start-app` again. Stop.
   - Git missing on Windows: ask them to install Git for Windows from https://git-scm.com/downloads/win, then restart the Claude app. Stop.
   - Not logged in to GitHub: walk them through opening the Terminal in the Code tab and running `gh auth login` (GitHub.com → HTTPS → Yes → Login with a web browser). Wait for "done".
2. Make sure this folder is a Git repository connected to GitHub (`git remote -v`). If it isn't, connect it: `git init -b main` (if there's no `.git` folder), then `gh repo create <app-name> --private --source=. --remote=origin`. The push happens in Phase 6.
3. Make sure `VISION.md` exists. If not, ask them to paste their vision doc and save it exactly as given.

## Phase 2: Name the app

Read `VISION.md`. Pick the app name it uses (or ask them for one if it has none). Replace "(filled in by /start-app)" in `CLAUDE.md` with the name.

## Phase 3: Create the app

1. If `package.json` already exists, skip to Phase 4.
2. `create-next-app` won't run in a folder that already has files, so create it in a temporary subfolder without its own Git repository or prompts:
   `npx --yes create-next-app@latest tmp-app --ts --tailwind --eslint --app --src-dir --use-npm --import-alias "@/*" --disable-git --skip-install --yes`
   Then move everything from `tmp-app` into this folder **except** `.git`, `node_modules`, `README.md` and `CLAUDE.md`. If it created an `AGENTS.md`, keep it and add a line `@AGENTS.md` near the top of our `CLAUDE.md`. Merge its `.gitignore` lines into ours, but keep our `.env` rules exactly as they are (`.env.example` must stay saveable). Delete `tmp-app`, then run `npm install`.
3. **Install the usability kit** (building blocks, theme and stricter checks). If `theme.json` is missing, show them the six looks (Calm, Warm, Fresh, Bold, Playful, Professional, one line each from `starter-kit/themes/presets.json`), recommend one that fits VISION.md, and write their choice as `{ "base": "<id>", "name": "<Name>" }`. Then run:
   `node starter-kit/install.mjs --name "<app name>" --description "<one sentence from VISION.md>"`
   When it finishes, delete the `starter-kit/` folder (everything it needs is now in the app, and its guide is in `docs/USABILITY-KIT.md`).
4. Install `@supabase/supabase-js` and `@supabase/ssr`, and set up the Supabase client helpers the way Supabase's current Next.js guide recommends (use the Supabase connector's documentation search if it's available).
5. The kit already made a friendly home page and a `/style-guide` page. Add `.env.example` with the variable names only (no values).
6. Run `npm run typecheck`, `npm run lint`, `npm run format:check` and `npm run build`. Fix anything that fails.

## Phase 4: Connect to Supabase

1. If the Supabase connector is available, use it to get the project's URL and publishable (anon) key. These are safe to put in the app. If it isn't available, tell them where to find both in the Supabase dashboard (the **Connect** button at the top of their project, or **Project Settings → API Keys**) and have them paste the two values into `.env.local` themselves.
2. Write `.env.local` with those values. Confirm `.gitignore` covers `.env*` but not `.env.example`.
3. Record the project ID next to "Live project ID" in `CLAUDE.md`.

## Phase 5: See it running

Start the app (`npm run dev`) and open it in the preview so they can see the page. Ask them to confirm they can see "Hello from <app name>". Then open `/style-guide` and tell them: this is every building block of their app in their theme; they can change the look any time (`theme.json`).

## Phase 6: Save to GitHub

Commit everything with a clear message and push to `main`. Check with `git status` that `.env.local` was not included.

## Phase 7: Put it online with Vercel

1. If the Vercel connector is available, offer to create the Vercel project from their GitHub repository and add the environment variables for Production, Preview and Development. Ask before doing it.
2. Otherwise, give them these steps and wait for "done":
   1. Go to https://vercel.com and click **Add New → Project**.
   2. Find the repository and click **Import**.
   3. Open **Environment Variables** and add each one. Show them each name and its value from `.env.local`. These two values are public, so showing them is fine; never show any other secret.
   4. Click **Deploy**.
3. Check the deployment (with the Vercel connector if available, or ask them for the result). If it failed, read the build log, explain the cause in one sentence, fix it, push, and redeploy.
4. Get the live `.vercel.app` address.

## Phase 8: Fix login links

Supabase needs to know the app's addresses so login emails point to the right place. Give them these steps and wait for "done":

1. In Supabase, open **Authentication → URL Configuration**.
2. Set **Site URL** to the live `.vercel.app` address.
3. Under **Redirect URLs**, add `http://localhost:3000/**` and a wildcard for Vercel preview addresses, for example `https://*-<their-vercel-team>.vercel.app/**` (work out the exact pattern from their project and team names).

## Finish

Tell them:

- Their app is live at the `.vercel.app` address. Ask them to open it on their phone.
- What you built, in two sentences.
- Next: `/plan-roadmap`.
