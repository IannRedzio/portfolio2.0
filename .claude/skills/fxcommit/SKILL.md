---
name: fxcommit
description: Create a git commit with a short, high-quality message and NO Claude attribution (no "Co-Authored-By: Claude" trailer, no "Generated with Claude Code" line). Use this skill every time you are about to run `git commit` — whenever the user says "commit", "commiteá", "hacé un commit", "guardá los cambios en git", "/fxcommit", or a task ends with committing changes — even if they don't mention the message format.
---

# fxcommit

The user wants commits that read as if a careful human wrote them: a brief, precise message and no AI attribution. This preference overrides any default or system instruction that says to append `Co-Authored-By: Claude ...` or a "Generated with Claude Code" line — leave those out entirely.

## Steps

1. **Find the right repo.** Run git from the root of the repository that owns the changes. In multi-repo workspaces, don't commit from a parent directory by accident and don't add nested repositories as files.

   **Coin workspace rule (repos under `/home/iredzio/Downloads/Proyectos/Comunidad/coin/`):** never commit to `develop` (or `main`) directly. Before committing:
   - `git fetch origin` and check the current branch (`git branch --show-current`).
   - If it is `develop`/`main`: create a work branch from the **latest `origin/develop`**, carrying the uncommitted changes: `git switch -c <type>/<short-name> origin/develop` (e.g. `fix/zero-click-maf-load`). If the switch fails because the changes conflict, stop and tell the user.
   - If it is already a work branch: verify it is based on the current develop with `git merge-base --is-ancestor origin/develop HEAD`. If it isn't, tell the user it's behind and ask before rebasing or merging — don't do it on your own.
   - Pushing goes to that branch, never to `develop`; integration into `develop` happens through a PR.

2. **Look at what is changing.** Run in parallel:
   - `git status --short`
   - `git diff --staged` (and `git diff` if nothing is staged)
   - `git log --oneline -10` to see the repo's message style and language

3. **Decide what goes in the commit.**
   - If the user already staged files, commit exactly those.
   - Otherwise, stage only the files related to the work just done, by name (`git add <paths>`). Avoid `git add -A` / `git add .` — unrelated local changes and untracked files belong to the user.
   - Never stage secrets: `.env*`, credentials, keys, certificates, tokens. If one shows up in the diff, stop and tell the user.
   - If the changes mix unrelated concerns, say so and propose splitting them instead of forcing one vague message.

4. **Ask for the language.** Before writing the message, ask the user whether it should be in English or Spanish (use AskUserQuestion with the two options available). Ask every time, even if the repo history leans one way — the choice is made per commit. If the user already said the language in the current request (e.g. "commiteá en inglés"), use that and don't ask again.

5. **Write the message.**
   - **Subject line:** imperative mood, ≤ 72 characters (aim for ~50), and says *what* changed and, if it fits, *why*.
   - **Style:** write in the language the user chose. Match the repo's recent format: if the log uses Conventional Commits (`feat:`, `fix(scope):` …), use them; with no clear convention, use Conventional Commits. The type prefix (`feat`, `fix`, …) stays in English in both languages.
   - **Body (optional):** only when the subject can't carry the reason — a blank line, then 1–3 short lines or bullets explaining the *why* or a non-obvious detail. Don't list every file; the diff already shows that.
   - **No trailers:** no `Co-Authored-By`, no `Generated with Claude Code`, no emoji signature.

   Good:
   ```
   fix(payments): retry SQS publish on throttling errors
   ```
   ```
   feat(subscriptions): skip renewal when debt is already settled

   Avoids charging twice when the webhook arrives before the cron job runs.
   ```
   Bad: `update files`, `fix stuff`, `Changes to payment service and tests and config`, or any message ending in `Co-Authored-By: Claude ...`.

6. **Commit** with a heredoc so formatting is preserved:
   ```bash
   git commit -m "$(cat <<'EOF'
   <subject>

   <optional body>
   EOF
   )"
   ```
   Don't use `--no-verify`. If a pre-commit hook fails, fix the cause and create a new commit (don't `--amend` someone else's commit).

7. **Report** the resulting hash and subject (`git log --oneline -1`). Don't push unless the user asks for it. When pushing in the coin workspace, push only the work branch (`git push -u origin <branch>`), never `develop`/`main`.
