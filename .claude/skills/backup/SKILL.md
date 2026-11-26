---
name: backup
description: Save a copy of the app's live data and database structure to a folder on this computer, outside the project. Use when the person types /backup or asks to back up their data.
---

The free Supabase plan doesn't keep automatic backups, so this saves a copy on the person's computer. Read-only: don't change the database.

1. Find the live project ID in CLAUDE.md (or the only project, before `/go-live`). You need the Supabase connector. If it isn't connected, tell them how to add it (see their guide's "Connect" station) and stop.
2. Create a backup folder **outside the project folder**, so it never gets saved to GitHub: in their home folder, `app-backups/<app-name>/<today's date YYYY-MM-DD>/`.
3. List the tables in the `public` schema with their row counts. If any table has more than about 5,000 rows, stop: explain that this approach is too slow for that much data, and suggest Supabase Pro, which includes automatic daily backups.
4. List the tables in the `public` schema. For each table, export all rows as JSON with a read-only query, and save `<table>.json` in the backup folder. For very large tables, export in pages.
5. Copy every file in `supabase/migrations/` into a `migrations/` folder inside the backup folder. Together these can rebuild the database.
6. Write a short `README.txt` in the backup folder: the date, the project, the tables and row counts, and that login accounts and uploaded files aren't included.

Tell them where the backup is (give the full folder path), how many tables and rows it saved, and to run `/backup` again next week. Suggest copying the folder to cloud storage (like iCloud Drive, Google Drive or OneDrive) for extra safety.
