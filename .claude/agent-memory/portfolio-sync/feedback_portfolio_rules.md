---
name: feedback-portfolio-rules
description: Strict non-negotiable rules for every portfolio sync - violations flagged immediately
metadata:
  type: feedback
---

Rules that apply on every sync of the portfolio site (index.html):

1. No specific vendor/product names in case studies (keep generic). Tags on project cards are fine.
2. No em dashes anywhere - use hyphens only.
3. Never write "Embedded C/C++" anywhere.
4. Skills must match resume exactly.
5. All status sections use "Current Status" not "Honest Status" (portfolio_data.md uses "Honest Status" internally - that is fine, but index.html must say "Current Status").
6. Font: Plus Jakarta Sans 600 weight (not 800).
7. Never commit secrets, API keys, or credentials.
8. Preserve hidden features: Konami code (Engineer Control Room), M key (Matrix rain), E key (Engineer Mode).

**Why:** These are the owner's explicit requirements from CLAUDE.md.
**How to apply:** Run grep checks on index.html before every commit:
- grep for "Honest Status" (should be 0 hits in user-facing text)
- grep for em dashes (should be 0)
- grep for "Embedded C/C++" (should be 0)
- Verify Konami/hidden features still present (grep for "konami" should return 8+ hits)
- Verify "Current Status" count = 8 (one per project)
