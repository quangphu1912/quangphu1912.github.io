# Portfolio Images

Professional Unsplash imagery for portfolio pages, organized by content type.

## Directory Structure

```
/assets/images/
├── hero/              # Page hero images (home, about, indices)
├── projects/           # Project thumbnails
├── case-studies/       # Case study feature images
└── context/            # Section dividers, illustrations
```

## Image Types

### Hero Images (`/hero/`)
- **Purpose**: Full-width background for top-level pages
- **Size**: ≥1920×1280 (16:9 aspect ratio)
- **Optimization**: WebP + JPEG fallback
- **Size Budget**: < 500KB (WebP), < 1.5MB (JPEG)

**Files**:
- `home.webp` + `home.jpg` - Home page hero
- `profile.jpg` - Profile photo for About page
- `projects-index.webp` + `projects-index.jpg` - Projects index hero
- `case-studies-index.webp` + `case-studies-index.jpg` - Case studies index hero

### Project Thumbnails (`/projects/`)
- **Purpose**: Project card thumbnails on projects index
- **Size**: ≥800×600 (4:3 aspect ratio)
- **Optimization**: WebP + JPEG fallback
- **Size Budget**: < 150KB (WebP), < 450KB (JPEG)

**Files**:
- `aws-ml-pipeline.webp` + `aws-ml-pipeline.jpg`
- `sentiment-analysis.webp` + `sentiment-analysis.jpg`
- `churn-prediction.webp` + `churn-prediction.jpg`

### Case Study Features (`/case-studies/`)
- **Purpose**: Featured images at top of case study pages
- **Size**: ≥1200×800 (3:2 aspect ratio)
- **Optimization**: WebP + JPEG fallback
- **Size Budget**: < 250KB (WebP), < 750KB (JPEG)

**Files**:
- `aws-ml-pipeline-feature.webp` + `aws-ml-pipeline-feature.jpg`
- `sentiment-analysis-feature.webp` + `sentiment-analysis-feature.jpg`
- `churn-prediction-feature.webp` + `churn-prediction-feature.jpg`

### Context Illustrations (`/context/`)
- **Purpose**: Section dividers, abstract illustrations
- **Size**: ≥1200×800
- **Optimization**: WebP + JPEG fallback
- **Size Budget**: < 200KB (WebP), < 600KB (JPEG)

**Files**:
- `data-flow.webp` + `data-flow.jpg`
- `collaboration.webp` + `collaboration.jpg`

## Naming Conventions

- **Kebab-case**: Use hyphens, not underscores or spaces
- **Descriptive**: Name should describe content (e.g., `aws-ml-pipeline.webp`)
- **Match URL**: Project images match project slug in URL
- **Lowercase**: All filenames lowercase (case-sensitive servers)

## Optimization Guidelines

### WebP Conversion
- **Quality**: 85 (good balance of size/quality)
- **Method**: 6 (slow compression, better results)
- **Target**: 70% size reduction vs JPEG

### Responsive Sizing
Generate 3 sizes for each image:
- **800w**: Mobile (max-width: 768px)
- **1200w**: Tablet (max-width: 1200px)
- **1920w**: Desktop (full-width)

### Lazy Loading
- **Above-fold**: `loading="eager"` (hero images, profile)
- **Below-fold**: `loading="lazy"` (thumbnails, features)

## Performance Targets

| Metric | Target |
|--------|--------|
| Hero WebP size | < 500KB |
| Thumbnail WebP size | < 150KB |
| Feature WebP size | < 250KB |
| Lighthouse Performance | > 90 |
| Lighthouse Speed Index | < 2s |

## Sourcing New Images

1. **Search**: Visit https://unsplash.com, use keywords from color temperature map
2. **Filter**: Orientation → Landscape, Size → Large (≥1920×1280)
3. **Download**: Click "Free Download" (Regular quality)
4. **Optimize**: Convert to WebP, generate responsive sizes
5. **Place**: Save to appropriate directory
6. **Update**: Add front matter to page
7. **Test**: Run `bundle exec jekyll build`, verify image loads

## Color Temperature Map

| Content Type | Primary Tone | Keywords |
|--------------|---------------|----------|
| AWS/Data Engineering | Cool blues | "data infrastructure", "cloud", "server", "network" |
| ML/AI | Purples | "neural network", "AI abstract", "machine learning" |
| Analytics/Finance | Warm oranges | "analytics", "business team", "trading floor" |
| About/Home | Blue-gray | "business professional", "consulting", "startup office" |

## Attribution

Unsplash requires attribution for free tier images. Include on case study pages:

```yaml
---
image: /assets/images/case-studies/aws-ml-pipeline-feature.webp
image_credit: "Photo by Photographer Name"
image_url: "https://unsplash.com/photos/[photo-id]"
---
```

Display with `{% include attribution.html credit=page.image_credit url=page.image_url %}`
