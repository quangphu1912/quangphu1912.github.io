# Data Science Portfolio

A modern, minimalist portfolio website showcasing machine learning projects, data analysis, and technical expertise. Built with Jekyll and deployed on GitHub Pages.

## 🚀 Quick Start

### Prerequisites

- Ruby 3.3.6 or higher
- Bundler
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/quangphu1912/quangphu1912.github.io.git
cd quangphu1912.github.io

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## 📁 Project Structure

```
.
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
│   ├── default.html     # Base layout
│   ├── page.html        # Static pages
│   ├── project.html     # Project detail pages
│   └── notebook.html    # Jupyter notebook pages
├── _includes/           # Reusable components
│   ├── header.html      # Site header
│   ├── footer.html      # Site footer
│   └── analytics.html   # Analytics tracking
├── _projects/           # Project markdown files
├── _notebooks/          # Jupyter notebooks
├── assets/
│   ├── css/            # Stylesheets
│   ├── images/         # Images and thumbnails
│   └── js/             # JavaScript files
├── index.md            # Homepage
└── projects.md         # Projects listing page
```

## ✍️ Adding Content

### Adding a New Project

1. Create a new markdown file in `_projects/`:

```markdown
---
title: "Your Project Title"
description: "Brief description of your project"
date: 2024-01-15
tags: [Python, Machine Learning, TensorFlow]
featured: true  # Optional: display in featured section
image: /assets/images/projects/your-project.jpg
---

## Overview

Your project content here...
```

2. Add project thumbnail to `assets/images/projects/`
3. Commit and push to GitHub

### Adding a Jupyter Notebook

1. Place your `.ipynb` file in `_notebooks/`
2. Add metadata in the first markdown cell:

```markdown
---
title: "Notebook Title"
description: "Notebook description"
date: 2024-01-15
tags: [Python, Data Analysis]
---
```

3. Convert to HTML (manual or via GitHub Actions):

```bash
jupyter nbconvert --to html --template notebook.tpl your-notebook.ipynb
```

### Updating Your Profile

Edit `index.md` to update:
- Professional bio
- Skills and expertise
- Work experience
- Education and certifications
- Contact information

## 🎨 Design System

The site uses an Apple-inspired minimalist design with:
- **Typography**: System fonts for optimal readability
- **Spacing**: 8px grid system
- **Colors**: Automatic dark mode support
- **Components**: Buttons, cards, tags with subtle animations

## 🔧 Configuration

### Site Settings

Edit `_config.yml`:

```yaml
title: "Your Name - Data Science Portfolio"
name: "Your Name"
email: your-email@example.com
description: Your professional description

# Social Links
linkedin_username: your-linkedin
github_username: your-github
```

### Analytics

To enable Google Analytics, add your measurement ID to `_config.yml`:

```yaml
google_analytics: G-XXXXXXXXXX
```

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `master` branch.

### Custom Domain (Optional)

1. Purchase domain from Namecheap or Cloudflare
2. Configure DNS A records:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
3. Add `CNAME` file to repository root with your domain
4. Enable HTTPS in GitHub Pages settings

## 📊 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ SEO optimized (Open Graph, Twitter Cards)
- ✅ Fast loading (<3s on 3G)
- ✅ Accessibility compliant (WCAG AA)
- ✅ Privacy-respecting analytics
- ✅ RSS feed for projects

## 🛠️ Tech Stack

- **Static Site Generator**: Jekyll 4.4
- **Styling**: Custom CSS (no frameworks)
- **Hosting**: GitHub Pages
- **Analytics**: Google Analytics 4
- **Version Control**: Git

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but suggestions and bug reports are welcome via issues.

## 📧 Contact

- **LinkedIn**: [linkedin.com/in/quangphu1912](https://linkedin.com/in/quangphu1912)
- **GitHub**: [github.com/quangphu1912](https://github.com/quangphu1912)
- **Email**: your-email@example.com

---

Built with ❤️ using Jekyll