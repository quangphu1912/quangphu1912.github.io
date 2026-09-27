# Docs map

What lives where, for a fresh agent (or future you):

- `../CLAUDE.md` (repo root) - **start here.** How the site is built today: architecture, patterns, gotchas. Each round's durable outcomes get folded into it.
- `superpowers/specs/` - dated **design specs**: what was chosen vs cut and why (the CUT tables stop re-proposing settled ideas). Status line at top marks shipped vs open items.
- `reference/michelle-gore/` - audit of the north-star site the design language derives from.
- Root guides (`20260212_*.md`) - local dev workflow notes (Jekyll test loop, git branch automation).
- `superpowers/plans/` - **intentionally not kept.** Step-by-step implementation plans are redundant once shipped: git history (conventional commits) is the execution log, and decisions live in the specs + CLAUDE.md.

Everything under `docs/` is excluded from the Jekyll build (`_config.yml`) - nothing here publishes.
