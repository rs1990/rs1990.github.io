---
name: project-repo-mapping
description: Maps portfolio card names to local directory names and GitHub URLs for all project cards currently in index.html, plus candidate repos under review
metadata:
  type: project
---

**As of 2026-07-20 (later pass) the portfolio has 13 project cards, not 8 or 11.** Always verify
the live count/list by grepping index.html for `project-title` or `CAR_KEYS` rather than assuming
a fixed number - it has grown three times now (8 -> 9 with AetherOS -> 11 with SovereignGrid +
ClawStreet + WayTale -> 13 with Auric + Intervue) without memory being updated at the time.

| Portfolio Card (CASES key) | Local Directory | GitHub URL |
|---|---|---|
| AurumAI (`aurum`) | /Users/maverick/Desktop/Claude dev/AurumAi | https://github.com/rs1990/AurumAi |
| OptimaLLM (`optima`) | /Users/maverick/Desktop/Claude dev/OptimaLLM | https://github.com/rs1990/OptimaLLM |
| SLM Forge (`slmforge`) | /Users/maverick/Desktop/Claude dev/slm-forge | https://github.com/rs1990/slm-forge |
| QuantTradeAI (`quant`) | /Users/maverick/Desktop/Claude dev/bloomberg-terminal | https://github.com/rs1990/quanttradeai |
| SafetyEye (`safetyeye`) | /Users/maverick/Desktop/Claude dev/SafetyEye | https://github.com/rs1990/SafetyEye |
| SitAware (`sitaware`) | /Users/maverick/Desktop/Claude dev/SitAware | https://github.com/rs1990/SitAware |
| AetherOS (`aetheros`) | /Users/maverick/Desktop/Claude dev/AetherOS | https://github.com/rs1990/aetheros |
| Supply Chain Intel (`supplychain`) | /Users/maverick/Desktop/Claude dev/supply-chain-intel | https://github.com/rs1990/supply-chain-intel |
| SovereignGrid (`sovereigngrid`) | /Users/maverick/Desktop/Claude dev/SovereignGrid | no local .git (no remote) |
| ClawStreet (`clawstreet`) | /Users/maverick/Desktop/Claude dev/clawstreet | https://github.com/rs1990/clawstreet |
| WayTale (`waytale`) | /Users/maverick/Desktop/Claude dev/WayTale | https://github.com/rs1990/waytale |
| Auric (`auric`) | /Users/maverick/Desktop/Claude dev/Auric | https://github.com/rs1990/auric (private) |
| Intervue (`intervue`) | /Users/maverick/Desktop/Claude dev/loopdecipher | https://github.com/rs1990/intervue (public, created 2026-07-20) |

**Why:** The bloomberg-terminal -> quanttradeai mapping is the trickiest non-obvious one.
The local directory is named bloomberg-terminal but the GitHub repo is rs1990/quanttradeai.
Similarly, the local directory is `loopdecipher` but the portfolio card/CASES key/GitHub repo are
all `intervue` (project renamed 2026-07-17; GitHub repo `rs1990/intervue` created 2026-07-20 - the
local clone's `origin` remote is still misconfigured, pointing at `rs1990/aetheros.git`, so don't
trust `git remote -v` there for the public URL). AetherOS and SovereignGrid have no `.git` folder
locally at all (present via download/copy, not clone) - `git log` on them always fails, expected.

**How to apply:** When checking git log or reading files for QuantTradeAI, look in bloomberg-terminal.
When reading GitHub API for QuantTradeAI, use rs1990/quanttradeai. For AetherOS/SovereignGrid, use
`find -newer <ref>` against the last-sync date instead of `git log` to detect changes. For Intervue,
read source in loopdecipher/ but always link/label it as Intervue + rs1990/intervue.

**Reviewed, NOT recommended for #projects (as of 2026-07-20):**
- /Users/maverick/Desktop/Claude dev/SakhiVerify - no source code, only architecture diagrams + a "Geneva Challenge 2026" competition docx. Concept/pitch doc, not a coded project. Could fit the Systems Thinking diagram carousel instead.
- /Users/maverick/Desktop/Claude dev/graphify-out - not a project; output/cache dir of a document-conversion tool (used to convert other projects' docs to markdown for a knowledge graph).

**Still not portfolio-ready (unchanged since 2026-06-26):**
- /Users/maverick/Desktop/Claude dev/DocAI - only 25% complete
- /Users/maverick/Desktop/Claude dev/ClaudeCosts - macOS menu bar utility, not a showcase project
- /Users/maverick/Desktop/Claude dev/cad-converter - prototype with critical missing deps

**portfolio_data.md location:** /Users/maverick/Desktop/Claude dev/portfolio_data.md (parent of all repos).
Note: this file lives in a git repo (`/Users/maverick/Desktop/Claude dev`) whose remote is ALSO
misconfigured (points to rs1990/aetheros.git) - do not push there. Commit locally at most, or leave
it uncommitted and just tell the owner it needs a correct remote. See [[sync_patterns]].
