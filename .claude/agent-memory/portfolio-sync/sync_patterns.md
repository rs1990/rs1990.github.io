---
name: sync-patterns
description: Observed patterns across portfolio sync runs - what tends to change vs stay stable, plus recurring gotchas
metadata:
  type: project
---

## What changes frequently
- AurumAi and OptimaLLM: both actively developed, often in lockstep (they share an
  "Aurum-Optima" unified gateway integration - see `AURUM_OPTIMA_INTEGRATION.md` in the
  parent dir). Check both together.
- New standalone repos appear between syncs faster than they get added to the portfolio
  (SovereignGrid, ClawStreet, WayTale, Auric, loopdecipher all appeared/matured within
  weeks of each other). Always re-list local dirs, don't trust the "8 projects" framing
  in the agent's own system prompt - it is stale. See [[project_repo_mapping]].

## What stays stable
- Case study "Current Status" text - well-written, matches repo state accurately once synced.
- Architecture carousel content - stable descriptions matching actual implementations.
- Project metrics (test counts, LoC, etc.) - only change with major milestones.
- quanttradeai, SafetyEye, slm-forge, SitAware, supply-chain-intel, AetherOS, SovereignGrid,
  DocAI, cad-converter, ClaudeCosts: went a full sync cycle (07-15 to 07-20) with zero
  commits. These are the "slow" repos - check them last / cheaply (git log -1 is enough).

## Known gotchas discovered during sync
1. **QuantTradeAI tag "Robinhood API"** was wrong (fixed 2026-06-26). Project uses Alpaca, not Robinhood.
2. **git log times out** in bloomberg-terminal and some other repos - use Read on CLAUDE.md or README.md instead for status checks.
3. **AetherOS was in the portfolio but NOT in portfolio_data.md** - added in 2026-06-26 sync.
4. **Only 2 repos are public** on GitHub: aetheros and supply-chain-intel. All others are private. Use local dirs for reading.
5. **Git remotes get misconfigured/copy-pasted between repos.** Found twice now: `loopdecipher`'s
   origin points to `rs1990/aetheros.git`, and the *parent* `/Users/maverick/Desktop/Claude dev`
   directory (which portfolio_data.md lives in) also has its origin set to `rs1990/aetheros.git`.
   Always run `git remote -v` before trusting a "GitHub URL" claim from a README or from memory -
   don't push to a repo without verifying the remote actually matches the project.
6. **portfolio_data.md's parent repo should NOT be pushed** during a portfolio sync - its remote
   is the misconfigured aetheros one (gotcha #5), and it usually has unrelated dirty state from
   other projects (e.g. WayTale app files, PORTFOLIO_REVIEW.md) that aren't part of this task.
   Edit portfolio_data.md freely; leave its git state alone unless the owner asks you to fix the
   remote and commit there specifically.
7. **Validation catches real, pre-existing rule violations even on "already synced" cards** -
   2026-07-20 found a live vendor-name leak ("PACCAR-style data" in the Supply Chain Intel case
   study) and a stray `font-weight:800` on `var(--font-display)` in the BMI calculator tool, both
   pre-dating this sync. Always run the full Phase 6 grep battery (em dash, "Honest Status",
   "Embedded C", vendor names, font-weight:800) even when most cards look untouched - don't skip
   validation just because git logs show "no changes" for most repos.
8. **`AURUM_OPTIMA_INTEGRATION.md`** (parent dir) is the authoritative doc for what changed
   between AurumAI/OptimaLLM when they gain gateway-related commits - read it first before diffing
   the two repos separately, it explains the shared architecture in one place.

## Repo freshness (as of 2026-07-20)
- AurumAi, OptimaLLM: 1 new commit each since 07-15 (both 07-18, both about the unified gateway).
- Auric: brand new repo, born 07-18, 12 commits through 07-20 (today) - actively developed candidate.
- clawstreet: 1 commit since being added to index.html (07-17), no portfolio_data.md entry existed
  before this sync despite already being a live card - backfilled.
- WayTale: no new commits (last 07-02), also had no portfolio_data.md entry despite being a live
  card - backfilled.
- All other repos (quanttradeai, SafetyEye, slm-forge, SitAware, supply-chain-intel, AetherOS,
  SovereignGrid, DocAI, cad-converter, ClaudeCosts): zero commits/file changes since 07-15.

## portfolio_data.md structure
- Header with Generated + Last Synced dates.
- Project sections (16 as of 2026-07-20: 11 live-in-portfolio + Auric/Intervue candidates +
  DocAI/cad-converter/ClaudeCosts not-ready + a "Reviewed, NOT recommended" note for
  SakhiVerify/graphify-out).
- Change log at bottom, one `### YYYY-MM-DD Sync` section per run.
- Located at: /Users/maverick/Desktop/Claude dev/portfolio_data.md

**Why:** Knowing which repos are public saves time - no point trying gh api for private repos.
**How to apply:** On future syncs, start by reading portfolio_data.md header for last sync date,
then check git logs only for changes AFTER that date. Focus on local files for private repos.
Also re-grep index.html's `project-title` / `CAR_KEYS` every time to get the true current card
count before assuming anything about "8 projects."
