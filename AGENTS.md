# AeglysAI-Portal agent instructions

## Required reading before changes

Every coding agent must:

1. Read this `AGENTS.md` first.
2. Read [docs/PROJECT_HISTORY.md](docs/PROJECT_HISTORY.md).
3. Read [docs/DEVELOPMENT_LOG.md](docs/DEVELOPMENT_LOG.md).
4. Read relevant specifications in [docs/specs/](docs/specs/README.md) and architectural decision records in [docs/adr/](docs/adr/README.md), including any more specific agent instructions in the affected directories.
5. Inspect `git status`, the current branch, and `git log` before making changes. Inspect relevant commit diffs when verifying historical claims. Existing uncommitted work must be preserved.

These files and the repository are the durable context; do not assume access to previous chat sessions. If evidence is missing, record the uncertainty instead of reconstructing events from assumptions.

## Repository scope and research integrity

This repository is the public AeglysAI research portal (formerly AegisAI), separate from the research/application repository. The portal uses Astro, TypeScript and CSS with static output. See [README.md](README.md) for routes, development commands and deployment configuration.

Clearly distinguish:

- **IMPLEMENTED**: functionality that exists, with its repository and evidence identified. Implementation does not establish research effectiveness or successful deployment.
- **PLANNED**: proposed functionality that is not implemented.
- **EXPERIMENTAL**: functionality under evaluation; do not imply validated results.
- **IN PREPARATION**: documents, papers or talks being prepared, not accepted or published work.

Models A–C are described as implemented in the separate research/application repository according to the portal's content specification; that source has not been audited here. Model D is research-implementation complete within the bounded offline experimental scope reviewed at Research commit530da21f; enforcement_authority=NONE. See src/data/modelDStatus.ts and docs/handoff/FINAL-001-RESEARCH-EVIDENCE.md; do not imply production authority, external effectiveness or commercial readiness. Never fabricate results, benchmarks, citations, publications, adoption, affiliations or project history. Preserve the distinction between a local change, a commit, a merge, a CI run and a live deployment.

## Git history and branch rules

- Never rewrite Git history.
- Never amend historical commits, including with `git commit --amend`.
- Never change historical commit dates or authors.
- Never force push, including with `--force-with-lease`.
- Do not rebase, squash or otherwise replace existing commits. Incorporate branch updates with merge commits where needed; correct mistakes with new commits.
- Work from feature branches, not directly on `main`. Continue an appropriate existing feature branch when work is already in progress; do not discard unrelated changes to create a clean branch.
- Keep one logical change per commit. Stage only files or hunks belonging to that change.
- Follow the current task's authorization for commits, pushes, pull requests, merges and deployments. A task that says “do not commit” ends with an uncommitted reviewable diff.

## Development workflow

```text
main
  -> feature branch
  -> implementation
  -> local validation
  -> commit
  -> push
  -> pull request
  -> CI
  -> merge
  -> delete feature branch
```

Start new work from an up-to-date `main` on a named feature branch. Implement a focused change, update its documentation and validate it locally. When authorized, create logical commits, push the feature branch and open a pull request. Review the diff and require successful applicable CI before merging. Use a merge method that preserves existing commits. Delete the feature branch after a verified merge and when authorized; do not delete branches containing unmerged work.

This is the required workflow, not a claim that GitHub branch protection or PR checks are already configured. At the initial documentation snapshot, the pending Pages workflow runs on `main` pushes and manual dispatch only. Pre-merge PR CI still needs to be configured; do not describe post-merge deployment checks as PR validation.

## Documentation and validation

- Update [docs/DEVELOPMENT_LOG.md](docs/DEVELOPMENT_LOG.md) when completing a meaningful task. Record the change, evidence, validation actually performed, status and remaining work. Include meaningful milestones, not every commit.
- Add or update a SPEC under `docs/specs/` when implementing significant functionality. Define scope, status, acceptance criteria and validation. See the directory guidance.
- Add an ADR under `docs/adr/` when making an important architectural decision. Record context, decision, alternatives and consequences without inventing historical rationale or approval.
- Keep [docs/PROJECT_HISTORY.md](docs/PROJECT_HISTORY.md) limited to major verified milestones. Prefer dated Git evidence. A commit date is not proof of repository visibility, release, publication or deployment.
- Append new development entries chronologically. Correct factual mistakes explicitly with evidence; do not silently convert pending work into a past success or backdate decisions.
- For code/build/deployment changes, run relevant checks from `package.json`: `npm run check`, `npm run build`, then `npm test` (tests inspect `dist/`). Use Node 24 per `.nvmrc`. For documentation-only changes, check links, paths, factual claims and `git diff --check`; a full build is not required unless the change affects it.
- Report the files changed, validation outcomes and material limitations. Never claim a test, remote CI run, merge or deployment happened without evidence. Stop temporary preview servers started for verification.
