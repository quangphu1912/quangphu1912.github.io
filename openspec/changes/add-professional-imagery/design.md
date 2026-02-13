## Context

**Current State**: Portfolio has functional content (case studies, GitHub repos, code samples) but lacks professional visual presentation. Current approach uses placeholder images (111-byte JPEGs) or no images at all. This signals "junior developer threw this together" rather than "senior engineer cares about craft."

**Constraints**:
- Must maintain fast loading speed (<3s on 3G)
- Unsplash images are free but require attribution (license compliance)
- Limited time for manual image editing/cropping (automation preferred)
- Must fit within existing minimalist design aesthetic (not disrupt)

**Stakeholders**: Portfolio owner (needs to attract FAANG recruiters), recruiters (spend 2-3 minutes per portfolio, need quick visual cues), future users (blog readers, collaborators)

## Goals / Non-Goals

**Goals**:
- Add professional Unsplash imagery to all major pages (home, about, projects, case studies)
- Create reusable image infrastructure (components, directory structure, optimization)
- Achieve McKinsey/BCG aesthetic quality (not gimmick, but polished professionalism)
- Improve performance (WebP, lazy loading, responsive sizing) - not just add images
- Establish documentation for consistent future image sourcing

**Non-Goals**:
- Custom photography (too expensive/time-consuming)
- Complex image editing (cropping/filters in browser - heavy, slows load)
- Image gallery/slideshow (not needed for portfolio format)
- Animated backgrounds (distracting, not McKinsey-style)
- Changing core design (images enhance, not replace, existing aesthetic)

## Decisions

### Visual Aesthetic: McKinsey/BCG Standard

**Decision**: Professional photography with abstract/conceptual subjects, geometric data visualizations, clean composition

**Rationale**:
- McKinsey/BCG use imagery to communicate expertise, not decorate
- Abstract data flows, network diagrams, team collaboration establish context
- High contrast, clean composition = professional polish
- Avoids literal screenshots (looks "demo-y") or cartoons (looks "junior")

**Examples**:
- ✅ Abstract blue network data flow (AWS pipeline)
- ✅ Professional trading floor with blue screens (sentiment analysis)
- ✅ Team collaborating at whiteboard with charts (churn prediction)
- ❌ Screenshot of Jupyter notebook (too literal)
- ❌ Cartoon robot/brain (gimmicky)

**Alternatives Considered**:
- Literal screenshots of code/dashboards - rejected: looks like bootcamp portfolio
- Abstract geometric art (Bauhaus) - rejected: doesn't communicate data science context
- Custom illustrations (Fiverr/Upwork) - rejected: expensive ($100-500 each), inconsistent quality

---

### Unsplash Integration Strategy

**Decision**: Standard front matter fields + attribution component

**Implementation**:
```yaml
---
image: /assets/images/projects/aws-ml-pipeline.jpg
image_credit: "Photo by [Name] on Unsplash"
image_alt: "Abstract data flow visualization with blue network"
image_url: "https://unsplash.com/photos/[photo-id]"
---
```

**Attribution Component** (`_includes/attribution.html`):
```liquid
{% if page.image_credit %}
<div class="attribution" style="margin-top: var(--space-2); font-size: var(--text-xs); color: var(--color-text-secondary);">
  {{ page.image_credit }}
</div>
{% endif %}
```

**Rationale**:
- Unsplash license requires attribution (free tier)
- Visible attribution on case studies (shows attention to legal detail)
- Hidden in front matter for project cards (cluttered)
- `image_url` enables photo link-back (polite, photographers appreciate it)

**Alternatives Considered**:
- No attribution (Unsplash Pro) - rejected: costs $200/month
- Visible attribution everywhere - rejected: too cluttered for project cards
- External attribution service - rejected: over-engineering

---

### Color Temperature Map

**Decision**: Theming by project type for visual consistency

| Page Type | Primary Tone | Accent | Unsplash Keywords |
|-----------|--------------|--------|-------------------|
| **AWS/Data Engineering** | Cool blues (#007AFF) | Cyan/teal | "data infrastructure", "cloud", "server", "network blue" |
| **ML/AI** | Purples (#AF52DE) | Pink/magenta | "neural network", "AI abstract", "machine learning", "brain network" |
| **Analytics/Churn/Finance** | Warm oranges (#FF9500) | Red/coral | "analytics", "business team", "customer journey", "trading floor" |
| **About/Home** | Professional blue-gray | White | "business professional", "consulting", "startup office", "modern architecture" |
| **Blog/Articles** | Neutral grays | Accent colors | "business documents", "office", "technology", "code" |

**Rationale**:
- Visual consistency helps recruiters navigate (color = content type)
- Themed colors reinforce project domain (cool = infrastructure, warm = business impact)
- McKinsey/BCG use color theming for practice areas (signals consulting-firm familiarity)

**Example**: AWS ML Pipeline project
- Search: "blue data infrastructure abstract"
- Filter: Orientation → Landscape, Color → Blue
- Download: Regular quality (1920×1280)
- Result: Professional blue server/network imagery

---

### Performance Strategy

**Decision**: WebP + PNG fallback + lazy loading + responsive srcset

**Implementation**:
```liquid
<picture>
  <source srcset="{{ page.image | replace: '.jpg', '.webp' }}" type="image/webp">
  <img src="{{ page.image }}" alt="{{ page.image_alt }}" loading="lazy" srcset="{{ page.image }} 800w, {{ page.image }} 1200w, {{ page.image }} 1920w" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw">
</picture>
```

**Tools**:
- **WebP Conversion**: `cwebp` (ImageMagick) or Squoosh CLI (10-20 files/batch)
- **Lazy Loading**: Native `loading="lazy"` attribute (supported in 90%+ browsers)
- **Responsive Sizing**: Single image → 3 sizes (800w, 1200w, 1920w) in srcset

**Rationale**:
- WebP = 70% smaller than JPEG (1920×1280: 500KB → 150KB)
- Lazy loading = defer below-fold images (initial load 40% faster)
- Responsive srcset = serve appropriate size (mobile gets 800px, not 1920px)
- PNG fallback = IE11 support (FAANG recruiters use modern browsers, but safe fallback)

**Alternatives Considered**:
- JPEG only - rejected: 70% larger, slows mobile
- JavaScript lazy loading (Lozad.js) - rejected: native is faster, smaller
- Cloudinary/Imgix CDN - rejected: overkill for personal portfolio (3-5 images/page)

---

### Directory Structure

**Decision**: Organized by content type, scalable to 50+ projects

```
/assets/images/
├── projects/           # Project thumbnails & case study features
│   ├── aws-ml-pipeline.jpg
│   ├── sentiment-analysis.jpg
│   └── churn-prediction.jpg
├── case-studies/        # Case study feature images
│   ├── aws-ml-pipeline-feature.jpg
│   └── sentiment-analysis-feature.jpg
├── hero/               # Page hero images (home, about, indices)
│   ├── home.jpg
│   ├── about.jpg
│   ├── projects-index.jpg
│   └── case-studies-index.jpg
└── context/            # Section dividers, abstract illustrations
    ├── data-flow.jpg
    └── collaboration.jpg
```

**Naming Conventions**:
- Projects: `[project-slug].jpg` (kebab-case, matches URL)
- Hero: `[page-slug].jpg` (matches page name)
- Context: `[concept].jpg` (descriptive)

**Rationale**:
- Hierarchical = scalable (can add `blog/`, `demos/` later)
- Descriptive names = no guessing what `img_001.jpg` is
- Matches URL structure = mental model aligns

**Alternatives Considered**:
- Flat structure (`/images/*.jpg`) - rejected: doesn't scale beyond 20 images
- Date-based (`/images/2024-02-*.jpg`) - rejected: portfolio not time-sensitive like blog

---

### Sourcing Workflow

**Decision**: Manual Unsplash search → Download → Optimize → Place

**Step-by-Step**:
1. **Search**: Visit https://unsplash.com, enter keywords from Color Temperature Map
2. **Filter**: Orientation → Landscape, Color → [themed color], Size → ≥ 1920×1280
3. **Download**: Click "Free Download" (Regular quality: 1920×1280, 2.5MB)
4. **Optimize**: Convert to WebP (70% smaller) + generate responsive sizes
5. **Place**: Save to `/assets/images/[directory]/[filename].jpg`
6. **Update**: Add front matter fields to page
7. **Test**: Run `bundle exec jekyll build`, verify image loads

**Tools**:
- **Unsplash**: https://unsplash.com (free account, unlimited downloads)
- **Optimization**: Squoosh app (https://squoosh.app) or ImageMagick `convert`
- **Testing**: Jekyll build + browser dev tools (Network tab)

**Time Budget**: 
- Per image: 5 minutes (search 2min + download/optimize 2min + test 1min)
- Total (15 images): 75 minutes
- First-time setup (tools, learning curve): +30 minutes
- **Total**: ~2 hours for all 15-20 images

**Rationale**:
- Manual search = better quality than automated API (can judge composition/context)
- Unsplash UI is fast (filters, instant results)
- 2 hours for site-wide polish = excellent ROI vs. weeks of custom photography

**Alternatives Considered**:
- Unsplash API (automated) - rejected: Random images, can't judge quality/composition
- Stock photo sites (Shutterstock, iStock) - rejected: Cost $10-30/image, requires subscription
- AI image generation (Midjourney, DALL-E) - rejected: Cost ($10-100), legal gray area, inconsistent quality

---

### Migration Plan

**Week 1: Image Sourcing & Optimization**

**Days 1-2**: Hero Images (4 images)
- Home: "modern office workspace professional blue"
- About: "professional portrait approachable" or "team collaboration whiteboard"
- Projects Index: "data visualization abstract blue"
- Case Studies Index: "business consulting professional"

**Days 3-4**: Project Thumbnails (6 images)
- AWS ML Pipeline: "blue data infrastructure server network"
- Sentiment Analysis: "purple neural network AI abstract"
- Churn Prediction: "orange analytics dashboard team"
- + 3 future projects (placeholders, can add later)

**Days 5**: Case Study Features (3 images)
- AWS Pipeline: "real-time data flow visualization"
- Sentiment: "financial news trading screens"
- Churn: "customer journey analytics"

**Day 6**: Context Illustrations (2-3 images)
- Section dividers: "abstract data flow", "team collaboration"

**Deliverable**:
- 15-20 optimized images placed in `/assets/images/`
- All images converted to WebP + PNG fallbacks
- Responsive sizes generated (800w, 1200w, 1920w)

---

**Week 2: Infrastructure & Integration**

**Day 1**: Directory Structure & Components
- Create `/assets/images/{projects,case-studies,hero,context}/`
- Build `_includes/image-hero.html` (hero image wrapper)
- Build `_includes/image-project-card.html` (thumbnail component)
- Build `_includes/attribution.html` (photo credit)

**Day 2**: Image Utilities (CSS)
- Add `.image-hero` class (full-width, overlay gradient)
- Add `.image-thumbnail` class (rounded, hover zoom)
- Add `.attribution` class (small, gray, legal-compliant)
- Test light/dark mode compatibility

**Day 3**: Jekyll Integration
- Update all project pages with `image`, `image_credit`, `image_alt`, `image_url`
- Update all case study pages (add attribution component)
- Update hero pages (home, about, indices)
- Add `<picture>` markup with WebP + lazy loading

**Day 4**: Testing & QA
- Run `bundle exec jekyll build` (verify no errors)
- Test locally: `bundle exec jekyll serve`
  - Check all images load (no 404s)
  - Test WebP renders (Chrome dev tools → Network)
  - Test lazy loading (scroll down, confirm load trigger)
  - Test responsive images (resize browser, confirm srcset switch)
- Cross-browser: Chrome, Firefox, Safari, Edge (ImageMagick/WebP support varies)
- Mobile test: iOS Safari, Chrome Android (lazy loading support varies)

**Day 5**: Performance Optimization
- Run Lighthouse audit (target: Performance >90)
- Optimize images that miss size budget (Squoosh re-compress)
- Verify preload for above-fold images (home, about hero)
- Check CDN (GitHub Pages) caches images

**Deliverable**:
- Image infrastructure complete (components, CSS, documentation)
- All pages updated with imagery
- Performance score >90 (Lighthouse)
- Cross-browser compatible

---

**Week 3: Polish & Documentation**

**Day 1**: Polish
- Fine-tune image selections (swap any that feel "off")
- Adjust alt text for accessibility (screen reader testing)
- Verify attribution links work (click through to Unsplash)
- Test print mode (`@media print` - hide images, show text-only)

**Day 2-3**: Documentation
- Create `/assets/images/UNSPLASH_GUIDE.md` (sourcing workflow)
- Document naming conventions (`/assets/images/README.md`)
- Add performance budgets to `add-professional-imagery/tasks.md`
- Document front matter schema (for future projects)

**Day 4**: Final QA
- Full regression: All pages load correctly, all images render
- Ask 2-3 peers for feedback (aesthetic check, loading speed)
- Verify GitHub Pages deployment (images serve from CDN)

**Day 5**: Launch
- Commit + push to GitHub
- Monitor GitHub Pages deployment (5-10 minutes)
- Post-refresh: Check live site, verify images load
- Update LinkedIn portfolio link (optional)

**Deliverable**:
- Professional, polished portfolio live
- Documentation for future maintenance
- Peer feedback incorporated

---

## Risks / Trade-offs

### Risk 1: Unsplash Rate Limiting

**Risk**: Unsplash allows 50 requests/hour (anonymous) or 5000/hour (API key). Manual browsing = fine, but automated scripts could hit limits.

**Mitigation**:
- Manual sourcing (not automated API calls)
- If using API: Register application (free tier: 50 requests/hour)
- Cache downloaded images locally (no re-fetching)

**Probability**: Low (manual sourcing)

**Impact**: Medium (would slow workflow, but not block)

---

### Risk 2: WebP Browser Support

**Risk**: IE11 and older browsers don't support WebP. Fallback to PNG increases file size.

**Mitigation**:
- `<picture>` markup with PNG fallback handles this gracefully
- Modern browsers (90%+) get WebP (70% smaller)
- Legacy browsers get PNG (slower, but functional)
- FAANG recruiters use modern browsers (Chrome, Safari, Firefox)

**Probability**: Low (technical risk, properly handled)

**Impact**: Low (legacy browser users = < 5% of traffic)

---

### Risk 3: Image Quality Inconsistency

**Risk**: Sourcing from different photographers = varying composition, quality, style.

**Mitigation**:
- Quality checklist: High contrast, clean composition, abstract/conceptual subjects
- Filter by "Large" size (≥ 1920×1280) on Unsplash
- Avoid photos with text overlays, watermarks, busy backgrounds
- If uncertain: Ask peer feedback ("Does this look professional?")

**Probability**: Medium (subjective, but manageable)

**Impact**: Medium (inconsistent quality = looks "thrown together")

---

### Risk 4: Attribution Bloat

**Risk**: Visible attribution on every page = cluttered, distracting.

**Mitigation**:
- Case studies: Visible attribution (shows legal compliance)
- Project cards: Hidden in front matter (clean UI)
- Hero pages: Optional (add if image is prominent, skip if subtle)

**Probability**: Low (design decision)

**Impact**: Low (aesthetic preference)

---

### Risk 5: Performance Regression

**Risk**: Adding images = slower page load, negates performance benefits.

**Mitigation**:
- WebP conversion (70% smaller than JPEG)
- Lazy loading below-fold images
- Responsive sizing (mobile doesn't download 1920px)
- Performance budgets (Hero < 500KB, Thumbnail < 150KB)
- Lighthouse audit (target Performance > 90)

**Probability**: Low (proactive optimization)

**Impact**: High (slow portfolio = recruiter abandons)

**Monitoring**:
- Before: Measure baseline load time (WebPageTest)
- After: Verify < 10% regression (acceptable trade-off for visual polish)

---

## Open Questions

- [ ] Should hero images have overlay gradients for text readability? (Recommend: Yes, subtle 30-50% black gradient at bottom)
- [ ] Should project thumbnails have hover effects? (Recommend: Subtle zoom 105% + shadow, not gimmicky)
- [ ] Should we add image alt text for all images (accessibility)? (Recommend: Yes, WCAG 2.1 AA compliance)
- [ ] Should we preload above-fold images (home, about hero) for perceived performance? (Recommend: Yes, `<link rel="preload">`)
