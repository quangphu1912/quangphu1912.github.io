## Context

**Current State**: Portfolio has inline styles in index.md (181 lines), projects.md, header.html, and footer.html, violating DRY principles and making maintenance difficult. main.css (367 lines) has good design tokens and base components but lacks page-specific sections.

**Constraints**:
- Must maintain identical visual appearance (no breaking changes)
- Must preserve dark mode support and accessibility features
- Cannot add CSS frameworks (site uses custom CSS)
- Limited time (4-6 hours estimated)

**Stakeholders**: Portfolio owner (needs maintainability), visitors (expect consistent styling)

## Goals / Non-Goals

**Goals:**
- Extract all inline styles to semantic CSS classes in main.css
- Reduce code duplication by 90% through reusable components
- Organize main.css with clear component sections
- Improve maintainability for future styling updates
- Add missing assets (favicon, resume.pdf) or remove broken references
- Fix placeholder email in _config.yml

**Non-Goals:**
- Redesigning visual appearance (keep identical)
- Adding new CSS features or components
- Performance optimization (beyond removing inline styles)
- Changing HTML structure beyond removing style attributes

## Decisions

**CSS Architecture: Utility-First with Semantic Classes**
- **Decision**: Mix of utility classes and semantic components (not pure Tailwind-style)
- **Rationale**: Balances DRY principles with readability. Pure utility classes would clutter HTML, pure semantic classes require too many custom classes.
- **Alternative considered**: BEM (Block Element Modifier) - rejected as overkill for this site size

**Component Organization**
- **Decision**: Add new sections to main.css:
  - Page-Specific Components (hero, skills, experience, projects, contact)
  - Reusable Patterns (cards, tags, buttons already exist)
  - Layout Patterns (timeline, grid layouts)
- **Rationale**: Groups related styles, easier to find and modify
- **Alternative considered**: Separate CSS files per page - rejected as unnecessary for small site

**Missing Assets Strategy**
- **Decision**: Remove favicon reference (optional cosmetic), add TODO comment for resume.pdf
- **Rationale**: Favicon not critical, resume.pdf requires actual content to add
- **Alternative considered**: Create placeholder assets - rejected as dishonest
- **Implementation**: Comment out favicon link, add `<!-- TODO: Add resume.pdf to /pdf/ directory -->`

**Email Update**
- **Decision**: Update _config.yml:4 with real email from user
- **Rationale**: Critical for contact functionality
- **Implementation**: Ask user for real email, update immediately

**Reusable Include for Project Cards**
- **Decision**: Create _includes/project-card.html
- **Rationale**: Eliminates 90% duplication in projects.md (featured vs regular cards)
- **Template structure**: Takes project object as parameter, outputs complete card HTML

## Risks / Trade-offs

**Risk: Visual regression after extracting styles**
- **Mitigation**: Carefully copy exact inline style values to CSS classes, test in browser before committing

**Risk: Breaking dark mode or accessibility**
- **Mitigation**: Use existing CSS custom properties (--color-*), test with prefers-color-scheme and prefers-reduced-motion

**Trade-off: Initial time investment vs. long-term maintainability**
- **Analysis**: 4-6 hours now vs. 30 minutes per future styling change. Pays off after 2-3 changes.

**Risk: Missing context for semantic class names**
- **Mitigation**: Use descriptive names (hero-section, skill-category, experience-timeline) following existing patterns

## Migration Plan

1. **Prepare main.css** (30 min)
   - Add new component sections at end of file
   - Create semantic classes for each inline style pattern

2. **Update index.md** (1 hour)
   - Replace inline styles with semantic classes
   - Test visually in browser

3. **Update projects.md** (30 min)
   - Create _includes/project-card.html
   - Replace duplicated card markup with include

4. **Update header.html and footer.html** (30 min)
   - Extract navigation and footer styles to main.css
   - Replace inline styles with classes

5. **Fix broken links** (15 min)
   - Remove/comment favicon reference in default.html
   - Add TODO comment for resume.pdf
   - Update email in _config.yml

6. **Testing** (30 min)
   - Test all pages in browser (Chrome, Firefox, Safari)
   - Verify dark mode works
   - Check accessibility with keyboard navigation
   - Validate mobile responsiveness

7. **Deploy** (5 min)
   - Commit changes with message "Refactor: Extract inline styles to semantic CSS"
   - Push to GitHub, verify on gh-pages

**Rollback Strategy**: Git revert if visual issues found. No data migration, so rollback is safe.

## Open Questions

- [ ] What is the real email address for _config.yml? (ASK USER)
- [ ] Should we create actual resume.pdf or just remove link? (ASK USER)
