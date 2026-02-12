## Why

The portfolio currently has extensive inline styles throughout key files (index.md, projects.md, header.html, footer.html), violating DRY principles and making maintenance difficult. This needs to be refactored into semantic CSS classes for better maintainability, consistency, and adherence to web development best practices. Additionally, there are broken links (favicon, resume.pdf) and placeholder content (email) that need immediate fixing.

## What Changes

- **Extract all inline styles** from index.md, projects.md, header.html, footer.html into main.css with semantic class names
- **Create reusable Jekyll includes** to eliminate code duplication (project-card.html)
- **Add missing assets**: favicon.png or remove reference, resume.pdf or remove download link
- **Fix placeholder email** in _config.yml to real contact email
- **Organize main.css** with dedicated sections for page-specific components (hero, skills, experience, projects)
- **Optimize CSS** with proper component structure following BEM or utility-first methodology

## Capabilities

### New Capabilities

- `semantic-css-architecture`: CSS organization with semantic class names and component-based structure
- `reusable-jekyll-components`: Template includes for common UI patterns (cards, navigation elements)
- `asset-management`: Proper handling of static assets (images, documents) with fallback strategies

### Modified Capabilities

None (this is purely internal refactoring with no spec-level behavior changes)

## Impact

- **Code files modified**: index.md, projects.md, _layouts/*.html, _includes/*.html, assets/css/main.css, _config.yml
- **New files created**: _includes/project-card.html, assets/images/favicon.png (optional), pdf/resume.pdf (optional)
- **Maintenance impact**: Reduced technical debt, easier styling updates, better code consistency
- **No breaking changes**: Visual appearance remains identical, only implementation changes
