## Context

This design addresses the architecture for a data science portfolio website that showcases ML models, analysis work, and professional credentials. The site must balance three competing priorities: (1) professional credibility through custom domain and polished design, (2) economic sustainability with minimal recurring costs, and (3) educational value by building from fundamentals.

**Current State:**
- Repository exists at `quangphu1912.github.io` (GitHub Pages compatible)
- No existing portfolio infrastructure
- Target audience: recruiters, hiring managers, technical interviewers

**Constraints:**
- Budget: ~$12-15/year maximum (domain only)
- Maintenance: Minimal time investment after initial setup
- Technical learning: Must understand how each component works (no black-box frameworks)
- Content types: Jupyter notebooks, markdown analysis, ML model demonstrations

**Stakeholders:**
- Primary: Data scientist building the portfolio
- Secondary: Recruiters and hiring managers evaluating candidates

## Goals / Non-Goals

**Goals:**
- Create a professional portfolio site accessible via custom domain (e.g., yourname.org)
- Support multiple content types: Jupyter notebooks, markdown analysis, static pages
- Implement Apple-inspired minimalist design (clean typography, whitespace, subtle animations)
- Enable easy content updates without touching core code
- Provide educational foundation for understanding web development fundamentals
- Maintain total annual cost under $15 (domain registration only)
- Ensure fast load times and excellent SEO for recruiter discoverability

**Non-Goals:**
- Complex backend or database systems (static-only approach)
- Real-time interactivity or user authentication
- Content management system (CMS) with admin interface
- Support for collaborative editing or multi-author workflows
- Mobile app or native application versions
- Video hosting or streaming capabilities (use YouTube embeds if needed)

## Decisions

### 1. Static Site Generator: Jekyll

**Decision:** Use Jekyll as the static site generator.

**Rationale:**
- **Native GitHub Pages support**: Zero configuration deployment, automatic builds on push
- **Educational value**: Simple, transparent templating system (Liquid) easier to understand than React/Next.js
- **Minimal dependencies**: Ruby/Jekyll only, no complex Node.js build chains
- **Mature ecosystem**: Well-documented, stable, widely used for portfolios and blogs
- **Markdown-first**: Natural fit for data science content and Jupyter notebooks

**Alternatives Considered:**
- **Hugo**: Faster builds, but Go templating is less intuitive for beginners
- **Next.js/Gatsby**: More modern, but requires JavaScript ecosystem knowledge and more complex deployment
- **11ty**: Flexible, but smaller community and less GitHub Pages integration
- **Hand-coded HTML**: Maximum control, but repetitive and harder to maintain

**Trade-off:** Jekyll is slower than Hugo for large sites (100+ pages), but for a portfolio with <50 pages, build time is negligible (<5 seconds).

---

### 2. Hosting: GitHub Pages with Custom Domain

**Decision:** Use GitHub Pages free tier with custom domain configuration.

**Rationale:**
- **Zero hosting cost**: Free for public repositories
- **Automatic deployment**: Push to main branch triggers rebuild
- **Built-in SSL**: Free HTTPS via Let's Encrypt (automatic)
- **CDN included**: Fast global delivery via GitHub's infrastructure
- **Version control**: Git history provides backup and rollback capability

**Alternatives Considered:**
- **Netlify/Vercel**: More features (form handling, serverless functions), but unnecessary complexity for static portfolio
- **AWS S3 + CloudFront**: More control, but requires AWS knowledge and costs ~$1-3/month
- **Traditional hosting (Bluehost, etc.)**: Expensive ($5-15/month) and requires server management

**Trade-off:** GitHub Pages has some limitations (no server-side processing, 1GB size limit, 100GB/month bandwidth), but these are non-issues for a portfolio site.

---

### 3. Domain Registrar: Namecheap or Cloudflare

**Decision:** Recommend Namecheap or Cloudflare for domain registration.

**Rationale:**
- **Cost-effective**: .org/.com domains ~$12-15/year (Namecheap) or at-cost pricing (Cloudflare ~$9-10/year)
- **Simple DNS management**: Easy A record and CNAME configuration
- **No upsells**: Transparent pricing without hidden renewal costs
- **Privacy protection**: Free WHOIS privacy included

**Alternatives Considered:**
- **GoDaddy**: Higher renewal costs, aggressive upselling
- **Google Domains**: Competitive pricing, but less educational (abstracts DNS complexity)
- **Route 53**: AWS-native, but overkill for simple DNS and costs ~$0.50/month + $12/year

**Trade-off:** Cloudflare is cheapest but requires understanding their proxy vs. DNS-only modes. Namecheap is slightly more expensive but more beginner-friendly.

---

### 4. Design System: Custom CSS (No Framework)

**Decision:** Hand-code CSS from scratch, no Tailwind/Bootstrap.

**Rationale:**
- **Educational value**: Learn CSS fundamentals (flexbox, grid, custom properties, media queries)
- **Performance**: No unused CSS, minimal file size (~5-10KB vs. 50KB+ for frameworks)
- **Full control**: Apple-inspired minimalism requires custom design, not framework constraints
- **Maintainability**: Simple CSS is easier to debug than framework abstractions

**Alternatives Considered:**
- **Tailwind CSS**: Faster development, but utility-class approach obscures CSS fundamentals
- **Bootstrap**: Quick prototyping, but generic look and heavy bundle size
- **CSS-in-JS**: Modern approach, but requires JavaScript build step

**Trade-off:** Slower initial development (writing CSS from scratch), but better long-term understanding and performance.

---

### 5. Jupyter Notebook Rendering: nbconvert + Custom Styling

**Decision:** Use `nbconvert` to convert notebooks to HTML, apply custom CSS for consistent styling.

**Rationale:**
- **Automation**: GitHub Actions can run nbconvert on push
- **Preserve outputs**: Plots, tables, and results render as static HTML
- **Customization**: Override default nbconvert styles to match site design
- **No JavaScript required**: Static HTML output, fast loading

**Alternatives Considered:**
- **Jupyter Book**: Full-featured, but heavy and opinionated (Sphinx-based)
- **nbviewer embeds**: Simple, but external dependency and inconsistent styling
- **Manual HTML export**: Works, but not automated or scalable

**Trade-off:** nbconvert output can be verbose HTML. Will need custom CSS to clean up styling and remove unnecessary elements.

---

### 6. Content Organization: Markdown Front Matter + Collections

**Decision:** Use Jekyll collections for projects, standard pages for static content.

**Rationale:**
- **Separation of concerns**: Projects in `_projects/`, notebooks in `_notebooks/`, pages in root
- **Metadata via front matter**: YAML headers for title, date, tags, featured status
- **Automatic listing**: Jekyll can generate project index pages from collection metadata
- **Flexible filtering**: Can create category/tag-based views without database

**Alternatives Considered:**
- **Flat file structure**: Simpler, but harder to organize as content grows
- **Database-backed CMS**: Overkill for static site, adds complexity and cost

**Trade-off:** Jekyll collections have a learning curve, but provide better scalability than flat files.

---

### 7. Analytics: Google Analytics 4 (Privacy-Respecting Configuration)

**Decision:** Use Google Analytics 4 with IP anonymization and minimal tracking.

**Rationale:**
- **Recruiter insights**: Understand which projects get the most attention
- **Free tier**: No cost for portfolio-level traffic
- **Industry standard**: Familiar to most web developers
- **Privacy controls**: Can configure to respect Do Not Track and anonymize IPs

**Alternatives Considered:**
- **Plausible/Fathom**: Privacy-first, but costs $9-14/month (exceeds budget)
- **Self-hosted Matomo**: Free, but requires server and maintenance
- **No analytics**: Simplest, but lose valuable feedback on content performance

**Trade-off:** Google Analytics has privacy concerns. Will implement with minimal tracking and clear privacy policy.

## Risks / Trade-offs

### Risk: Jekyll Learning Curve
**Impact:** Initial setup may take longer than expected for someone new to static site generators.

**Mitigation:**
- Follow official Jekyll documentation step-by-step
- Start with minimal theme, add features incrementally
- Use Jekyll's built-in development server for rapid iteration
- Document setup process for future reference

---

### Risk: nbconvert Output Quality
**Impact:** Jupyter notebook HTML output may look inconsistent or bloated.

**Mitigation:**
- Create custom nbconvert template to control HTML structure
- Write targeted CSS to override default styles
- Test with representative notebooks before automating pipeline
- Consider manual cleanup for critical showcase projects

---

### Risk: GitHub Pages Build Limitations
**Impact:** GitHub Pages only supports specific Jekyll plugins, limiting functionality.

**Mitigation:**
- Use only whitelisted plugins or build locally and push to `gh-pages` branch
- For custom plugins, use GitHub Actions to build site and deploy
- Keep plugin usage minimal to avoid complexity

---

### Risk: Custom Domain Configuration Complexity
**Impact:** DNS setup can be confusing for beginners, potential for misconfiguration.

**Mitigation:**
- Follow GitHub's official custom domain documentation exactly
- Use DNS checker tools to verify configuration before going live
- Document each DNS record's purpose for future troubleshooting
- Start with GitHub subdomain, add custom domain after site is working

---

### Risk: Long-Term Maintenance Burden
**Impact:** Site may become outdated or broken as dependencies evolve.

**Mitigation:**
- Pin Jekyll version in `Gemfile` to avoid breaking changes
- Use GitHub Dependabot for security updates only
- Keep custom code minimal (less code = less maintenance)
- Annual review process: check for broken links, update dependencies

---

### Trade-off: Static Site Limitations
**Impact:** No dynamic features (contact forms, comments, search) without third-party services.

**Acceptance:** This is acceptable for a portfolio site. Can add:
- Contact form via Formspree (free tier)
- Comments via Disqus/Utterances (if needed, likely not)
- Search via Lunr.js (client-side) or Google Custom Search

---

### Trade-off: Manual Content Conversion
**Impact:** Adding new projects requires running nbconvert or writing markdown manually.

**Acceptance:** This is a feature, not a bug. Manual process ensures quality control and encourages thoughtful curation of portfolio projects.

## Migration Plan

### Phase 1: Local Development Setup (Week 1)
1. Install Ruby and Jekyll on local machine
2. Initialize Jekyll site in `quangphu1912.github.io` repository
3. Create basic directory structure (`_projects/`, `_notebooks/`, `assets/`)
4. Implement minimal design system (typography, colors, layout)
5. Test local development server

### Phase 2: Core Features (Week 2)
1. Build homepage with professional introduction
2. Create project showcase layout and collection
3. Implement responsive navigation and footer
4. Add first 2-3 sample projects (mix of markdown and notebook)
5. Test mobile responsiveness

### Phase 3: Notebook Pipeline (Week 3)
1. Set up nbconvert with custom template
2. Create GitHub Actions workflow for automated conversion
3. Style notebook outputs to match site design
4. Test with real Jupyter notebooks

### Phase 4: Custom Domain & Deployment (Week 4)
1. Purchase domain (Namecheap or Cloudflare)
2. Configure DNS records (A records for GitHub Pages IPs, CNAME for www)
3. Add `CNAME` file to repository
4. Enable HTTPS in GitHub Pages settings
5. Verify SSL certificate and domain resolution

### Phase 5: Polish & Launch (Week 5)
1. Add Google Analytics with privacy configuration
2. Implement SEO meta tags (Open Graph, Twitter Cards)
3. Create `sitemap.xml` and `robots.txt`
4. Final design polish (animations, hover states)
5. Cross-browser testing (Chrome, Safari, Firefox)
6. Launch and share with network

### Rollback Strategy
- **Git history**: Can revert to any previous commit
- **GitHub Pages**: Can switch back to `username.github.io` subdomain instantly
- **Domain**: Can point DNS to different hosting provider if needed
- **Content**: All markdown and notebooks are portable to other static generators

## Open Questions

1. **Domain name preference**: What domain should we register? (e.g., yourname.org, yourname.com, yourname.dev)
   - **Decision needed by**: Before Phase 4

2. **Project categorization**: Should projects be tagged by skill (ML, data viz, etc.) or by domain (healthcare, finance, etc.)?
   - **Decision needed by**: Before Phase 2

3. **Notebook interactivity**: Should we explore Binder/JupyterLite for interactive notebooks, or keep everything static?
   - **Decision needed by**: Phase 3 (can defer if static is sufficient)

4. **Resume format**: Should resume/CV be a separate PDF download, inline HTML, or both?
   - **Decision needed by**: Before Phase 2

5. **Blog section**: Is a blog needed for technical writing, or should all content be project-focused?
   - **Decision needed by**: Phase 2 (can add later if desired)
