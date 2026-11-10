# Angular 21 practice: Task Board

Small standalone + signals app with intentionally planted problems.
Goal: practice the Bolt.new interview format (code review, bug fixing, small feature) with the built-in AI agent.

## Exercise plan (about 45 min)

1. **Code review (10 min)** - read the code yourself first. Write down every problem you find (bugs, risks, style). Only then ask the Bolt agent for a second opinion and compare.
2. **Fix bugs (20 min)** - fix the issues using the agent. Give it small, precise prompts. Read every diff before accepting it, and verify in the preview.
3. **Feature (15 min)** - pick one:
   - sort tasks by due date (with an asc/desc toggle)
   - inline edit of a task title
   - show an "overdue" badge and a count of overdue tasks
   - persist tasks in localStorage

Do NOT open `BUGS.md` until you finish step 1.

## Open in Bolt

Option A: push this folder to a GitHub repo and use Import from GitHub in Bolt.
Option B: create a new Angular project in Bolt and replace its files with the ones from `src/` (plus `package.json`).
