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
9. **A repo's own self-review doc (REVIEW.md/ROADMAP.md) goes stale fast on an actively-developed
   repo - don't trust its "known gaps" list without a fresh commit-log check.** Auric's `REVIEW.md`
   still said "no real tokenizer" the same day a commit replaced that exact heuristic with a real
   tokenizer. Its own "not-yet-a-product" verdict also missed that `RUNBOOK.md` (added the same
   day) documents a live Render deployment with a Postgres billing backend - the review doc and
   the runbook were written by the same project but told two different stories a few commits apart.
   Always re-run `git log`/tests immediately before writing a case study, even if a candidate
   analysis for the same repo exists from earlier the same day.
10. **When adding a new card, re-derive filter-count copy ("All (N)"), the "N shipped repositories"
    line, `CAR_KEYS`/`CAR_LABELS`, and the carousel slide/dot `id`s (`car-slide-N`, `car-dot-N`) -
    all four live in different parts of index.html and are easy to miss one of.** Verify with
    `node -e 'new Function(...)'` on the extracted `<script>` block after editing to catch
    trailing-comma/brace mistakes before committing (no build step exists to catch this otherwise).

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

## 2026-08-04 sync findings

**"Marketing site" commit pattern - do not mistake for a functional change.** 5 repos (OptimaLLM,
supply-chain-intel, ClawStreet, WayTale, and SovereignGrid via file mtimes with no git) all got a
near-identical 5-commit sequence in the 07-24 to 07-25 window: "Add project landing page" ->
"Rework landing page as a product page" -> "Add contact page, product visuals, and outcome
sections" -> "Remove repository links and public contact address" -> "Refresh product site
branding and correct figure data." Each produces `site/index.html` + `site/contact.html` - a
static, de-branded product landing page (hero, problem framing, how-it-works, comparison table,
FAQ) that deliberately strips outbound GitHub links and the public contact email. No app/backend
code was touched in any of the 5. Verify this by reading the actual rendered site files (grep for
`github`/`repository`/`mailto:`), not by trusting commit messages - and don't write a portfolio
"Current Status" update implying new capability when it's actually just a new public site.

**Auric is now the most actively-developed repo, well ahead of AurumAI/OptimaLLM.** Between
07-20 and 08-04 it gained Stripe billing, Google OAuth, a SQL-backend migration for
sessions/audit (fixing a real data-loss-on-redeploy bug - the deploy platform doesn't guarantee
persistent disk), cross-provider agent memory (new feature, billed per write), and a live Grafana
Alloy observability pipeline. Check it first/most-carefully on future syncs; AurumAI and OptimaLLM
by contrast had zero code changes this cycle (only their own marketing sites).

**Front-of-portfolio card copy can drift out of sync with the detailed case-study modal - check
both, not just the modal.** Found three cases where the CASES modal body had already been
genericized (no vendor names) in an earlier sync, but the visible `#projects` grid card (the
`project-desc` bullets, `proj-category` line, and even an `ARCH_DATA` diagram node label) still
named real vendors: QuantTradeAI ("Bloomberg-grade Terminal", "Production Bloomberg alternative",
"Claude 3.5/Gemini 2.0/GPT-4"), Supply Chain Intel ("PACCAR-style", "SAP OData v4 OAuth2, Ariba,
CDK, Manhattan, Snowflake" in a bullet), SitAware ("USGS, GDACS, NASA FIRMS, ACLED", "Claude Haiku
+ Sonnet" in a bullet). The chatbot's `PROFILE_CONTEXT` project-summary block (search for "AI /
SOFTWARE PROJECTS") had the same class of leak and was also stale (missing 5 of 13 live projects).
Grep the whole file for vendor names (`Bloomberg|Robinhood|PACCAR|SAP\b|OpenAI|Gemini|GPT-`) every
sync, not just the CASES object - tags are exempt (rule allows vendor names as tags), prose is not.
Employer/employment-history mentions (PACCAR, DAF Trucks, Cummins in About/Programs/Experience/the
resume chatbot context) are a different category - real job history, not "case study" copy - leave
those alone.

**Escaping apostrophes inside single-quoted JS template-literal strings via the Edit tool: use a
single backslash (`\'`), not a doubled one (`\\'`).** Typing `\\'` in an Edit `new_string` writes a
literal double-backslash into the file, which JS parses as an escaped backslash followed by a
string-terminating quote - silently breaks the page's inline `<script>` block with a cryptic
`Unexpected identifier` error far from the actual bug. Caught this by running a Node syntax check
on every `<script>...</script>` block extracted from index.html before committing:
`node -e "new Function(...)"` per block, or write each block to a temp file and `node --check` it
for a real line number. **Always run this check after any edit that adds an apostrophe inside a
single-quoted JS string** (contractions like "project's", "here's", "don't" inside `body:'...'`
values are the recurring trigger - this sync introduced the bug in 4 places by writing "Why This
Approach" differentiator text with contractions).

**Differentiator "Why This Approach (Honest Take)" entries were added to all 13 cards' "Key
Design Decisions" list (or equivalent first-decisions-array section) as of 2026-08-04**, per
owner request to fold in an honest "what's different / is it actually better" angle without
adding new UI structure. Future syncs that add a new project card should add one of these too,
and update existing ones if a project's honest competitive position changes materially.
