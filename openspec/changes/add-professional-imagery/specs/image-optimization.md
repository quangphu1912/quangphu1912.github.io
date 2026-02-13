## ADDED Requirements

### Requirement: WebP Conversion

All images MUST be converted to WebP format with PNG fallback.

#### Scenario: Convert JPEG to WebP
- **WHEN** optimizing Unsplash image (1920×1280 JPEG)
- **THEN** MUST convert to WebP using:
  - ImageMagick: `cwebp -q 80 input.jpg -o output.webp`
  - OR Squoosh app: https://squoosh.app
- **AND** MUST target 70% file size reduction (JPEG → WebP)
- **AND** MUST maintain quality ≥ 80 ( perceptual quality)

#### Scenario: Generate PNG Fallback
- **WHEN** WebP is created
- **THEN** MUST generate PNG fallback (IE11 compatibility)
- **AND** MUST use same base filename (e.g., `aws-ml-pipeline.jpg`)
- **AND** MUST NOT compress PNG below quality 85 (avoid artifacts)

#### Scenario: Responsive Image Generation
- **WHEN** WebP conversion is run
- **THEN** MUST generate 3 sizes:
  - 800w (mobile/tablet)
  - 1200w (desktop)
  - 1920w (retina)
- **AND** MUST use same quality settings across sizes
- **AND** MUST name files: `[filename]-800w.webp`, `[filename]-1200w.webp`, `[filename]-1920w.webp`

---

### Requirement: Lazy Loading Implementation

All below-fold images MUST use native lazy loading.

#### Scenario: Add Lazy Loading
- **WHEN** image is below fold (project thumbnails, case study features)
- **THEN** MUST include `loading="lazy"` attribute
- **AND** MUST NOT include `loading="lazy"` for above-fold images (home, about hero)

#### Scenario: Preload Critical Images
- **WHEN** image is above fold (home, about hero)
- **THEN** SHOULD include `<link rel="preload" as="image" href="[image-webp]" type="image/webp">`
- **AND** SHOULD preload in `<head>` for perceived performance

---

### Requirement: Picture Markup

All images MUST use `<picture>` markup for WebP/PNG fallback.

#### Scenario: Picture Markup with WebP Fallback
- **WHEN** adding image to page
- **THEN** MUST use `<picture>` markup:
  ```html
  <picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Descriptive alt text" loading="lazy">
  </picture>
  ```
- **AND** MUST include `srcset` for responsive sizes
- **AND** MUST include `sizes` attribute
- **AND** MUST include `alt` text (WCAG 2.1 AA compliance)

#### Scenario: Image Attributes
- **WHEN** image markup is added
- **THEN** MUST include `width` and `height` (prevent layout shift)
- **AND** MUST include `alt` (empty `alt=""` for decorative images)
- **AND** MUST include `loading` ("eager" for above-fold, "lazy" for below-fold)
