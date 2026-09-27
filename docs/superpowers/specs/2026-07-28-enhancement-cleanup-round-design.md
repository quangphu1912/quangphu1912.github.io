# Enhancement & Cleanup Round — Design Spec

- **Date:** 2026-07-28
- **Status:** SHIPPED (2026-09) - Branches 1-3 are on `main` (invisible bundle; Inter subset `8c778f0`/`fad9e26`; Mermaid dark `91e8caf`; see git log). Phase 4 owner-gated items still open. The step-by-step plan is intentionally not kept; git history is the execution log.
- **Branches:** 3 focused feature branches off `main` (see Sequencing)
- **Sources:** 4-dimension code audit (content/IA, CSS/JS health, SEO/perf/build, polish) + reconciliation by `bar-raiser` (code-verified) and `design-validator` (`frontend-design` lens)

## Context

The portfolio is a **shipped, working product** (dark-theme Jekyll, deployed via GitHub Actions to GitHub Pages). The owner's directive for this round is explicit: **"don't change the current existing working product — only enhancement and clean up is OK."**

A four-dimension audit produced ~50 candidate findings. Two independent validators (`bar-raiser` + `design-validator`) reconciled them against the directive, **verifying claims against the actual code**. The raw audit was ~50% right: **~10 items survive** as constraint-safe; the rest are cut as design-changes, false premises, or deliberate-behavior re-litigation.

## The constraint (supreme filter)

- **ALLOWED:** invisible fixes (bugs, a11y, perf bytes/requests), truth/correctness fixes to copy, dead-code/comment hygiene, SEO/meta that doesn't render visibly, and the **one** restorative fix (Mermaid) that brings code back to documented intent.
- **DISALLOWED:** new motion/texture/interaction where none exists, recomposing surfaces, new features, or anything a returning visitor perceives as a *new* design element.

## KEEP — Branch 1: invisible bundle (zero visible change)

Proposed branch: `feat/enhancement-invisible-bundle`

**A11y & correctness**
- **back-to-top anchor** — add `id="top"` to `<body>` (`_layouts/default.html`). `href="#top"` currently points to a non-existent id (relies on undefined browser behavior).
- **work-rows focus ring** — add `.work-rows .project-card:focus-within { box-shadow: none; }`. The comment at `main.css:739` claims the card focus ring is already gone; it isn't (the `:focus-within` box-shadow at `main.css:709` still applies), so keyboard focus draws a ring around the whole row.
- **footer email role** — add `role="link"` to the obfuscated `<a>` (`_includes/footer.html`). Without `href` its implicit role is `generic`, so screen readers don't announce it as a link (an `aria-label` alone doesn't restore the role).

**Truth / copy (text-only)**
- **`about.md` description** — add page-specific `description` frontmatter (currently falls back to the site-wide description).

**SEO / meta (invisible)**
- Enrich the Person JSON-LD `sameAs` with the GCP Cloud Skills Boost + Credly badge URLs already linked on About (`_layouts/default.html`).
- Dedupe `<meta name="author">` (a hand-written one + the one jekyll-seo-tag emits).
- Add `<meta name="theme-color">` matching `--color-bg`.
- Remove the empty `{% feed_meta %}` (`_layouts/default.html`) — `_posts/` is empty, so it announces a dead RSS feed in every `<head>`.

**Safe hygiene**
- Delete the dead `.work-grid` CSS (`main.css:723-724`; the listing uses `.work-rows`).
- Fix 3 stale "Inter-primary type system" comments → Hanken-primary / Inter-fallback (ToC banner + 2 inline; CLAUDE.md and the actual `--font-*` defs already moved to Hanken-primary).
- Remove GA4 `anonymize_ip: true` (`_includes/analytics.html`) — a Universal Analytics leftover, silently ignored by GA4.
- gitignore + `git rm --cached -r` the dev scaffolding that's tracked but not site source: `.agent/`, `.opencode/`, `openspec/`.

**Acceptance (WHEN/THEN)**
- WHEN a keyboard user tabs through the projects listing THEN only the focused card's link shows a ring, not the whole row.
- WHEN any visitor clicks back-to-top THEN the page scrolls to the true top.
- WHEN a screen reader reaches the footer email THEN it announces "link."
- WHEN built (`JEKYLL_ENV=production jekyll build`) THEN no Liquid errors/warnings, and a `_site/` grep confirms each meta/JSON-LD change rendered.

## KEEP — Branch 2: Inter subset (invisible perf)

Proposed branch: `feat/inter-subset`

`InterVariable.woff2` (~344 KB) is preloaded on every page's critical path, but Inter is fallback-only — Hanken Grotesk (primary) covers every glyph **except** `→` (U+2192, excluded from Hanken's `unicode-range`). So `→` genuinely needs Inter, but a 344 KB preload for a handful of glyphs is ~170× too heavy.

**Fix:** subset `InterVariable.woff2` to the few glyphs actually used site-wide (≥ `→`; enumerate the rest first), and **keep the `preload` link** (honors the no-FOUT doctrine and the Hanken→Inter fallback for those glyphs). Do **not** drop the preload outright.

**Acceptance**
- WHEN the site renders `→` THEN it uses Inter (no tofu / missing glyph), same as today.
- WHEN audited THEN the Inter payload is single-digit KB, not 344 KB.

## KEEP — Branch 3: Mermaid dark-theme fix (the ONLY visible change; restorative)

Proposed branch: `feat/mermaid-dark-theme`

Every project's Mermaid diagram has inline `style X fill:#e1f5ff / #fff4e6 / #ffe6e6 / #e6f7ff` pastel fills that **beat** the dark `themeVariables` set in `_includes/mermaid.html` — the single place the palette breaks, contradicting CLAUDE.md's "Mermaid hard-set to dark."

**Fix:** strip the inline pastel `style fill:` lines from all 3 `_projects/*.md` Mermaid blocks so the dark `themeVariables` apply. This **restores documented intent**, not a new design choice — isolated as its own branch precisely because it's the only user-visible change.

**Acceptance**
- WHEN a project diagram renders THEN node fills come from the dark theme tokens, not pastels.
- WHEN built THEN each diagram is legible on `--color-surface` (contrast verified).

## CUT — do not do (reason recorded to prevent re-proposal)

| Item | Reason |
|---|---|
| About-intro dot-grid | New texture on a surface that has none → design change |
| Masked title-rise on Projects/About | New motion where none exists → design change |
| Prev/next + "View all" arrow-slide | New motion (hover is color-only today) → design change |
| Cover-art arrival moment | New motion (cover already has parallax + breathing) → design change |
| Category legend as live filter | New feature / interaction → design change |
| Metrics-strip reframe + instrumentation | New composition + motion → design change |
| Breakpoint consolidation (640/760/767/768/1024) | Refactor churn; regression risk; no visible gain |
| rgba / font-weight → tokens | Refactor churn; regression risk; no visible gain |
| Gate Mermaid behind a `mermaid:` flag | **False premise** — all 3 projects use Mermaid; gating saves nothing |
| Remove "duplicate `.tl-label`" rule | **False premise** — only one rule exists |
| Remove `pyproject.toml` / `uv.lock` | **Not orphaned** — subject of the poetry→uv migration (commit `8844cb8`, now on `main`) |
| Drop the BI legend dot | Owner declined the visible change this round |

## Contested verdicts (both CUT, code-verified)

- **Card→cover View-Transition morph** — deliberately removed: the `main.css:1323` comment + CLAUDE.md state the cover "appeared abruptly rather than rise." Re-adding re-litigates a settled decision. **CUT.**
- **count-up pre-zero** — deliberate: `count-up.js` pre-zeros intentionally, and project memory records that "fixing" it flickers. **CUT.**

## Owner-gated (needs your call; not fabricatable)

Real résumé data is already captured in `docs/superpowers/specs/2026-06-19-portfolio-overhaul-round3-design.md`.

- **About timeline** — currently company-name-only with 2 gaps and no roles. The Round-3 spec has the real roles/dates/metrics (BMO Data Scientist 2024–, BMO Sr Financial Analyst 2022–2024, Tiki Sr FP&A 2020–2022; PwC/Deloitte trajectory). *Propose restoring from that data* — **confirm**.
- **Analytics** — `google_analytics` is blank but `privacy.md` describes a full GA4 flow. Wire a GA4 ID, or rewrite `privacy.md` to match today's reality (nothing collected)? **Your call.**
- **"FEATURED / Selected work"** — `featured:` flag is never set, so home shows all projects. Relabel to "Recent Work" (honest), or flag 1–2 projects `featured: true`? **Your call.**
- **Hero telemetry legend `RDS`** — the case study `aws-pipeline.md` describes Kinesis/Lambda, but the résumé references RDS as a real BMO source and the legend reads `S3 · RDS · Redshift · MWAA · Datamart`. Legend vs case study disagree on the canonical stack. **Which is authoritative?**
- **Twitter/X handle** — add `twitter:site` if you have one, else skip. **Your call.**

## Optional perf (owner-approved only)

- **Social-card images** — the 3 project PNGs (~400 KB each) serve only as `og:image`. Re-encoding to WebP shrinks them ~5×, but some social platforms have historically been slow to render WebP `og:image`. **Safe alternative:** losslessly re-compress the PNGs (keeps format compatibility). Either is opt-in; default is to leave as-is.

## Breakage risks & verification (Edit → Verify → Ship)

- **Inter subset** — risk: dropping a needed glyph → tofu. Mitigate by enumerating every non-Hanken glyph used site-wide *before* subsetting; render-check `→` (and any others) in `_site/`.
- **Mermaid strip** — risk: removing fills leaves nodes low-contrast. Verify each of the 3 diagrams renders with the dark `themeVariables` and passes contrast on `--color-surface`.
- **Untracking dev scaffolding** — risk: removing files collaborators expect. Use `git rm --cached -r` (keep on disk), confirm CI still builds green.
- Every branch follows the repo loop: build with `JEKYLL_ENV=production`, verify in `_site/` (grep, not source), conventional commit on the feature branch, `git checkout main && git merge --ff-only <branch> && git push origin main`, confirm the Actions run goes green.

## Sequencing

1. **Branch 1** (`feat/enhancement-invisible-bundle`) — cheapest, highest-trust, zero visible change. Ship first.
2. **Branch 2** (`feat/inter-subset`) — isolated perf win; verify glyph coverage first.
3. **Branch 3** (`feat/mermaid-dark-theme`) — the only visible change; ship last so it's cleanly reviewable.
4. Owner-gated truth/copy items slot into Branch 1 once each is confirmed.

## Success criteria

- The working product's **design is unchanged** — a returning visitor perceives no new design elements. The sole exception: Mermaid diagrams now match the dark theme, exactly as CLAUDE.md already intended.
- The site is **more honest** (no claims the work doesn't support), **faster** (Inter payload ~170× smaller), and **cleaner** (dead code gone, false premises removed).
- All three branches build green and deploy green; no regressions to any existing surface.
