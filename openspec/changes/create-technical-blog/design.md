## Context

**Current State**: Portfolio has zero thought leadership content. No blog, articles, talks, or publications. For Senior Data Scientist roles, having 3-5 technical articles is industry standard for demonstrating expertise. The site uses Jekyll with jekyll-feed plugin already installed, so blog infrastructure is partially ready.

**Constraints**:
- Must maintain fast loading speed (currently <3s on 3G)
- Blog posts should be substantial (1000-2000 words) not thin content
- Must fit within existing minimalist design aesthetic
- RSS feed should work automatically (jekyll-feed already configured)

**Stakeholders**: Portfolio owner (needs to showcase expertise), recruiters (need to verify thought leadership), readers (expect quality technical content)

## Goals / Non-Goals

**Goals:**
- Add Jekyll blog collection with 4 initial high-quality posts
- Create blog landing page with filtering by tags/categories
- Enable RSS feed for subscriptions
- Showcase real-world ML, MLOps, and data engineering expertise
- Demonstrate ability to communicate complex concepts clearly
- Improve SEO through regular content updates

**Non-Goals:**
- Adding comments system (adds complexity, moderation burden)
- Monetizing blog (not relevant for portfolio)
- Publishing on fixed schedule (publish when have quality content)
- Covering topics outside expertise areas

## Decisions

**Blog Infrastructure**
- **Decision**: Use Jekyll's native collections (_posts/) with frontmatter
- **Configuration**:
  ```yaml
  collections:
    posts:
      output: true
      permalink: /blog/:year/:month/:day/:title/
  ```
- **Rationale**: Built-in to Jekyll, simple, no additional dependencies
- **Alternative considered**: WordPress or Hugo - rejected as adds complexity and breaks existing setup

**Blog Landing Page Design**
- **Decision**: /blog/ page with:
  - Featured posts section (top 2-3 posts)
  - Filterable by tags (Python, MLOps, AWS, Finance, etc.)
  - Pagination for older posts
  - RSS subscription link
- **Rationale**: Discoverable, scannable, highlights best content
- **Alternative considered**: Reverse chronological list only - rejected as doesn't surface best content

**Initial Blog Post Topics**
1. **"Building Real-Time ML Pipelines on AWS: Lessons Learned"** (1500 words)
   - Architecture: Kinesis → Lambda → S3 → Redshift
   - Challenges: Handling backpressure, schema evolution
   - Cost optimization: EC2 vs Lambda, reserved instances
   - Monitoring: CloudWatch alarms, dashboards
   - Code examples: Lambda function, CloudFormation snippets

2. **"Fine-Tuning BERT for Financial Sentiment Analysis"** (1800 words)
   - Data collection: Bloomberg tweets, earnings call transcripts
   - Preprocessing: Financial domain tokenization, handling ticker symbols
   - Fine-tuning: Hyperparameters that worked, learning rate schedule
   - Domain adaptation: Transfer learning from general to financial text
   - Results: Before/after metrics, error analysis
   - Deployment considerations: Model serving, latency

3. **"From Notebook to Production: ML Model Deployment Checklist"** (1200 words)
   - Version control: Git branching, .gitignore for notebooks
   - Containerization: Dockerfile best practices, multi-stage builds
   - CI/CD: GitHub Actions for model training and deployment
   - Monitoring: Prometheus metrics, Grafana dashboards
   - Retraining: Automated triggers, A/B testing framework
   - Checklist format: Copy-paste ready

4. **"Data Science at BMO: Balancing Innovation and Regulation"** (1500 words)
   - Regulatory constraints: Model governance, documentation requirements
   - Cross-functional collaboration: Working with risk, compliance, business teams
   - Real-world ML ethics: Fairness audits in lending models
   - Technical debt: Legacy systems, data quality issues
   - Career growth: From analyst to senior data scientist in finance

- **Rationale**: Diverse topics (MLOps, NLP, career, domain expertise), substantial content demonstrating depth
- **Alternative considered**: Shorter posts (500-800 words) - rejected as insufficient depth for senior roles

**Content Creation Workflow**
- **Decision**: Write posts in local Jekyll environment, preview with `bundle exec jekyll serve`
- **Frontmatter template**:
  ```yaml
  ---
  layout: post
  title: "Post Title"
  date: 2024-02-12
  tags: [Python, MLOps, AWS]
  description: "One-sentence summary for SEO"
  ---
  ```
- **Rationale**: Preview before publishing, SEO-optimized
- **Alternative considered**: External CMS - rejected as breaks simplicity

**RSS & Distribution**
- **Decision**: Rely on jekyll-feed plugin (already installed), manually announce on LinkedIn/Twitter
- **Rationale**: Automatic RSS generation, social media for reach
- **Alternative considered**: Newsletter signup - rejected as adds privacy/complexity

## Risks / Trade-offs

**Risk: Blog posts taking too long to write**
- **Mitigation**: Aim for 1 post per week initially, adjust based on time. Quality over frequency.

**Risk: Posts becoming outdated quickly**
- **Mitigation**: Focus on evergreen topics (fundamentals, patterns) not rapidly changing tech. Add "Last Updated" dates.

**Trade-off: Time investment vs. immediate job search impact**
- **Analysis**: 4 posts × 4 hours = 16 hours. High ROI for thought leadership demonstration.
- **Decision**: Prioritize blog posts after fixing code quality, before new projects.

**Risk: Low traffic initially**
- **Mitigation**: Share on LinkedIn, Twitter, relevant subreddits. Traffic grows over time with SEO.

**Risk: Code examples in posts becoming outdated**
- **Mitigation**: Pin dependency versions in code examples, add "Tested with" notes, link to GitHub repos for live examples

## Migration Plan

**Week 1: Setup**
1. Add _posts/ collection to _config.yml
2. Create /blog/ page with layout
3. Test RSS feed generation at /feed.xml
4. Create blog post template with frontmatter
5. Update site navigation (add "Blog" link to header)

**Week 2-3: Content Creation**
1. Write post #1 (Real-Time ML Pipelines)
2. Write post #2 (BERT Fine-Tuning)
3. Review and edit both posts
4. Add code syntax highlighting (Jekyll built-in)
5. Test preview locally

**Week 4: Content Creation**
1. Write post #3 (Notebook to Production)
2. Write post #4 (Data Science at BMO)
3. Review and edit both posts
4. Add social sharing buttons to post layout
5. Test RSS feed with feed reader

**Week 5: Launch**
1. Publish all 4 posts
2. Announce on LinkedIn with excerpts
3. Tweet key insights from each post
4. Monitor traffic via Google Analytics
5. Gather feedback, iterate on format

**Rollback Strategy**: Posts are new pages, no existing content changes. Delete posts if quality issues, no impact to existing site.

## Open Questions

- [ ] Should we enable comments via Disqus/Gitalk? (Recommend: start without, add if demand)
- [ ] Should we cross-post to Medium/DEV.to for reach? (Recommend: yes, with canonical link back to portfolio)
- [ ] Should we add reading time estimate to posts? (Recommend: yes, ~200 words/minute)
