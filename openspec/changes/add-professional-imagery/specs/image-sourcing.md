## ADDED Requirements

### Requirement: Unsplash Image Sourcing

All professional imagery MUST be sourced from Unsplash following standardized workflow.

#### Scenario: Search and Download Unsplash Images
- **WHEN** sourcing images for portfolio
- **THEN** MUST visit https://unsplash.com
- **AND** MUST search using keywords from Color Temperature Map
- **AND** MUST filter by Orientation → Landscape
- **AND** MUST filter by Color → themed color (blue/purple/orange/gray)
- **AND** MUST verify Size → Large (≥ 1920×1280)
- **AND** MUST download Regular quality (1920×1280)

#### Scenario: Verify Image Quality
- **WHEN** selecting Unsplash image
- **THEN** MUST meet quality criteria:
  - High contrast (light/dark areas clearly distinguished)
  - Clean composition (not chaotic/cluttered)
  - Abstract/conceptual subject (data flow, network, collaboration)
  - No text overlays or watermarks
  - Professional photography (well-lit, in focus)

#### Scenario: Download and Optimize
- **WHEN** downloading Unsplash image
- **THEN** MUST download Regular quality (1920×1280, ~2.5MB)
- **AND** MUST convert to WebP (target: 70% size reduction)
- **AND** MUST generate PNG fallback (IE11 compatibility)
- **AND** MUST generate responsive sizes: 800w, 1200w, 1920w
- **AND** MUST place in `/assets/images/[directory]/[filename].webp` and `.jpg`

---

### Requirement: Front Matter Schema

All pages with images MUST include standardized front matter fields.

#### Scenario: Add Image Front Matter to Pages
- **WHEN** page includes image
- **THEN** MUST include `image: /assets/images/[directory]/[filename].jpg`
- **AND** SHOULD include `image_credit: "Photo by [Name] on Unsplash"`
- **AND** SHOULD include `image_alt: "[Descriptive alt text for accessibility]"`
- **AND** SHOULD include `image_url: "https://unsplash.com/photos/[photo-id]"`

#### Scenario: Image Attribution Requirements
- **WHEN** image is case study feature or hero image
- **THEN** MUST include visible attribution (via `_includes/attribution.html`)
- **WHEN** image is project card thumbnail
- **THEN** MAY hide attribution in front matter (visible = cluttered)
- **AND** MUST always include `image_credit` in front matter (legal compliance)

---

### Requirement: Performance Budgets

All images MUST meet size budgets to maintain fast page loads.

#### Scenario: Hero Image Size Budget
- **WHEN** hero image is used (home, about, indices)
- **THEN** WebP version MUST be < 500KB
- **AND** PNG fallback MUST be < 1.5MB

#### Scenario: Project Thumbnail Size Budget
- **WHEN** project thumbnail is used (project cards)
- **THEN** WebP version MUST be < 150KB
- **AND** PNG fallback MUST be < 450KB

#### Scenario: Case Study Feature Image Size Budget
- **WHEN** case study feature image is used
- **THEN** WebP version MUST be < 250KB
- **AND** PNG fallback MUST be < 750KB

#### Scenario: Responsive Sizing
- **WHEN** image markup is added
- **THEN** MUST include `srcset` with 800w, 1200w, 1920w sizes
- **AND** MUST include `sizes` attribute for responsive selection
- **AND** MUST include `loading="lazy"` for below-fold images
