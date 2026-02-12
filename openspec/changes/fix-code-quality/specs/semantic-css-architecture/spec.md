## ADDED Requirements

### Requirement: Semantic CSS class extraction

All inline styles within HTML templates and markdown content SHALL be extracted to semantic CSS class definitions in the main.css stylesheet.

#### Scenario: Extract hero section inline styles
- **WHEN** index.md contains inline style="padding: var(--space-12) 0; text-align: center;" on div.hero-section
- **THEN** main.css MUST include .hero-section { padding: var(--space-12) 0; text-align: center; }

#### Scenario: Extract skill category styles
- **WHEN** index.md contains inline style="max-width: 900px; margin: 0 auto;" on div.grid
- **THEN** main.css MUST include .skills-grid { max-width: 900px; margin: 0 auto; }

#### Scenario: Preserve dark mode compatibility
- **WHEN** inline styles use CSS custom properties like var(--color-text)
- **THEN** extracted CSS classes MUST use the same CSS custom properties
- **AND** dark mode (prefers-color-scheme) MUST continue to function

### Requirement: Component-based CSS organization

The main.css stylesheet SHALL be organized into logical component sections for page-specific elements.

#### Scenario: Add page components section
- **WHEN** main.css is refactored
- **THEN** it MUST include a new section "/* PAGE-SPECIFIC COMPONENTS */" after existing components
- **AND** MUST include subsections for hero-section, skills-section, experience-section, projects-section

#### Scenario: Organize by page hierarchy
- **WHEN** developer reads main.css
- **THEN** component styles MUST be grouped by page section (hero, skills, experience, projects)
- **AND** each section MUST be clearly labeled with a comment header

### Requirement: Maintain visual appearance

All CSS refactoring MUST maintain identical visual appearance to the existing site.

#### Scenario: Verify visual regression
- **WHEN** inline styles are extracted to CSS classes
- **THEN** the rendered page MUST appear identical to the original
- **AND** dark mode colors MUST match
- **AND** spacing and layout MUST be preserved

#### Scenario: Test accessibility features
- **WHEN** CSS classes replace inline styles
- **THEN** keyboard navigation MUST continue to work
- **AND** focus-visible styles MUST still apply
- **AND** reduced-motion preferences MUST still be respected
