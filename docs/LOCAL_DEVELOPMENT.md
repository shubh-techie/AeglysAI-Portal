# Portal local development

Recorded 2026-10-26. The primary checkout is
`/Users/shubhprabhat/Documents/Work/AeglysAI-Portal` (the earlier `AegisAI-Portal`
path is absent). One active source server belongs to this checkout after the
post-merge transition. Other historical directories are preserved as archives,
not active development checkouts. Do not delete or repair their Git metadata blindly.

## Runtime and first setup

Node 24 is required for this workflow. `.nvmrc` selects major 24. Pinned nvm
0.40.3 is installed at `~/.nvm/nvm.sh`; Node 24.22.1 is installed under
`~/.nvm/versions/node/`. No shell profile or global Node default is changed.
Run this in each new terminal from the selected checkout:

```sh
cd /Users/shubhprabhat/Documents/Work/AeglysAI-Portal
unset npm_config_prefix
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
node --version
npm --version
```

Rider may inject `npm_config_prefix`; unset it in this terminal so nvm works.
For a fresh machine install nvm separately, then `nvm install 24`. Initial dependency
setup is `npm ci`; do not reinstall on every start. Do not run audit fix as startup.

## Ownership before operations

```sh
git status --short --branch
git rev-parse HEAD
git worktree list --porcelain
lsof -nP -iTCP:4321 -sTCP:LISTEN
# Substitute the observed listener PID:
lsof -a -p <PID> -d cwd,txt
```

Confirm the PID's cwd and executable before stopping it. Astro's `.astro/dev.json`
records PID, URL and startup time; check it against lsof rather than trusting a stale
file. Run lifecycle commands from that exact checkout. Do not kill unrelated Node
processes. One listener must bind only loopback. Never use `--force` to replace an
unidentified server or `--ignore-lock` to bypass ownership checks.

## Lifecycle

Astro 7.3.4 implements background start/status/logs/stop. These are actual Astro
subcommands, forwarded by npm; they are not a generic process manager.
`package.json` makes the strict development config the default. Production builds
continue using `astro.config.mjs`. No new dependency or daemon is needed.

```sh
# Start, after confirming port ownership/free port:
ASTRO_TELEMETRY_DISABLED=1 npm run dev -- --background
# Status:
npm run dev -- status
# Logs (background mode only; finite snapshot):
npm run dev -- logs
# Stop, from the verified owning checkout:
npm run dev -- stop
```

Restart means run stop, verify the listener is gone, then run start. If stop fails,
investigate; do not unconditionally start. There is no `restart` subcommand.
Background processes are not guaranteed to survive logout/reboot.
After login, select Node 24, inspect ownership and start or reuse the right server.
No LaunchAgent is installed or authorized.

Open http://localhost:4321/. The config uses `host: 'localhost'`, port 4321 and
Vite `strictPort: true`; a collision fails instead of falling back. Never pass a
host/port override for ordinary development. Source edits reload automatically.
`npm run preview` serves stale-until-rebuilt dist and is not the source server.

## Branch transitions

Stop the identified source server before switching branches. Preserve uncommitted
files, untracked assets and local-only commits; inspect log/status before proceeding.
After an authorized merge, on a clean primary checkout:

```sh
git fetch origin
git switch main
git merge --ff-only origin/main
git status --short --branch
git rev-parse HEAD
# Only for the next authorized task:
git switch -c feat/next-approved-task
```

A failed fast-forward or dirty checkout requires investigation, not reset/rebase.
Restart only after verifying the intended branch and source. Use one primary checkout
for ordinary tasks. Isolated forensic worktrees require explicit source identification.

## DEV-002 delivery and transition checkpoint

Main/PR #29: `5d5356aa9f45c6b8531c4f693c345ed613634066`; PR merged
2026-10-26T20:15:50Z. Pages run 40394082164 and deployment 7342530924 succeeded
for this SHA. DEV-002 is not merged. Current listener remains PID 62750,
UX-002 directory `/private/tmp/aeglysai-portal-ux-002`, Node 24.21.0; no primary
transition is claimed. Its Git link refers to the absent old primary path, so its
current branch/HEAD cannot be verified through Git. The source is preserved.
The only valid registered worktree is the renamed primary checkout.

Prepared DEV-001 files remain untouched in `/private/tmp/aeglysai-portal-dev-001`.
Original review.patch matches SHA-256
`9758163ff130c80fc8b2299f06cd1bfc21239e993e3adca99901057c997422a7`;
review-v2.patch is `51eaf7a06b49720c0a7131a2552e3f273e8c6fa231aa2dfce31f261db56bb557`.
The valid primary feature branch continues the prepared branch name at current main.
README and this guide are reconciled; historical DEV log entries are appended after
all current-main entries rather than replacing the log. Current facts supersede the
older pending-PR and obsolete-path statements in those historical snapshots.

After explicit commit/push approval, PR review and separately authorized merge:
verify main contains UX-002 and DEV-002, preserve all local work, select Node 24,
recheck PID/cwd, stop the old owned server from its cwd, then start the primary
checkout. Verify homepage, both menus, 2027 page, themes, source HMR, branch/HEAD
and listener ownership. Only then is DEV-002 complete; EVENT-002 stays blocked.
Open cache/Magicast security findings remain unchanged, without waiver.

## Verified transition — 2026-10-26

The checkpoint above is historical. PR #30 merged at
`e79ee98613a49268816b0424a1449ed342264a54`; Pages run 40396758047 succeeded for
that SHA. Under EVENT-002 Phase 1 authorization, the clean primary checkout was
fast-forwarded to this main, and only old Portal PID 62750 was stopped after verifying
its cwd/executable. The primary was started under Node 24.22.1/npm 11.19.1/Astro 7.3.4.
Eight homepage/theme/JS/no-JS cases, eight Research/Hackathon cases and an actual
source-triggered browser reload passed; source bytes/timestamps restored and Git clean.
DEV-002 local transition is complete. Historical worktree directories remain preserved.

Before creating EVENT-002, the identified primary server was stopped for the branch
switch, then restarted. The selected checkout is now this primary on
`feat/AEGLYSAI-PORTAL-EVENT-002-public-registry`, based at that merge, with managed
PID 75231 on loopback localhost:4321 at this recording. PID values are observations,
not persistent configuration: recheck `.astro/dev.json` and lsof before operations.
No additional active source checkout, LaunchAgent or unrelated process changes.

A later complete listener inventory also identified stale primary preview PID 72734
on4322, using Node23.11.0. Its cwd/command and Astro preview status were verified;
only that preview was stopped through `npm run preview -- stop`. Final Node listener
inventory shows only managed primary development PID75231 on127.0.0.1:4321.

During final EVENT-002 checks a pre-existing interactive shell (PID66135) launched
another primary `npm run preview` child, PID81615, on4322/Node23. Its command/cwd
and preview lock were verified and it was stopped through native preview stop.
No shell/IDE launcher settings were changed; manually or externally starting preview
can recreate it. Continue using only localhost:4321 for source development.

The external terminal recreated preview again (PID82310); exact command/cwd/lock
were verified before native stop. Recurrence is an observed operational limitation,
not a claim that the external launcher is disabled. The4321 source server stays75231.
