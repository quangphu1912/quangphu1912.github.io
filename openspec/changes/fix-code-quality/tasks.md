## 1. Preparation

- [ ] 1.1 Read design.md to understand refactoring approach
- [ ] 1.2 Read specs to understand requirements for semantic CSS, components, and assets
- [ ] 1.3 Create git branch feature/fix-code-quality

## 2. Fix Broken Assets

- [ ] 2.1 Check if /assets/images/favicon.png exists, if not, comment out favicon link in default.html
- [ ] 2.2 Check if /pdf/resume.pdf exists, if not, remove download link from index.md
- [ ] 2.3 Add TODO comment in index.md for future resume.pdf: `<!-- TODO: Add resume.pdf to /pdf/ directory -->`
- [ ] 2.4 Ask user for real email address
- [ ] 2.5 Update _config.yml:4 with real email address

## 3. Refactor CSS

- [ ] 3.1 Add "/* PAGE-SPECIFIC COMPONENTS */" section to main.css
- [ ] 3.2 Extract hero section styles from index.md to main.css (create .hero-section class)
- [ ] 3.3 Extract skills grid styles from index.md to main.css (create .skills-grid, .skill-category classes)
- [ ] 3.4 Extract experience timeline styles from index.md to main.css (create .experience-timeline, .experience-item classes)
- [ ] 3.5 Extract project card styles from projects.md to main.css (create .project-card classes)

## 4. Create Reusable Components

- [ ] 4.1 Create _includes/project-card.html include file
- [ ] 4.2 Define project-card.html template with parameters for project object
- [ ] 4.3 Replace featured project card markup in projects.md with include tag
- [ ] 4.4 Replace regular project card markup in projects.md with include tag
- [ ] 4.5 Verify 90% reduction in code duplication in projects.md

## 5. Refactor Header and Footer

- [ ] 5.1 Extract inline styles from header.html to main.css (create .site-nav, .nav-link classes)
- [ ] 5.2 Update header.html to use semantic CSS classes
- [ ] 5.3 Extract inline styles from footer.html to main.css (create .site-footer, .social-link classes)
- [ ] 5.4 Update footer.html to use semantic CSS classes

## 6. Testing

- [ ] 6.1 Test index.md in browser (Chrome, Firefox, Safari)
- [ ] 6.2 Verify visual appearance matches original (no regressions)
- [ ] 6.3 Test dark mode (prefers-color-scheme) still works
- [ ] 6.4 Test keyboard navigation and focus-visible styles
- [ ] 6.5 Test mobile responsiveness (viewport width 375px, 768px, 1024px)
- [ ] 6.6 Test projects.md with new project-card.html include
- [ ] 6.7 Verify no broken links (favicon, resume)

## 7. Documentation and Deployment

- [ ] 7.1 Commit changes with message "Refactor: Extract inline styles to semantic CSS classes"
- [ ] 7.2 Push to GitHub branch
- [ ] 7.3 Create pull request to main branch
- [ ] 7.4 Verify deployment on gh-pages
- [ ] 7.5 Delete feature branch after merge
