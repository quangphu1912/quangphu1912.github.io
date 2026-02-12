## 1. Blog Infrastructure Setup

- [ ] 1.1 Read design.md to understand blog architecture and content strategy
- [ ] 1.2 Read specs to understand requirements for blog platform, content, and documentation
- [ ] 1.3 Add posts collection to _config.yml with output: true and permalink: /blog/:year/:month/:day/:title/
- [ ] 1.4 Create _posts/ directory
- [ ] 1.5 Create blog post template with frontmatter (layout, title, date, tags, description)
- [ ] 1.6 Create /blog/ page (blog.md) with post listing layout

## 2. Blog Landing Page

- [ ] 2.1 Create _layouts/blog.html for blog landing page
- [ ] 2.2 Implement post listing in reverse chronological order
- [ ] 2.3 Add tag filtering functionality
- [ ] 2.4 Add pagination (10 posts per page)
- [ ] 2.5 Add RSS subscription link to /feed.xml
- [ ] 2.6 Add "Blog" link to header.html navigation

## 3. Initial Blog Posts (Week 2-3)

- [ ] 3.1 Write "Building Real-Time ML Pipelines on AWS: Lessons Learned" (1500 words)
  - [ ] 3.1.1 Document architecture: Kinesis → Lambda → S3 → Redshift → QuickSight
  - [ ] 3.1.2 Include code snippets for Lambda function and CloudFormation
  - [ ] 3.1.3 Discuss challenges: backpressure, schema evolution, cost optimization
  - [ ] 3.1.4 Add Mermaid architecture diagram
  - [ ] 3.1.5 Test in local Jekyll server
- [ ] 3.2 Write "Fine-Tuning BERT for Financial Sentiment Analysis" (1800 words)
  - [ ] 3.2.1 Document data collection: Bloomberg tweets, earnings transcripts
  - [ ] 3.2.2 Include preprocessing code for financial tokenization
  - [ ] 3.2.3 Discuss fine-tuning hyperparameters
  - [ ] 3.2.4 Add model performance metrics and error analysis
  - [ ] 3.2.5 Test in local Jekyll server
- [ ] 3.3 Write "From Notebook to Production: ML Model Deployment Checklist" (1200 words)
  - [ ] 3.3.1 Create checklist format (copy-paste ready)
  - [ ] 3.3.2 Cover: Git branching, Dockerfile, GitHub Actions, monitoring
  - [ ] 3.3.3 Include code examples for each step
  - [ ] 3.3.4 Test in local Jekyll server
- [ ] 3.4 Write "Data Science at BMO: Balancing Innovation and Regulation" (1500 words)
  - [ ] 3.4.1 Discuss regulatory constraints and model governance
  - [ ] 3.4.2 Cover cross-functional collaboration patterns
  - [ ] 3.4.3 Address ML ethics in lending models
  - [ ] 3.4.4 Test in local Jekyll server

## 4. Blog Post Features

- [ ] 4.1 Create _layouts/post.html for individual post pages
- [ ] 4.2 Implement syntax highlighting for code blocks (Jekyll built-in)
- [ ] 4.3 Add social sharing buttons to post layout (Twitter, LinkedIn)
- [ ] 4.4 Add reading time estimate to posts (~200 words/minute)
- [ ] 4.5 Test all 4 posts render correctly with syntax highlighting

## 5. RSS and Distribution

- [ ] 5.1 Verify jekyll-feed plugin generates /feed.xml
- [ ] 5.2 Test RSS feed with feed reader
- [ ] 5.3 Announce blog posts on LinkedIn with excerpts
- [ ] 5.4 Share key insights from posts on Twitter

## 6. Launch and Monitoring

- [ ] 6.1 Commit all changes with message "Add technical blog with 4 initial posts"
- [ ] 6.2 Push to GitHub
- [ ] 6.3 Verify blog is live at /blog/
- [ ] 6.4 Monitor traffic via Google Analytics for first month
- [ ] 6.5 Gather feedback and iterate on format
