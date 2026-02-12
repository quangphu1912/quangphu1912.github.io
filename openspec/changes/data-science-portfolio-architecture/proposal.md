## Why

Data science professionals need a compelling online portfolio to showcase their technical capabilities to recruiters and hiring managers. A professional custom domain (e.g., yourname.org or yourname.com) significantly enhances credibility and memorability compared to github.io subdomains. This change creates a modern, economically sustainable portfolio architecture that balances visual simplicity (Apple-inspired minimalism) with technical depth, while serving as an educational foundation for understanding how modern websites work from the ground up. The stack prioritizes learning fundamentals, long-term maintainability, and minimal recurring costs (~$12-15/year for domain only).

## What Changes

- **Custom domain setup** with professional branding (e.g., yourname.org) while maintaining economic sustainability (~$12-15/year)
- **Modern, educational tech stack** built from the ground up to understand web fundamentals (HTML/CSS/JS, static site generation, DNS, deployment)
- **New static site architecture** optimized for data science content (Jupyter notebooks, ML models, visualizations)
- **Minimalist design system** following Apple's design philosophy (clean typography, generous whitespace, subtle animations)
- **Project showcase system** supporting multiple content types (notebooks, analysis reports, interactive demos)
- **Professional introduction section** combining resume/CV elements with personal branding
- **Content pipeline** for converting Jupyter notebooks and markdown analysis to web-ready formats
- **Performance optimization** for fast loading and minimal maintenance overhead
- **SEO and accessibility** features to maximize recruiter discoverability

## Capabilities

### New Capabilities

- `custom-domain`: Professional domain setup (e.g., yourname.org via Namecheap/Cloudflare) with DNS configuration for GitHub Pages, HTTPS via Let's Encrypt, and cost-effective annual renewal (~$12-15/year for .org/.com)
- `static-site-generation`: Jekyll-based static site generator with GitHub Pages deployment, built from scratch to understand SSG fundamentals, optimized for data science content with minimal build complexity
- `minimalist-design-system`: Apple-inspired design system with clean typography, generous whitespace, subtle transitions, and mobile-first responsive layouts, hand-coded to learn CSS architecture
- `project-showcase`: Flexible project display system supporting Jupyter notebooks (via nbconvert), markdown analysis, ML model demos, and data visualizations with filtering and categorization
- `professional-profile`: Resume-like introduction section with skills, experience, education, and contact information optimized for recruiter scanning
- `notebook-rendering`: Automated pipeline to convert Jupyter notebooks to styled HTML with syntax highlighting, interactive plots, and embedded outputs
- `content-management`: Simple markdown-based content system allowing easy project additions without touching core code
- `analytics-tracking`: Privacy-respecting analytics integration (Google Analytics or Plausible) to track recruiter engagement

### Modified Capabilities

<!-- No existing capabilities are being modified - this is a new portfolio site -->

## Impact

**New Infrastructure:**
- **Custom domain** (e.g., yourname.org via Namecheap or Cloudflare)
  - DNS configuration (A records, CNAME) pointing to GitHub Pages
  - HTTPS/SSL via GitHub's automatic Let's Encrypt integration
- **GitHub Pages hosting** (zero cost, automatic deployment)
- **Jekyll static site generator** with custom theme built from scratch
- **GitHub Actions** for automated notebook conversion and deployment
- **Minimal dependencies** (Ruby/Jekyll only, no complex build tooling)

**Cost Breakdown (Annual):**
- Domain registration: ~$12-15/year (.org or .com via Namecheap/Cloudflare)
- Hosting: $0 (GitHub Pages free tier)
- SSL certificate: $0 (automatic via Let's Encrypt)
- **Total: ~$12-15/year** (comparable to a Netflix subscription)

**Content Structure:**
- `_projects/` directory for project markdown files
- `_notebooks/` directory for Jupyter notebooks (auto-converted)
- `assets/` for images, datasets, and static files
- `_layouts/` and `_includes/` for reusable design components
- `CNAME` file for custom domain configuration

**Maintenance Profile:**
- **Low ongoing maintenance**: Static site requires no server management or security updates
- **Easy content updates**: Add new projects by dropping markdown/notebook files in designated folders
- **Automatic deployment**: Push to main branch triggers GitHub Actions build and deploy
- **Annual domain renewal**: Single yearly task (~$12-15)
- **Future-proof**: Can migrate to other static generators (Hugo, Next.js) if needed without losing content

**Educational Value:**
- **Learn web fundamentals**: Build HTML/CSS/JS from scratch to understand how websites work
- **Understand static site generation**: See how Jekyll transforms markdown to HTML
- **Master DNS and deployment**: Configure domain, DNS records, and GitHub Pages integration
- **Practice CI/CD**: Set up GitHub Actions for automated builds and deployments
- **Modern development workflow**: Git version control, markdown content, automated pipelines

**Target Audience Impact:**
- **Professional credibility**: Custom domain (yourname.org) signals seriousness and attention to detail
- **Memorability**: Easier for recruiters to remember and share (vs. github.io subdomain)
- **Recruiters** can quickly assess technical skills through real project examples
- **Hiring managers** can review code quality and analytical approach
- **Technical interviewers** can reference specific projects during discussions
