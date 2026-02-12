## Why

The portfolio lacks thought leadership content. For a Senior-level role, having technical blog posts, articles, and public writing is critical for demonstrating expertise, attracting opportunities, and establishing credibility. Currently zero blog posts exist, which is a significant gap compared to industry expectations for senior practitioners (3-5 posts minimum). A blog will showcase deep technical knowledge, real-world problem solving, and ability to communicate complex concepts clearly.

## What Changes

- **Add Jekyll blog collection** (_posts/) with proper frontmatter and permalink structure
- **Create blog landing page** (/blog/) with post filtering by tags and categories
- **Write 4 initial blog posts** on ML, MLOps, and data engineering topics:
  - "Building Real-Time ML Pipelines on AWS: Lessons Learned"
  - "Fine-Tuning BERT for Financial Sentiment Analysis"
  - "From Notebook to Production: ML Model Deployment Checklist"
  - "Data Science at BMO: Balancing Innovation and Regulation"
- **Integrate RSS feed** for blog post subscriptions (jekyll-feed plugin already installed)
- **Add social sharing buttons** to blog posts for increased reach
- **Enable syntax highlighting** for code blocks using Jekyll's built-in highlighting

## Capabilities

### New Capabilities

- `technical-blog-platform`: Jekyll-based blog with posts, RSS feed, and categorization
- `content-authoring`: Technical writing showcasing ML, MLOps, and data engineering expertise
- `thought-leadership`: Public demonstration of expertise through case studies, lessons learned, and best practices
- `code-documentation`: Syntax-highlighted code examples in blog posts

### Modified Capabilities

None (new section added to portfolio, no changes to existing behavior)

## Impact

- **New pages**: /blog/ (landing), /blog/year/month/day/post-title/ (individual posts)
- **New files**: _posts/ directory with 4 initial markdown posts
- **Navigation updates**: Add "Blog" link to header.html
- **RSS feed**: Automatically generated at /feed.xml
- **SEO benefits**: Regular content updates improve search visibility
- **Career impact**: Demonstrates expertise, attracts speaking opportunities, builds professional brand
