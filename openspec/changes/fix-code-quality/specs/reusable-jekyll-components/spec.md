## ADDED Requirements

### Requirement: Reusable Jekyll includes for duplicated markup

Identical HTML markup patterns appearing multiple times in templates SHALL be extracted into reusable Jekyll include files in the _includes/ directory.

#### Scenario: Extract project card markup
- **WHEN** projects.md contains duplicated project card HTML (featured and regular cards)
- **THEN** _includes/project-card.html MUST be created
- **AND** projects.md MUST use {% include project-card.html %} instead of duplicated markup

#### Scenario: Pass data to include
- **WHEN** project-card.html is included
- **THEN** it MUST accept a project object parameter
- **AND** MUST output complete card HTML with title, description, tags, link

#### Scenario: Reduce code duplication
- **WHEN** project-card.html is created
- **THEN** code duplication in projects.md MUST be reduced by at least 90%
- **AND** BOTH featured and regular project cards MUST use the same include

### Requirement: DRY principle for navigation elements

Navigation and footer markup SHALL be extracted into reusable includes if they contain inline styles or duplication.

#### Scenario: Extract header styles
- **WHEN** header.html contains inline styles on navigation elements
- **THEN** these styles MUST be moved to CSS classes in main.css
- **AND** header.html MUST use semantic class names

#### Scenario: Extract footer styles
- **WHEN** footer.html contains inline styles on links or layout
- **THEN** these styles MUST be moved to CSS classes in main.css
- **AND** footer.html MUST use semantic class names
