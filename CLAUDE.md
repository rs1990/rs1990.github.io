# Portfolio Site — CLAUDE.md

## What this is
Single-file portfolio site: index.html (~4,600 lines)
Owner: Raghavendra Sriram (raghu.s1211@gmail.com)

## Permissions
- No need to ask permission before reading or editing any file in this project. Proceed autonomously.

## Rules
- Never add specific vendor/product names to case studies (keep generic)
- No em dashes — use hyphens only
- No "Embedded C/C++" anywhere
- Skills must match resume exactly
- All status sections use "Current Status" not "Honest Status"
- Font: Plus Jakarta Sans 600 weight (not 800)

## Key sections
- Hero: #hero
- About: #about
- Programs: #programs (3 PM initiative cards - DAF P14, MY22-27, Cummins)
- Timeline: #experience  
- Projects: #projects (8 cards + arch carousel)
- Skills: #skills
- Downloads: #downloads (ClaudeCosts open source)
- Tools: 10 everyday tools section
- Contact: #contact

## Hidden features (keep working)
- Konami code → Engineer Control Room
- M key → Matrix rain
- E key → Engineer Mode

## Deployment
- GitHub Pages: rs1990.github.io
- Domain: raghavendrasriram.com (via Squarespace DNS)

## When updating projects
1. Run portfolio_data.md prompt against all 8 repos
2. Bring output back to Claude chat for visual updates
3. Push updated index.html via: git add . && git commit -m "update" && git push