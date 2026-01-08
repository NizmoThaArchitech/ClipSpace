# Contributing to ClipSpace

Thanks for contributing! Please follow these guidelines to keep the repo healthy.

## Branching & PRs
- Create a feature branch from `main` (e.g., `feat/login-ai-overlay`).
- Open a **Draft** PR for review and testing; convert to Ready when CI passes and reviewers approve.
- Use a clear title and follow the PR template. Include screenshots for UI changes.

## Local development
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Preview at `http://localhost:3000` and test relevant pages.

## Tests & CI
- Add unit tests where appropriate and ensure `npm test` passes.
- CI runs typecheck, lint, tests and build on PRs — address failures before merging.

## Large files & media
- Use Git LFS for large media or model weights (`*.mp4`, `*.pth`).
- Prefer storing very large assets in Releases or external storage (S3) when possible.

## Code ownership
- We use `.github/CODEOWNERS` to request automatic reviews from relevant owners. Please add reviewers when opening PRs if your change touches owned paths.

## Branch protection & merge policy
- The `main` branch is protected: PRs must have all CI checks passing (`CI / Typecheck`, `CI / Lint`, `CI / Test`, `CI / Build`) and at least one approving review. Code owner reviews are required when changes touch owned paths.
- Keep branches up-to-date with `main` (rebase or merge) so status checks can pass; the branch protection policy enforces this.
- Do not push directly to `main` — use feature branches and open Draft PRs. Prefer squash merges for a clean history.
- If you need branch protection changes or admin overrides, contact a repository admin.

Thanks — feel free to open issues or ask for guidance in PRs.