# Portfolio Images

Imagery for the site. Two kinds:
- **Home / Projects-index heroes + About avatar** - WebP/JPEG photos in `hero/`.
- **Project covers** - hand-authored SVG abstracts in `projects/`, each paired with a PNG twin for social sharing.

## Directory Structure

```
/assets/images/
├── hero/         # Page hero photos (home, projects index) + about avatar
├── projects/     # Project covers: <slug>.svg (visible) + <slug>.png (og:image)
└── favicon.svg   # Site icon
```

## How project covers actually work

Each `_projects/<slug>.md` sets two front-matter keys:
- `image:` -> the **raster** (`projects/<slug>.png`, 1200x675). Feeds `jekyll-seo-tag`'s `og:image` + BlogPosting JSON-LD. **Must be raster** - Twitter / LinkedIn / Slack silently drop SVG, so a missing/wrong PNG here means a blank share card.
- `hero_image:` -> the **SVG** (`projects/<slug>.svg`). The crisp visible image.
- `image_alt:` -> alt text (covers whichever is shown; they depict the same thing).

Templates read the visible image as `hero_image | default: image`, so `image` is the fallback when `hero_image` is absent:
- Detail hero: `_layouts/project.html` - `<img width="1200" height="675">`.
- Card thumbnail: `_includes/project-card.html` -> `image-project-card.html` - a single `<img width="800" height="450">`.

## Current files

### `hero/` - page heroes & avatar
| File | Used by | Notes |
|---|---|---|
| `hero.webp` | Home (`index.md` `image`) | WebP |
| `projects_index.webp` | Projects index (`projects.md` `image`) | WebP |
| `profile.jpg` | About avatar (`about.md` -> `profile-avatar.html`) | JPEG, `loading="eager"` |

### `projects/` - placeholder abstracts (one pair per project)
Hand-authored navy->accent-gradient SVGs (16:9, viewBox `800x450`), each with a rasterized PNG twin for og:image.
| Slug | Motif |
|---|---|
| `aws-pipeline` | pipeline flow nodes |
| `churn-prediction` | classification scatter |
| `sentiment-analysis` | sentiment wave + text bars |

## Replacing a placeholder cover (going forward)

These abstracts are placeholders - swap each for a real visual when you have one. Two paths.

### A) Real screenshot / designed cover - simplest, one file
1. Export a **1200x675 (16:9) raster** - PNG or WebP - to `projects/<slug>.png`.
2. In `_projects/<slug>.md`, set `image:` to it and **delete the `hero_image:` line**. The `| default: image` fallback shows the same raster for the visible hero, so one file covers both og:image and the visible image.
3. Update `image_alt:`.
4. Build & verify the og:image resolved to the raster:
   ```bash
   JEKYLL_ENV=production ~/.rbenv/versions/3.3.6/bin/bundle exec ~/.rbenv/versions/3.3.6/bin/jekyll build
   grep -o 'og:image[^>]*' _site/projects/<slug>/index.html
   ```

### B) Keep a crisp SVG hero + social-friendly og - two files
Use this only if you want a vector cover (scales perfectly on retina). You still need a PNG twin for og:image.
1. Author the SVG (16:9, `viewBox="0 0 800 450"`) -> `projects/<slug>.svg`.
2. Rasterize it to `projects/<slug>.png` (1200x675). **Chrome headless is the only installed rasterizer** here (no `rsvg-convert` / `magick` / `inkscape`):
   ```bash
   # build a tiny wrapper.html that centers the SVG on a 1200x675 page with the site bg, then:
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
     --hide-scrollbars --window-size=1200,675 --screenshot=projects/<slug>.png wrapper.html
   ```
3. In `_projects/<slug>.md`: `image:` -> the `.png`, `hero_image:` -> the `.svg`, `image_alt:` -> describe it.
4. Build & verify as in path A.

## Adding a brand-new project

Once `_projects/<slug>.md` exists, follow path A (one raster) or B (SVG + PNG) above.

## Notes

- No responsive `srcset` / `-800w` variants are generated - the includes render a single `<img>` at a fixed size, so there are no multi-source assets to maintain.
- `og:image` is absolute-ized by `jekyll-seo-tag` against `site.url`, so keep `image:` root-relative (e.g. `/assets/images/projects/<slug>.png`).
