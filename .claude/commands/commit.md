# Commit Changes

Create a well-formatted git commit for the marine licensing journey tests project.

## Instructions

1. **Run prettier** to format all files:

   ```bash
   npx prettier --write .
   ```

2. **Run knip** to check for unused dependencies/exports:

   ```bash
   npx knip
   ```

   Fix any issues found before proceeding.

3. **Determine the ticket number**:
   - Check the current branch name for a ticket number (e.g., `ML-1124` from branch `ML-1124-lcml-tests`)
   - If not found in branch name, ask the user
   - If provided as argument, use that: $ARGUMENTS

4. **Stage the appropriate files**:
   - Use `git add <specific files>` — avoid `git add -A` or `git add .`
   - Do NOT stage `.env`, credentials, or generated files (`cucumber-report.html`, `cucumber-results.json`, `allure-results/`, `allure-report/`)

5. **Write the commit message** using this format:

   ```
   <TICKET-NUMBER> <Short summary of changes>

   - <Description of change 1>
   - <Description of change 2>
   - <Description of change 3>
   ```

   Rules:
   - First line: ticket number + short summary (under 72 characters)
   - Blank line after first line
   - Bullet points describing each meaningful change
   - Do NOT add `Co-Authored-By` lines
   - Use active voice ("Add", "Fix", "Update", "Remove")

6. **Stage, commit and push** in a single chained command:

   ```bash
   git add <specific files> && git commit -m "$(cat <<'EOF'
   ML-XXXX Short summary

   - Description of change 1
   - Description of change 2
   EOF
   )" && git push
   ```

   - If the branch has no upstream, use `git push -u origin <branch-name>` instead
   - If push is rejected (remote has new commits), run `git pull --rebase && git push`

7. **Verify** with `git log --oneline -1`

## Example

```
ML-1124 Add LCML journey test and fix flaky goBack navigation

- Add LCML apply for marine licence feature and step definitions
- Add cucumber profiles for exemption and lcml test separation
- Add npm scripts test:exemption and test:lcml
- Enable ENABLE_MARINE_LICENCE feature flag in compose.yml
- Fix flaky goBack by adding waitUntil load option
```
