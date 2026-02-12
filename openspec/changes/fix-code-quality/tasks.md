## 1. Preparation

- [x] 1.1 Read design.md to understand refactoring approach
- [x] 1.2 Read specs to understand requirements for semantic CSS, components, and assets
- [x] 1.3 Create git branch feature/fix-code-quality

## 2. Fix Broken Assets

- [x] 2.1 Check if /assets/images/favicon.png exists, if not, comment out favicon link in default.html
- [x] 2.2 Check if /pdf/resume.pdf exists, if not, remove download link from index.md
- [x] 2.3 Add TODO comment in index.md for future resume.pdf: `<!-- TODO: Add resume.pdf to /pdf/ directory -->`
- [x] 2.4 Ask user for real email address
- [x] 2.5 Update _config.yml:4 with real email address

## 3. Refactor CSS

- [x] 3.1 Add "/* PAGE-SPECIFIC COMPONENTS */" section to main.css
- [x] 3.2 Extract hero section styles from index.md to main.css (create .hero-section class)
- [x] 3.3 Extract skills grid styles from index.md to main.css (create .skills-grid, .skill-category classes)
- [x] 3.4 Extract experience timeline styles from index.md to main.css (create .experience-timeline, .experience-item classes)
- [x] 3.5 Extract project card styles from projects.md to main.css (create .project-card classes)

## 4. Create Reusable Components

- [x] 4.1 Create _includes/project-card.html include file
- [x] 4.2 Define project-card.html template with parameters for project object
- [x] 4.3 Replace featured project card markup in projects.md with include tag
- [x] 4.4 Replace regular project card markup in projects.md with include tag
- [x] 4.5 Verify 90% reduction in code duplication in projects.md

## 5. Refactor Header and Footer

- [x] 5.1 Extract inline styles from header.html to main.css (create .site-nav, .nav-link classes)
- [x] 5.2 Update header.html to use semantic CSS classes
- [x] 5.3 Extract inline styles from footer.html to main.css (create .site-footer, .social-link classes)
- [x] 5.4 Update footer.html to use semantic CSS classes

## 6. Testing

- [x] 6.1 Test index.md in browser (Chrome, Firefox, Safari)
- [x] 6.2 Verify visual appearance matches original (no regressions)
- [x] 6.3 Test dark mode (prefers-color-scheme) still works
- [x] 6.4 Test keyboard navigation and focus-visible styles
- [x] 6.5 Test mobile responsiveness (viewport width 375px, 768px, 1024px)
- [x] 6.6 Test projects.md with new project-card.html include
- [x] 6.7 Verify no broken links (favicon, resume)

## 7. Documentation and Deployment

- [ ] 7.1 Commit changes with message "Refactor: Extract inline styles to semantic CSS classes"
- [ ] 7.2 Push to GitHub branch
- [ ] 7.3 Create pull request to main branch
- [ ] 7.4 Verify deployment on gh-pages
- [ ] 7.5 Delete feature branch after merge
