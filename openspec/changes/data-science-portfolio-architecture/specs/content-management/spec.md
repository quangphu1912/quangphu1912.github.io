## ADDED Requirements

### Requirement: Markdown-Based Content
The system SHALL use markdown files as primary content format for easy authoring.

#### Scenario: Project creation
- **WHEN** new project is added
- **THEN** user SHALL create markdown file in _projects directory

#### Scenario: Page creation
- **WHEN** new static page is added
- **THEN** user SHALL create markdown file in root or appropriate subdirectory

### Requirement: YAML Front Matter
The system SHALL use YAML front matter for content metadata.

#### Scenario: Required metadata
- **WHEN** content file is created
- **THEN** front matter SHALL include title, date, and layout fields

#### Scenario: Optional metadata
- **WHEN** content file is created
- **THEN** front matter MAY include description, tags, featured, thumbnail, and custom fields

#### Scenario: Front matter parsing
- **WHEN** Jekyll processes file
- **THEN** front matter SHALL be parsed and available to templates via page object

### Requirement: Content Organization
The system SHALL organize content in logical directory structure.

#### Scenario: Projects directory
- **WHEN** portfolio is organized
- **THEN** all project files SHALL be in _projects directory

#### Scenario: Notebooks directory
- **WHEN** portfolio is organized
- **THEN** all Jupyter notebooks SHALL be in _notebooks directory

#### Scenario: Static pages
- **WHEN** portfolio is organized
- **THEN** static pages (about, contact) SHALL be in root directory or _pages directory

### Requirement: Asset Management
The system SHALL organize images, datasets, and files in assets directory.

#### Scenario: Image storage
- **WHEN** images are added
- **THEN** images SHALL be stored in assets/images directory

#### Scenario: Dataset storage
- **WHEN** datasets are referenced
- **THEN** small datasets SHALL be stored in assets/data directory (or linked externally for large files)

#### Scenario: Asset referencing
- **WHEN** content references assets
- **THEN** markdown SHALL use relative paths (e.g., /assets/images/plot.png)

### Requirement: Content Versioning
The system SHALL use Git for content version control.

#### Scenario: Content history
- **WHEN** content is modified
- **THEN** Git SHALL track all changes with commit history

#### Scenario: Content rollback
- **WHEN** content needs to be reverted
- **THEN** user SHALL be able to rollback to previous version via Git

### Requirement: Draft Content
The system SHALL support draft content that is not published to live site.

#### Scenario: Draft flag
- **WHEN** content is work-in-progress
- **THEN** front matter SHALL include `published: false` or `draft: true`

#### Scenario: Draft exclusion
- **WHEN** site is built for production
- **THEN** draft content SHALL be excluded from published site

### Requirement: Content Updates
The system SHALL make content updates simple without requiring code changes.

#### Scenario: Adding new project
- **WHEN** user wants to add project
- **THEN** user SHALL only need to create markdown file in _projects directory and push to Git

#### Scenario: Updating existing content
- **WHEN** user wants to update content
- **THEN** user SHALL only need to edit markdown file and push to Git

#### Scenario: No code changes required
- **WHEN** content is added or updated
- **THEN** user SHALL NOT need to modify HTML, CSS, or JavaScript files

### Requirement: Content Portability
The system SHALL ensure content is portable to other static site generators.

#### Scenario: Standard markdown
- **WHEN** content is authored
- **THEN** content SHALL use standard markdown syntax (not Jekyll-specific extensions)

#### Scenario: Minimal Jekyll dependencies
- **WHEN** content is authored
- **THEN** content SHALL minimize use of Liquid templating in markdown files

#### Scenario: Migration readiness
- **WHEN** content needs to be migrated
- **THEN** markdown files SHALL be usable with other SSGs (Hugo, Next.js) with minimal changes

### Requirement: Content Validation
The system SHALL validate content structure before deployment.

#### Scenario: Front matter validation
- **WHEN** site is built
- **THEN** Jekyll SHALL validate YAML front matter syntax

#### Scenario: Broken link detection
- **WHEN** site is built
- **THEN** system SHOULD warn about broken internal links (optional, via plugin or CI check)

### Requirement: Content Search
The system SHALL support content search functionality (optional).

#### Scenario: Client-side search
- **WHEN** search is implemented
- **THEN** system SHALL use client-side search library (e.g., Lunr.js) to index content

#### Scenario: Search index generation
- **WHEN** site is built
- **THEN** search index SHALL be automatically generated from content metadata and body
