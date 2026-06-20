# Portfolio Images

Imagery for the site. The project thumbnails are **self-authored SVG abstracts**; the page heroes and avatar are **WebP/JPEG photos**.

## Directory Structure

```
/assets/images/
├── hero/         # Page hero images (home, projects index) + about avatar
├── projects/     # Project card + detail hero SVGs
└── favicon.svg   # Site icon
```

## Live Files

### `hero/` — page heroes & avatar
| File | Used by | Notes |
|---|---|---|
| `hero.webp` | Home (`index.md` `image`) | WebP |
| `projects_index.webp` | Projects index (`projects.md` `image`) | WebP |
| `profile.jpg` | About avatar (`about.md` → `profile-avatar.html`) | JPEG, `loading="eager"` |

### `projects/` — abstract data motifs (SVG)
Hand-authored, cohesive navy→accent-gradient illustrations. Used as both the card thumbnail and the detail-page hero (16:9 viewBox `800×450`).
- `aws-pipeline.svg` — pipeline flow nodes
- `churn-prediction.svg` — classification scatter
- `sentiment-analysis.svg` — sentiment wave + text bars

## Rendering

- **Project images** are served as-is (SVG branch in `_includes/image-project-card.html`; `<img>` in `_layouts/project.html` with `width="1200" height="675"`).
- **Hero images** render via `_includes/image-hero.html` (single WebP source; no `<picture>`/srcset).
- No JPEG fallbacks or `-800w` responsive variants are generated — the includes don't build srcsets, so they were removed to avoid dead assets.

## Adding a Project Image

1. Author an SVG (16:9, `viewBox="0 0 800 450"`, navy→accent palette) → save to `projects/<slug>.svg`.
2. Set `image: /assets/images/projects/<slug>.svg` + a descriptive `image_alt:` in the project's front matter.
3. Build & verify: `JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build`.
