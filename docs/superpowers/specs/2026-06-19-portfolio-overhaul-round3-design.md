# Portfolio Overhaul — Round 3 (About + Home + Projects)

- **Date:** 2026-06-19
- **Status:** SHIPPED (2026-06) - on `main`; see git log. Durable outcomes are folded into CLAUDE.md.
- **Branch:** `feat/portfolio-overhaul-r3` (off `main`)
- **Source of truth:** real résumé at `/Users/WangFu/GitHub/projects/resume/inputs/*.tex`

## Context

Round 2 hardened the persistent shell (deployment, JSON-LD, a11y, CSS hygiene) and is live and green. This round replaces **placeholder content with the user's real background** and fixes three structural problems the user flagged:

1. The **About page** duplicates Home and reads as a flat bullet list — not appealing, "boring."
2. **Home and About both carry full experience + credentials** — redundant, two places to maintain.
3. The **project "view" is a confusing maze**: every project exists as *two* cross-linked pages (`/projects/:name/` overview + `/portfolio/:name/` deep-dive), with two listings both titled "Projects," circular "View Project" / "Deep Dive" links, and an orphan `/projects/` not in the nav.

The user's directive: collapse projects to **one** system and "make it perfect"; move the depth to About; keep Home as a fast hook.

## Key decisions (confirmed with user)

- **Positioning:** "AI & Data Engineer" — narrative = *"I build the cloud data platforms that power AI/ML."* (Bridges the pipeline-heavy real work + Bedrock/SageMaker + AI Champion award. Résumé title is "Data Scientist"; the site leads with the aspirational/hybrid framing.)
- **Experience treatment:** curated **top 3** roles with 2 metric bullets each + a one-line trajectory for the earlier arc.
- **Content location:** **Home = hook** (compressed); **About = depth** (full experience + credentials). No duplication.
- **Projects:** **one collection, one listing, one detail layout**, in the nav. Delete the entire `_portfolio/` layer.
- **Aesthetic:** **Editorial** — narrative lead, pull-quote break, alternating tinted sections, card-based experience.
- **Scope of project content:** the 3 existing projects remain **polished, internally-consistent placeholders** trimmed to a clean template. "Perfect" = excellent shell + consistent exemplars, **not** fabricated new projects.

## Real data reference (canonical copy for implementation)

### Identity / contact
- **Phu Le** — AI & Data Engineer — **Toronto, CA**
- email: `quangphu1912@gmail.com` (keep obfuscated via existing `nav.js` `data-user`/`data-domain` mechanism — never hardcode in HTML)
- LinkedIn: `quangphu1912` · GitHub: `quangphu1912`
- **No phone number** on the public site (privacy).

### Experience — top 3 (metric bullets) + trajectory
1. **Data Scientist — Bank of Montreal** (Sep 2024 – Present)
   - Designed/deployed AWS-native ETL pipelines orchestrated via **MWAA**, ingesting from RDS, Redshift, and S3 into production datamarts — **~3M records daily in ~7 min**, stable production uptime.
   - Replaced manual weekly data loading with automated scheduled pipelines; stood up data-quality monitoring for downstream AI/ML initiatives. *(Grand Ovation + Exceptional Performance Rating; ERPM AI Champion.)*
2. **Senior Financial Analyst — Bank of Montreal** (May 2022 – Sep 2024)
   - Automated capital reporting and variance analysis with **SAS + Power BI** (loan-level drill-down), cutting analysis time **~80%**; supported RWA forecasting for Canadian P&C Banking.
   - Top 10% performer FY23; two Spotlight Awards (reporting modernization, Basel III).
3. **Senior FP&A Specialist — Tiki Corp.** (Apr 2020 – Apr 2022)
   - Built profitability data pipelines with **Airflow + BigQuery** consolidating multi-source data into centralized reporting.
   - Designed Google Data Studio dashboards for e-commerce categories generating **~$150M revenue** at 20–30% growth.

**Trajectory line:** *"Started in Big-4 audit and M&A consulting at PwC and Deloitte before moving into data and analytics."* (Full history for reference only — PwC Sr Auditor Aug 2013–Nov 2015; Deloitte Sr Consultant Apr 2018–Jun 2019.)

### Credentials (with real links)
- **AWS Certified Data Engineer – Associate** (Nov 2025) — Glue, Step Functions, Kinesis, Lake Formation. Credly: https://www.credly.com/earner/earned/badge/2cbce644-127c-4ec5-8a1c-ca269f7a8ef7
- **AWS Certified Solutions Architect – Associate** (Feb 2024) — VPC, EC2, Lambda, S3, RDS. Credly: https://www.credly.com/badges/3689c0cb-2b65-4186-8524-d37a5b229029
- **CFA Charterholder** (May 2021) — top performer in Quantitative Methods, Derivatives, Economics, Asset Allocation.
- **MBA, Finance & Consulting — University of Missouri** (Aug 2016 – Dec 2017) — Monte Carlo simulation for agricultural production optimization; 3rd place, Monsanto-Olin MBA Case Competition.
- *(Award)* **ERPM AI Champion** — Credly: https://www.credly.com/badges/c9913967-d62f-4e6c-96a6-fac5f32b0393/public_url

> **Remove the fabricated "GCP Professional Data Engineer" certification everywhere.** The user does use GCP (BigQuery, Looker, Data Studio) — that is a *skill*, not a cert. Do not present it as a certification anywhere.

### Skills (résumé-aligned, 5 categories)
- **Languages:** Python, SQL, Bash
- **AWS:** S3, RDS, Redshift, SageMaker, Lambda, Glue, MWAA, Bedrock
- **Google Cloud:** BigQuery, Vertex AI, Looker, LookML, Google Data Studio
- **Data Engineering & Analytics:** Airflow, ETL/ELT Pipelines, Data Warehousing, Data Modeling, Power BI, DAX
- **Developer Tools:** Git, Linux, Neovim, tmux, CLI AI Assist (Claude Code, OpenCode)

### "At a Glance" metrics (Home stat band — all real)
- **7+** years experience
- **~3M** records / day (BMO ETL)
- **~80%** analysis time reduced (BMO reporting)
- **~$150M** revenue influenced (Tiki dashboards)
- *(4th metric is swappable — alternatives: "2× AWS certified" or "AI Champion". Default: $150M influenced.)*

---

## Workstream A — Projects: collapse to one, make it excellent

### A1. Information architecture → single layer
- **Keep** one collection: `_projects/` → `/projects/:name/` → `project.html`.
- **Delete the second layer entirely:** `_portfolio/` (incl. `_template.md`, `aws-ml-pipeline.md`, `churn-prediction.md`, `sentiment-analysis.md`), `_layouts/portfolio-item.html`, `portfolio.md`.
- **Remove the `portfolio` collection + its `defaults` entry** from `_config.yml`.
- **Nav "Projects" → `/projects/`** (currently points to `/portfolio/`); update in `_includes/header.html`.
- Grep the whole site for `/portfolio/` references (nav, footer, cards, sitemap) and repoint/remove.

### A2. Project detail layout — `project.html` (clean, single)
Structure:
```
← Back to Projects            (single link → /projects/)
[hero image + attribution]    (optional)
H1: title
one-line description · date · tags
─────
{{ content }}
─────
[← prev]                 [next →]
```
- **Remove** the "Project: View Project" cross-link (was bridging to the deleted overview).
- Keep `{% include mermaid.html %}` at the foot (mermaid stays *available*, used only where a diagram earns it).
- Reuse existing `project-detail` / `detail-*` classes; drop `case-study*` classes (only `portfolio-item.html` used them).

### A3. Project content template (the "perfect" shell)
Front matter + sections for each `_projects/*.md`:
```
---
title: "..."
description: "..."          # one line — used in card + meta
date: YYYY-MM-DD
tags: [ ... ]
image: /assets/images/projects/<name>.webp
image_alt: "..."
image_credit: "..."         # optional
image_url: "..."            # optional
# featured: true            # optional flag (future)
---

{% include attribution.html credit=page.image_credit url=page.image_url %}   # only if image_credit

## Overview            # 1 para: what it is + the headline outcome
## The Problem         # the business/technical pain (brief)
## Approach & Architecture   # how solved; optional ```mermaid```; tech choices with the WHY
## Results & Impact    # metric-led bullets (the proof)
## Tech Stack          # tag chips / inline list
## Source              # GitHub link — only when a real repo exists
```
**Cut from the placeholder deep-dives:** "Executive Summary" highlight box, "Stakeholder Pain Points / Constraints" sub-sections, week-by-week "Implementation Journey", "User Feedback" testimonial quotes, "Future Roadmap", "Lessons Learned." Real projects may re-expand sections as the work earns them.

### A4. Project listing — `projects.md`
- Hero (title + description) + **single clean card grid** (image, title, description, tags, "View Project →").
- Drop the confusing "Featured Projects / All Projects" split. (`featured` flag stays optional for future use; not rendered as a separate section now.)

### A5. Migrate the 3 placeholder projects
- One file per project in `_projects/`, holding the **trimmed deep-dive content** (the richer content currently in `_portfolio/`, cut to the A3 template).
- Reconcile the AWS filename mismatch: canonical name **`aws-pipeline`** (delete the `aws-ml-pipeline` variant).
- Remove the "## Deep Dive →" bridge from each (no second page to link to).
- **Strip any non-verified GitHub/repo links** (e.g. the `img.shields.io` badges and `github.com/quangphu1912/sentiment-analysis-ml` style links) from the placeholders — these point at repos that may not exist. Omit the `## Source` section entirely until a real repo is confirmed. (Do not fabricate repo links.)

---

## Workstream B — About: the depth page (Editorial)

Layout stays `page`. Sections, top to bottom:
1. **`{% include profile-avatar.html %}`** (existing; keeps the object-position crop fix from R2).
2. **Identity block** (prominent, styled — not necessarily an `<h1>`; page `<h1>` remains "About" for structure/SEO): **Phu Le · AI & Data Engineer · Toronto, CA** + cert chips `AWS Data Engineer` `AWS SAA` `CFA`.
3. **The Story** — 2 short paragraphs: who I am + the audit→consulting→FP&A→data-science arc. **Pull-quote:** *"I build the cloud data platforms that power AI/ML."*
4. **Experience** — 3 entries (cards) from §Experience + the trajectory line.
5. **Credentials** — 4 items with detail + Credly links (AWS DE, AWS SAA, CFA, MBA–Missouri). **No GCP cert.** (Optional: surface the ERPM AI Champion award here or in Experience.)
6. **Skills** — 5 tag clouds from §Skills.
7. **Currently** — short list, grounded in real tools: AWS Bedrock / LLM tooling, real-time ML inference, automated ML pipelines & feature stores.
8. **Let's Connect** — email · LinkedIn · GitHub (+ Toronto). No phone.

**Spacing/aesthetic (the "not boring" fix):** consistent vertical rhythm via `section` / `section-sm`; **alternate tinted sections** for rhythm; card-based experience; one pull-quote to break the flat list; `text-wrap: balance` on headings and `pretty` on prose (already in place from R2). Keep a single `<h1>`.

---

## Workstream C — Home: the hook (compressed)

`index.md` becomes a fast first screen:
1. **Hero** (`image-hero.html`) — title "Phu Le", subtitle "AI & Data Engineer", lead, **creds:** `AWS Certified Data Engineer · Solutions Architect · CFA`, `show_cta`.
2. **At a Glance** — stat band with the **real** metrics (§"At a Glance").
3. **Skills** — tag clouds (kept — recruiters skim these).
4. **Trajectory strip** — `BMO · Tiki · Deloitte · PwC — 7+ yrs` (compact, replaces the full experience section).
5. **Selected Work** — a compact projects section: heading + **up to 2 project cards** + "View all projects →". *(Included by default: after removing the Experience/Education sections, Home needs a concrete "what I've built" element, and this surfaces the Projects nav. Net length still shrinks vs. today.)*
6. **Contact** — keep `id="contact"`.

**Remove from Home** (now lives on About): the full **Experience** section and the **Education & Certifications** cert-card section.

---

## Workstream D — Config & data accuracy

- `_config.yml`:
  - `description` → drop "GCP Professional Data Engineer"; AWS-forward + accurate. Draft: *"AI & Data Engineer building production data pipelines and AI systems on AWS. AWS Certified Data Engineer & Solutions Architect, CFA. Python, SQL, cloud-native ETL, MLOps."*
  - `footer_tagline` → drop "GCP certified". Draft: *"AI & Data Engineer building production data pipelines, ML systems, and cloud-native ETL on AWS. AWS certified · CFA."*
  - `job_title` → already `"AI & Data Engineer"` (no change).
  - Remove the `portfolio` collection block + its `defaults` entry.
  - `google_cloud_profile` → **keep the field** (real Google Cloud Skills Boost profile = evidence of GCP *skills*), but present it as a skills profile, **not** a certification. Render one subtle "GCP skills profile →" link under the **Google Cloud** skill category on the About page.
- `_data/skills.yml` → restructure to the 5 résumé-aligned categories in §Skills.

---

## Workstream E — Cleanup (dead code after consolidation)

Delete / trim **only after `grep` confirms zero remaining usage**:
- `_portfolio/` (all files), `_layouts/portfolio-item.html`, `portfolio.md`.
- Dead CSS: `.case-study*`, `.executive-summary` (+ its `::before`, scoped `.metric`), `.featured-projects`, `.project-section-title`, and `.text-primary` if it was only used by the deleted "View Project" link.
- The "## Deep Dive" bridge text in `_projects/*.md`.
- Any `/portfolio/` references in nav/footer/cards.

---

## Out of scope
- Writing **real** project content (placeholders remain, cleaned & consistent).
- New nav items, new pages, notebooks collection (reserved/empty), hero-image/LCP perf pass.
- Phone number on the public site.
- Redirect plugin for the retiring `/portfolio/` URLs (low-traffic/new site; acceptable 404s).

## Verification (success criteria — WHEN/THEN)
- **WHEN** `grep -ri "GCP Professional Data Engineer" .` **THEN** zero hits.
- **WHEN** visiting `/projects/` **THEN** a single listing; **WHEN** `curl /portfolio/` and `/portfolio/<name>/` **THEN** 404.
- **WHEN** viewing a project **THEN** one page, a single "← Back to Projects" → `/projects/`, no "View Project"/"Deep Dive" cross-links.
- **WHEN** viewing About **THEN** real experience (BMO×2, Tiki), real creds (AWS DE, AWS SAA, CFA, MBA–Missouri), no GCP cert, Editorial rhythm (pull-quote + alternating sections + cards).
- **WHEN** viewing Home **THEN** real metrics (3M/day, ~80%, $150M, 7+), no full Experience/Education sections, trajectory line present.
- **WHEN** `curl /docs/superpowers/specs/<this-file>` **THEN** 404 (already excluded).
- `jekyll build` succeeds with no missing-asset warnings; single `<h1>` per page; Lighthouse a11y + SEO 100 on Home, About, a project page.

## Rollout
1. Branch `feat/portfolio-overhaul-r3` off `main` (pre-commit hook blocks direct main/develop commits).
2. Implement A→E; build + verify locally.
3. Merge → `develop` → `main` → push; confirm Actions green.
4. Live checks: Home 200, About 200, `/projects/` 200, `/portfolio/` 404, `/docs/...` 404, no "GCP Professional Data Engineer" anywhere.
