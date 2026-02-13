## ADDED Requirements

### Requirement: Directory Structure

All images MUST follow hierarchical directory structure.

#### Scenario: Organize Images by Content Type
- **WHEN** adding images to `/assets/images/`
- **THEN** MUST place in subdirectory by type:
  - `/assets/images/projects/` - Project thumbnails & case study features
  - `/assets/images/hero/` - Page hero images
  - `/assets/images/context/` - Section dividers, illustrations
- **AND** MUST NOT use flat structure (all images in root `/images/`)

#### Scenario: File Naming Conventions
- **WHEN** naming image files
- **THEN** MUST use kebab-case: `[project-slug].jpg`
- **AND** MUST match URL structure (project page = `/projects/[slug]/`)
- **AND** MUST use descriptive names for context images: `[concept].jpg`
- **AND** MUST NOT use numeric names: `img_001.jpg`, `photo1.jpg`

---

### Requirement: Python Automation Environment

Python automation scripts MUST use Poetry for dependency management.

#### Scenario: Poetry Setup
- **WHEN** setting up Python automation environment
- **THEN** MUST:
  - Create `pyproject.toml` at repository root (`/Users/WangFu/GitHub/quangphu1912.github.io/`)
  - Create `.venv/` virtual environment at repository root (NOT in subdirectories)
  - Set `package-mode = false` in `pyproject.toml` (dependency management only, not packaging)
  - Include dependencies: `requests>=2.31.0`, `Pillow>=10.0.0`
- **AND** MUST NOT:
  - Create `.venv/` in subdirectories (e.g., `/images/.venv/`)
  - Use duplicate `pyproject.new.toml` files
  - Expose API keys in source code

#### Scenario: Running Python Scripts
- **WHEN** executing Python automation scripts
- **THEN** MUST use Poetry environment:
  ```bash
  poetry run python images/unsplash_automation.py --heroes
  ```
- **AND** MUST NOT use system Python:
  ```bash
  python images/unsplash_automation.py  # WRONG
  ```

#### Scenario: Dependency Verification
- **WHEN** verifying Poetry installation
- **THEN** MUST run:
  ```bash
  poetry show                    # List installed packages
  poetry run python --version    # Verify Python 3.13.11
  poetry run python -c "import requests; import PIL; print('OK')"
  ```

---

### Requirement: Image Components

Reusable image components MUST be created for consistency.

#### Scenario: Hero Image Component
- **WHEN** building `_includes/image-hero.html`
- **THEN** MUST include:
  - Full-width container
  - Background image with overlay gradient (30-50% black at bottom for text readability)
  - Optional: Preload link for perceived performance
- **AND** MUST support both light/dark modes (test contrast)

#### Scenario: Project Thumbnail Component
- **WHEN** building `_includes/image-project-card.html`
- **THEN** MUST include:
  - Rounded corners (12px border-radius)
  - Subtle hover effect (105% zoom + shadow on hover)
  - `loading="lazy"` attribute
  - Responsive sizing (800w, 1200w, 1920w)

#### Scenario: Attribution Component
- **WHEN** building `_includes/attribution.html`
- **THEN** MUST include:
  - Small font size (var(--text-xs): 12px
  - Gray color (var(--color-text-secondary)): #6E6E73
  - Optional: Link to Unsplash photo page
- **AND** MUST only show on case studies, not project cards (reduce clutter)

---

### Requirement: Image Sizing Standards

All images MUST follow dimension standards.

#### Scenario: Hero Image Dimensions
- **WHEN** sourcing hero images
- **THEN** MUST be ≥ 2880×1620 (16:9 aspect ratio)
- **AND** SHOULD use Unsplash "Large" size (1920×1280 minimum)

#### Scenario: Project Thumbnail Dimensions
- **WHEN** sourcing project thumbnails
- **THEN** MUST be ≥ 800×600 (4:3 aspect ratio)
- **AND** SHOULD use Unsplash "Regular" size (1920×1280, auto-cropped by CSS)

#### Scenario: Case Study Feature Dimensions
- **WHEN** sourcing case study feature images
- **THEN** MUST be ≥ 1200×800 (3:2 aspect ratio)
- **AND** SHOULD use Unsplash "Large" size (1920×1280, auto-cropped by CSS)
