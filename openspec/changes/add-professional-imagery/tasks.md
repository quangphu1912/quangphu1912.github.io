## 1. Week 1: Image Sourcing & Optimization (Days 1-6)

### 1.1 Hero Images (Days 1-2)
- [x] 1.1.1 Setup Poetry environment
  - Verify `pyproject.toml` at repository root
  - Verify `.venv/` at repository root (NOT in subdirectories)
  - Install dependencies: `poetry install`
  - Verify: `poetry run python -c "import requests; import PIL; print('OK')"`
- [x] 1.1.2 Search Unsplash for Home hero image
  - Keywords: "modern office workspace professional blue", "consulting office clean", "startup workspace"
  - Filter: Orientation → Landscape, Color → Blue-gray, Size → Large (≥1920×1280)
  - Download: Regular quality (1920×1280)
- [x] 1.1.3 Search Unsplash for About hero image
  - Keywords: "professional portrait approachable", "team collaboration whiteboard", "data scientist professional"
  - Filter: Orientation → Landscape, Color → Blue-gray, Size → Large
  - Download: Regular quality
- [x] 1.1.4 Search Unsplash for Projects Index hero image
  - Keywords: "data visualization abstract blue", "analytics dashboard professional", "network data flow"
  - Filter: Orientation → Landscape, Color → Blue, Size → Large
  - Download: Regular quality
- [x] 1.1.5 Search Unsplash for Case Studies Index hero image
  - Keywords: "business consulting professional", "strategy meeting", "presentation analytics"
  - Filter: Orientation → Landscape, Color → Blue-gray, Size → Large
  - Download: Regular quality
- [x] 1.1.6 Optimize hero images
  - Convert to WebP (target: 70% size reduction)
  - Generate JPEG fallbacks
  - Generate responsive sizes: 800w, 1200w, 1920w
  - Verify WebP < 500KB, JPEG < 1.5MB
- [x] 1.1.7 Place hero images in `/assets/images/hero/`
  - Rename: `home.webp`, `about.webp`, `projects-index.webp`, `case-studies-index.webp`
  - Copy JPEG fallbacks: `home.jpg`, `about.jpg`, etc.
- [x] 1.1.8 Test hero image download automation
  - Run: `poetry run python images/unsplash_automation.py --heroes`
  - Verify 4 images downloaded to `/assets/images/hero/`
  - Verify `.json` metadata files created

### 1.2 Project Thumbnails (Days 3-4)
- [x] 1.2.1 AWS ML Pipeline thumbnail
  - Keywords: "blue data infrastructure server network", "cloud computing abstract", "server room blue"
  - Filter: Orientation → Landscape, Color → Blue, Size → Regular (1920×1280)
  - Download, optimize, place as `/assets/images/projects/aws-ml-pipeline.webp`
- [x] 1.2.2 Sentiment Analysis thumbnail
  - Keywords: "purple neural network AI abstract", "machine learning brain network", "AI abstract purple"
  - Filter: Orientation → Landscape, Color → Purple, Size → Regular
  - Download, optimize, place as `/assets/images/projects/sentiment-analysis.webp`
- [x] 1.2.3 Churn Prediction thumbnail
  - Keywords: "orange analytics dashboard team", "business analytics collaboration", "customer journey data"
  - Filter: Orientation → Landscape, Color → Orange, Size → Regular
  - Download, optimize, place as `/assets/images/projects/churn-prediction.webp`
- [x] 1.2.4 Future project thumbnails (placeholders for future work)
  - Download 3 placeholder images for future projects
  - Optimize, place in `/assets/images/projects/`
- [x] 1.2.5 Optimize all project thumbnails
  - Verify WebP < 150KB, JPEG < 450KB
  - Test responsive sizing (800w, 1200w, 1920w)
- [x] 1.2.6 Test project thumbnail download automation
  - Run: `poetry run python images/unsplash_automation.py --thumbnails`
  - Verify 3 images downloaded to `/assets/images/projects/`
  - Verify `.json` metadata files created

### 1.3 Case Study Features (Day 5)
- [x] 1.3.1 AWS Pipeline case study feature image
  - Keywords: "real-time data flow visualization", "data stream abstract blue", "pipeline architecture"
  - Download, optimize, place as `/assets/images/case-studies/aws-ml-pipeline-feature.webp`
- [x] 1.3.2 Sentiment Analysis case study feature image
  - Keywords: "financial news trading screens", "stock market trading floor", "bloomberg terminal"
  - Download, optimize, place as `/assets/images/case-studies/sentiment-analysis-feature.webp`
- [x] 1.3.3 Churn Prediction case study feature image
  - Keywords: "customer journey analytics", "churn funnel visualization", "retention analytics dashboard"
  - Download, optimize, place as `/assets/images/case-studies/churn-prediction-feature.webp`
- [x] 1.3.4 Optimize case study features
  - Verify WebP < 250KB, JPEG < 750KB
- [x] 1.3.5 Test case study feature download automation
  - Run: `poetry run python images/unsplash_automation.py --features`
  - Verify 3 images downloaded to `/assets/images/case-studies/`
  - Verify `.json` metadata files created

### 1.4 Context Illustrations (Day 6)
- [x] 1.4.1 Data flow illustration
  - Keywords: "abstract data flow", "network diagram", "data stream"
  - Download, optimize, place as `/assets/images/context/data-flow.webp`
- [x] 1.4.2 Team collaboration illustration
  - Keywords: "team collaboration whiteboard", "meeting analytics", "pair programming"
  - Download, optimize, place as `/assets/images/context/collaboration.webp`
- [x] 1.4.3 Verify all images downloaded and optimized
  - Total images: 15-20
  - All WebP < size budgets
  - All JPEG fallbacks present
- [x] 1.4.4 Test context illustration download automation
  - Run: `poetry run python images/unsplash_automation.py --context`
  - Verify 2 images downloaded to `/assets/images/context/`
  - Verify `.json` metadata files created
- [x] 1.4.5 Test full automation pipeline
  - Run: `poetry run python images/unsplash_automation.py --all`
  - Verify 15-20 images downloaded across all directories
  - Verify all `.json` metadata files created

---

## 2. Week 2: Infrastructure & Integration (Days 1-5)

### 2.1 Directory Structure & Components (Day 1)
- [x] 2.1.1 Create `/assets/images/` directory structure
  - Create subdirectories: `projects/`, `case-studies/`, `hero/`, `context/`
- [x] 2.1.2 Build `_includes/image-hero.html` component
  - Full-width background image with overlay gradient (30-50% black at bottom)
  - Support for text overlay (title, subtitle)
  - Light/dark mode compatible
  - Use `<picture>` markup with WebP/JPEG fallback
- [x] 2.1.3 Build `_includes/profile-avatar.html` component
  - Circular avatar (border-radius: 50%)
  - For About page "About Me" section
  - Use profile picture: `/assets/images/hero/profile.jpg`
- [x] 2.1.4 Build `_includes/image-project-card.html` component
  - Rounded corners (12px border-radius)
  - Subtle hover effect (105% zoom + shadow)
  - `loading="lazy"` attribute
- [x] 2.1.5 Build `_includes/attribution.html` component
  - Small font (var(--text-xs)): 12px
  - Gray color (var(--color-text-secondary))
  - Link to Unsplash photo page
  - Display at bottom of page (footer)
- [x] 2.1.6 Create `/assets/images/README.md`
  - Document directory structure
  - Document naming conventions
  - Add optimization guidelines

### 2.2 Image Utilities (CSS) (Day 2)
- [x] 2.2.1 Add `.image-hero` class to `main.css`
  - Full-width display
  - Overlay gradient (30-50% black at bottom)
  - Text readability enhancement
- [x] 2.2.2 Add `.image-thumbnail` class to `main.css`
  - Rounded corners
  - Hover zoom effect (105%)
  - Shadow on hover
- [x] 2.2.3 Add `.attribution` class to `main.css`
  - Small, gray, legal-compliant
  - Proper spacing (margin-top)
- [x] 2.2.4 Test light/dark mode compatibility
  - Verify overlay opacity works in both modes
  - Check text contrast (WCAG 2.1 AA: 4.5:1 or 7:1)
  - Adjust if needed

### 2.3 Jekyll Integration (Day 3)
- [ ] 2.3.1 Update home page (`index.md`) with hero image
  - Add front matter: `image`, `image_credit`, `image_alt`, `image_url`
  - Include `_includes/image-hero.html` as background with text overlay
  - Use: `/assets/images/hero/home.webp`
- [ ] 2.3.2 Update About page
  - Add front matter: `image: /assets/images/hero/profile.jpg` (for avatar)
  - Include `_includes/profile-avatar.html` in "About Me" section (circular)
  - Add hero background with overlay (optional)
- [ ] 2.3.3 Update Projects Index page with hero image
  - Add front matter: `image`, `image_credit`, `image_alt`, `image_url`
  - Include `_includes/image-hero.html` as background
  - Use: `/assets/images/hero/projects-index.webp`
- [ ] 2.3.4 Update Case Studies Index page with hero image
  - Add front matter: `image`, `image_credit`, `image_alt`, `image_url`
  - Include `_includes/image-hero.html` as background
  - Use: `/assets/images/hero/case-studies-index.webp`
- [ ] 2.3.5 Update all 3 project pages with thumbnails
  - Add `image`, `image_alt` to front matter
  - Update project card markup to use `_includes/image-project-card.html`
  - Add `<picture>` markup with WebP/JPEG fallback
- [ ] 2.3.6 Update all 3 case study pages with feature images
  - Add `image`, `image_credit`, `image_alt`, `image_url` to front matter
  - Include `_includes/attribution.html` at bottom of page
  - Add `<picture>` markup with WebP/JPEG fallback
- [ ] 2.3.7 Add `srcset` attributes to all images
  - Responsive sizes: 800w, 1200w, 1920w
  - `sizes` attribute for responsive selection
- [ ] 2.3.8 Add `loading="lazy"` to below-fold images
  - Project thumbnails
  - Case study features
  - Context illustrations
- [ ] 2.3.9 Add `loading="eager"` to above-fold images
  - Home, Projects Index, Case Studies Index heroes
  - Profile avatar on About page

### 2.4 Testing & QA (Day 4)
- [ ] 2.4.1 Run `bundle exec jekyll build`
  - Verify no build errors
  - Check for 404 image errors
- [ ] 2.4.2 Start local server: `bundle exec jekyll serve`
  - Check all images load (no broken images)
- [ ] 2.4.3 Test WebP rendering (Chrome DevTools → Network tab)
  - Verify WebP served to modern browsers
  - Check PNG fallback works
- [ ] 2.4.4 Test lazy loading
  - Scroll down page
  - Confirm below-fold images load on scroll (network tab shows load timing)
- [ ] 2.4.5 Test responsive images
  - Resize browser window (mobile → desktop)
  - Confirm srcset switches (DevTools → Network, check image size)
- [ ] 2.4.6 Cross-browser testing
  - Chrome: WebP + lazy loading
  - Firefox: WebP + lazy loading
  - Safari: WebP (may need PNG fallback)
  - Edge: WebP + lazy loading
- [ ] 2.4.7 Mobile testing
  - iOS Safari: Lazy loading support, WebP support
  - Chrome Android: Full feature support

### 2.5 Performance Optimization (Day 5)
- [ ] 2.5.1 Run Lighthouse audit (target: Performance > 90)
  - Test on home, about, projects, case studies pages
  - Document baseline scores
- [ ] 2.5.2 Optimize images missing size budgets
  - Re-compress with Squoosh if > size budget
  - Verify quality ≥ 80 after re-compression
- [ ] 2.5.3 Verify preload for above-fold images
  - Check `<link rel="preload">` in `<head>`
  - Test perceived performance (hero loads fast)
- [ ] 2.5.4 Check CDN (GitHub Pages) caching
  - Verify images cache (check response headers: Cache-Control)
  - Test cache invalidation (update image, confirm refresh)

---

## 3. Week 3: Polish & Documentation (Days 1-5)

### 3.1 Polish (Day 1)
- [ ] 3.1.1 Fine-tune image selections
  - Review all 15-20 images
  - Swap any that feel "off" or low-quality
  - Peer feedback: Ask 2-3 people "Does this look professional?"
- [ ] 3.1.2 Adjust alt text for accessibility
  - Test with screen reader (VoiceOver on macOS, NVDA on Windows)
  - Verify alt text conveys meaning without image
  - Add missing alt text
- [ ] 3.1.3 Verify attribution links work
  - Click through to Unsplash for each attributed image
  - Verify 404s: Fix broken `image_url` values
- [ ] 3.1.4 Test print mode (`@media print`)
  - Print to PDF or preview in browser
  - Hide images (show text-only for print)
  - Verify page layouts work without images

### 3.2 Documentation (Days 2-3)
- [ ] 3.2.1 Create `/assets/images/UNSPLASH_GUIDE.md`
  - Sourcing workflow (search → download → optimize → place)
  - Quality checklist (high contrast, clean composition, abstract subjects)
  - Color temperature map (keywords by project type)
  - Optimization instructions (WebP, PNG fallback, responsive sizes)
- [ ] 3.2.2 Update `/assets/images/README.md`
  - Directory structure explanation
  - Naming conventions
  - Size budgets
  - Performance guidelines
- [ ] 3.2.3 Document front matter schema in `add-professional-imagery/design.md`
  - Required fields: `image`, `image_credit`, `image_alt`, `image_url`
  - Optional fields: `image_overlay` (for hero text readability)
  - Examples for each page type
- [ ] 3.2.4 Update `add-professional-imagery/tasks.md`
  - Add performance budgets (Hero < 500KB, Thumbnail < 150KB, Feature < 250KB)
  - Add Lighthouse score targets (Performance > 90, SEO > 95)
  - Add browser support matrix (WebP: Chrome/Firefox/Edge/Safari 14+)

### 3.3 Final QA (Day 4)
- [ ] 3.3.1 Full regression test
  - Visit every page (home, about, projects, all 6+ projects, case studies index, all 3 case studies)
  - Verify all images load (no 404s)
  - Verify all images render correctly (WebP where supported, PNG fallback)
- [ ] 3.3.2 Peer feedback
  - Ask 2-3 peers to review portfolio
  - Questions: "Does this look professional?" "Any images feel out of place?" "Loading speed acceptable?"
  - Incorporate feedback
- [ ] 3.3.3 Verify GitHub Pages deployment
  - Push to GitHub
  - Wait 5-10 minutes for deployment
  - Check live site: https://quangphu1912.github.io
  - Verify images load from CDN (check Network tab, confirm CDN domain)

### 3.4 Launch (Day 5)
- [ ] 3.4.1 Commit and push to GitHub
  - Commit message: "Add professional Unsplash imagery with WebP optimization"
  - Push to develop branch
  - Merge to master
- [ ] 3.4.2 Monitor GitHub Pages deployment
  - Check deployment status in GitHub repo → Settings → Pages
  - Wait for "Deployed" message
- [ ] 3.4.3 Post-deployment verification
  - Visit live site
  - Test all pages load correctly
  - Test on mobile (phone + tablet)
- [ ] 3.4.4 Update LinkedIn portfolio link (optional)
  - Update LinkedIn "Featured" section or "Website" field
  - Share with network (optional)
- [ ] 3.4.5 Archive `add-case-studies` change
  - Run: `openspec archive add-case-studies`
  - Verify case studies merged to main specs
- [ ] 3.4.6 Archive `add-professional-imagery` change (after full deployment + verification)
  - Run: `openspec archive add-professional-imagery`
  - Verify documentation merged to main specs

---

## 4. Optional Enhancements (Post-Launch)

### 4.1 Future Work (Future Changes)
- [ ] 4.1.1 Add hero images to Blog (when `create-technical-blog` change is implemented)
- [ ] 4.1.2 Add project thumbnails for future projects (as they're created)
- [ ] 4.1.3 Add image search automation (Unsplash API integration) - if manual sourcing becomes bottleneck
- [ ] 4.1.4 Add image CDN (Cloudinary, Imgix) - if performance becomes issue with GitHub Pages
- [ ] 4.1.5 Add image gallery for project screenshots (if demos are created)

### 4.2 Monitoring & Maintenance
- [ ] 4.2.1 Set up Lighthouse CI (GitHub Actions) to monitor performance regression
- [ ] 4.2.2 Check for broken images monthly (run link checker)
- [ ] 4.2.3 Re-optimize images if Squoosh/WebP algorithms improve
- [ ] 4.2.4 Update Unsplash guide if Unsplash UI/features change
