## 1. Local Development Setup

- [x] 1.1 Install Ruby (version 2.7 or higher) on local machine
- [x] 1.2 Install Jekyll gem (`gem install jekyll bundler`)
- [x] 1.3 Initialize Jekyll site in repository (`jekyll new . --force`)
- [x] 1.4 Create Gemfile with Jekyll and GitHub Pages dependencies
- [x] 1.5 Run `bundle install` to install dependencies
- [x] 1.6 Create basic directory structure (_layouts, _includes, _projects, _notebooks, assets)
- [x] 1.7 Configure _config.yml with site metadata (title, description, author, URL)
- [ ] 1.8 Test local development server (`bundle exec jekyll serve`)
- [ ] 1.9 Verify site loads at http://localhost:4000

## 2. Minimalist Design System

- [ ] 2.1 Create assets/css/main.css with CSS custom properties for colors
- [ ] 2.2 Define typography system (font families, type scale, line heights)
- [ ] 2.3 Implement spacing system based on 8px grid
- [ ] 2.4 Create color palette with light and dark mode support (prefers-color-scheme)
- [ ] 2.5 Define responsive breakpoints (mobile <640px, tablet 640-1024px, desktop >1024px)
- [ ] 2.6 Implement CSS Grid and Flexbox layout utilities
- [ ] 2.7 Create button component styles with hover states
- [ ] 2.8 Create card component styles with subtle shadows
- [ ] 2.9 Add subtle transition animations (200-300ms ease-out)
- [ ] 2.10 Implement reduced motion support (prefers-reduced-motion)
- [ ] 2.11 Verify WCAG AA contrast ratios for all color combinations
- [ ] 2.12 Test CSS file size is under 20KB (minified)

## 3. Core Layouts and Includes

- [ ] 3.1 Create _layouts/default.html with HTML boilerplate and head section
- [ ] 3.2 Create _includes/header.html with navigation
- [ ] 3.3 Create _includes/footer.html with copyright and links
- [ ] 3.4 Create _layouts/page.html for static pages
- [ ] 3.5 Create _layouts/project.html for project detail pages
- [ ] 3.6 Add meta tags for SEO (title, description, Open Graph, Twitter Cards)
- [ ] 3.7 Link main.css in default layout head section
- [ ] 3.8 Ensure all layouts are mobile-responsive

## 4. Professional Profile (Homepage)

- [ ] 4.1 Create index.md with professional introduction section
- [ ] 4.2 Add name, professional title, and 2-3 sentence bio
- [ ] 4.3 Create skills section with categorized skill lists
- [ ] 4.4 Create experience section with work history (company, title, dates, achievements)
- [ ] 4.5 Create education section with degrees and institutions
- [ ] 4.6 Add contact information section (email, LinkedIn, GitHub links with icons)
- [ ] 4.7 Add primary CTA button (e.g., "View Projects" or "Download Resume")
- [ ] 4.8 Create downloadable PDF resume and link from homepage
- [ ] 4.9 Optimize homepage for recruiter scanning (clear headings, bullet points, whitespace)
- [ ] 4.10 Verify name, title, and CTA are above the fold on mobile and desktop

## 5. Project Showcase System

- [ ] 5.1 Configure _projects collection in _config.yml
- [ ] 5.2 Create projects.md page with project listing layout
- [ ] 5.3 Implement responsive project grid (1 column mobile, 2-3 columns desktop)
- [ ] 5.4 Add project sorting by date (newest first)
- [ ] 5.5 Implement featured projects display at top of list
- [ ] 5.6 Create project card component with thumbnail, title, description, tags
- [ ] 5.7 Implement tag-based filtering functionality
- [ ] 5.8 Create project detail page layout with full content and metadata
- [ ] 5.9 Add previous/next project navigation links
- [ ] 5.10 Add "Back to Projects" link on detail pages
- [ ] 5.11 Create 2-3 sample projects in _projects directory with YAML front matter
- [ ] 5.12 Test project listing and detail pages on mobile and desktop

## 6. Jupyter Notebook Rendering Pipeline

- [ ] 6.1 Install nbconvert (`pip install nbconvert`)
- [ ] 6.2 Create custom nbconvert template in _templates/notebook.tpl
- [ ] 6.3 Configure template to exclude default nbconvert CSS and use site CSS
- [ ] 6.4 Test manual notebook conversion (`jupyter nbconvert --to html --template notebook.tpl`)
- [ ] 6.5 Create GitHub Actions workflow file (.github/workflows/convert-notebooks.yml)
- [ ] 6.6 Configure workflow to trigger on push to _notebooks directory
- [ ] 6.7 Add nbconvert step to workflow with custom template
- [ ] 6.8 Configure workflow to commit converted HTML to repository
- [ ] 6.9 Add syntax highlighting CSS for code cells
- [ ] 6.10 Style notebook outputs (plots, tables) to match site design
- [ ] 6.11 Add MathJax or KaTeX for LaTeX equation rendering
- [ ] 6.12 Create 1-2 sample Jupyter notebooks in _notebooks directory
- [ ] 6.13 Test automated conversion workflow end-to-end

## 7. Content Management System

- [ ] 7.1 Document content creation process in README.md
- [ ] 7.2 Create example project markdown file with all YAML front matter fields
- [ ] 7.3 Create example notebook with metadata in first markdown cell
- [ ] 7.4 Organize assets in assets/images and assets/data directories
- [ ] 7.5 Implement draft content support (published: false in front matter)
- [ ] 7.6 Configure Jekyll to exclude drafts in production builds
- [ ] 7.7 Test adding new project by creating markdown file and pushing to Git
- [ ] 7.8 Verify content updates work without code changes

## 8. Custom Domain Configuration

- [ ] 8.1 Research and select domain name (yourname.org or yourname.com)
- [ ] 8.2 Purchase domain from Namecheap or Cloudflare (~$12-15/year)
- [ ] 8.3 Configure DNS A records pointing to GitHub Pages IPs (185.199.108-111.153)
- [ ] 8.4 Configure DNS CNAME record for www subdomain (username.github.io)
- [ ] 8.5 Verify DNS propagation using DNS checker tool
- [ ] 8.6 Create CNAME file in repository root with domain name
- [ ] 8.7 Enable custom domain in GitHub Pages settings
- [ ] 8.8 Wait for GitHub to provision Let's Encrypt SSL certificate
- [ ] 8.9 Enable "Enforce HTTPS" in GitHub Pages settings
- [ ] 8.10 Test site loads correctly at custom domain with HTTPS
- [ ] 8.11 Set up auto-renewal for domain registration

## 9. Analytics Integration

- [ ] 9.1 Create Google Analytics 4 account and property
- [ ] 9.2 Get GA4 measurement ID
- [ ] 9.3 Add GA4 tracking script to _includes/analytics.html
- [ ] 9.4 Configure IP anonymization in GA4 settings
- [ ] 9.5 Include analytics partial in default layout (production only)
- [ ] 9.6 Add environment check to exclude analytics in development
- [ ] 9.7 Implement event tracking for project views
- [ ] 9.8 Implement event tracking for resume downloads
- [ ] 9.9 Implement event tracking for external link clicks (LinkedIn, GitHub)
- [ ] 9.10 Create privacy policy page explaining analytics usage
- [ ] 9.11 Add privacy policy link to footer
- [ ] 9.12 Implement opt-out mechanism with localStorage
- [ ] 9.13 Verify analytics tracking works in production

## 10. SEO and Accessibility

- [ ] 10.1 Create sitemap.xml (use jekyll-sitemap plugin)
- [ ] 10.2 Create robots.txt file
- [ ] 10.3 Add Open Graph meta tags to default layout
- [ ] 10.4 Add Twitter Card meta tags to default layout
- [ ] 10.5 Ensure all images have descriptive alt text
- [ ] 10.6 Verify semantic HTML structure (proper heading hierarchy)
- [ ] 10.7 Test keyboard navigation (all interactive elements focusable)
- [ ] 10.8 Add visible focus indicators for keyboard navigation
- [ ] 10.9 Ensure touch targets are minimum 44x44px on mobile
- [ ] 10.10 Run Lighthouse audit and achieve 90+ scores (Performance, Accessibility, SEO)

## 11. Testing and Quality Assurance

- [ ] 11.1 Test site on Chrome, Safari, and Firefox
- [ ] 11.2 Test responsive design on mobile (iOS and Android)
- [ ] 11.3 Test responsive design on tablet
- [ ] 11.4 Verify all internal links work correctly
- [ ] 11.5 Verify all external links open in new tabs
- [ ] 11.6 Test project filtering functionality
- [ ] 11.7 Test notebook rendering with various content types (code, plots, tables, equations)
- [ ] 11.8 Verify dark mode switches correctly based on system preference
- [ ] 11.9 Test page load times (target <3 seconds on 3G)
- [ ] 11.10 Verify CSS file size is under 20KB
- [ ] 11.11 Test analytics tracking in production
- [ ] 11.12 Verify HTTPS works correctly on custom domain

## 12. Documentation and Launch

- [ ] 12.1 Update README.md with project overview and setup instructions
- [ ] 12.2 Document how to add new projects (markdown and notebooks)
- [ ] 12.3 Document how to update professional profile content
- [ ] 12.4 Document GitHub Actions workflow for notebook conversion
- [ ] 12.5 Document custom domain setup process
- [ ] 12.6 Create CONTRIBUTING.md if planning to accept contributions
- [ ] 12.7 Add LICENSE file (MIT or appropriate license)
- [ ] 12.8 Final review of all content for typos and accuracy
- [ ] 12.9 Share portfolio URL with professional network (LinkedIn, Twitter)
- [ ] 12.10 Set calendar reminder for annual domain renewal

## 13. Future Enhancements (Optional)

- [ ] 13.1 Add client-side search using Lunr.js
- [ ] 13.2 Implement contact form using Formspree
- [ ] 13.3 Add blog section for technical writing
- [ ] 13.4 Explore Binder or JupyterLite for interactive notebooks
- [ ] 13.5 Add reading time estimates for projects
- [ ] 13.6 Implement RSS feed for projects
- [ ] 13.7 Add project categories in addition to tags
- [ ] 13.8 Create custom 404 page
- [ ] 13.9 Add schema.org structured data for better SEO
- [ ] 13.10 Consider migrating to privacy-first analytics (Plausible/Fathom) if budget allows
