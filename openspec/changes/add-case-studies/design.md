## Context

**Current State**: Portfolio projects show technical implementation (code snippets, architecture descriptions) but lack business context, quantified impact, and detailed journey from problem to solution. Current format is "project description" not "case study." For senior roles, recruiters need to see measurable business impact and problem-solving depth.

**Constraints**:
- Must not expose confidential BMO data or metrics
- Should balance technical depth with business accessibility
- Case studies should be scannable (executive summary) but detailed (full journey)
- Must maintain existing minimalist design aesthetic

**Stakeholders**: Portfolio owner (needs to showcase business impact), recruiters (need to verify ROI and problem-solving), business stakeholders (need to understand value proposition)

## Goals / Non-Goals

**Goals:**
- Create 3 detailed case studies (one per existing project)
- Quantify business impact with specific metrics
- Show complete journey: business challenge → technical solution → results → lessons
- Demonstrate ability to communicate with both technical and business audiences
- Add architecture diagrams for visual representation
- Create reusable case study template for future projects

**Non-Goals:**
- Creating new projects (case studies for existing projects)
- Revealing proprietary BMO information (use demo/example data)
- Over-engineering with interactive visualizations (static diagrams sufficient)
- Changing existing project pages (case studies are separate, linked from projects)

## Decisions

**Case Study Structure**
- **Decision**: Standardized sections for each case study:
  1. **Executive Summary** (150 words): TL;DR for busy readers
  2. **Business Challenge**: Stakeholder pain points, success metrics, constraints
  3. **Technical Approach**: Architecture diagram, data pipeline, model selection, key decisions
  4. **Implementation Journey**: Timeline (phases), challenges faced + solutions, iterations
  5. **Results & Impact**: Business metrics (revenue, cost, efficiency), model metrics, user feedback
  6. **Lessons Learned**: What worked, what to do differently, applicability to other problems
  7. **Future Roadmap**: Planned improvements, scaling opportunities
- **Rationale**: Structured, scannable, comprehensive. Covers business + technical depth.
- **Alternative considered**: Free-form narrative - rejected as hard to compare across projects

**Case Study Format**
- **Decision**: Separate pages at /case-studies/[project-name]/ using Jekyll pages
- **Layout**: New _layouts/case-study.html with custom styling
- **Navigation**: Add "Case Studies" link to header, link from project pages
- **Rationale**: SEO-friendly, shareable URLs, distinct from project descriptions
- **Alternative considered**: Modal/overlay on project pages - rejected as not shareable

**Quantified Impact Framework**
- **Decision**: Use XYZ formula for all metrics: "Accomplished [X] as measured by [Y], by doing [Z]"
- **Examples**:
  - "Reduced model inference latency by 67% (450ms → 150ms) by implementing TensorRT optimization"
  - "Saved $50K/year in manual labor costs by automating ETL pipeline"
  - "Improved fraud detection F1-score from 0.73 to 0.89 by engineering 12 behavioral features"
- **Rationale**: Specific, credible, shows cause-and-effect
- **Alternative considered**: Vague claims like "improved performance" - rejected as unverifiable

**Architecture Diagrams**
- **Decision**: Use Mermaid syntax in markdown for portability
- **Diagram types**:
  - Data flow: `graph TD` (top-down flowchart)
  - System architecture: `graph LR` (left-right components)
  - Sequence: `sequenceDiagram` (for multi-step processes)
- **Styling**: Custom CSS for Mermaid renders (colors, fonts matching site theme)
- **Rationale**: Version-controlled, renders in GitHub, easy to update
- **Alternative considered**: External tools (Draw.io, Lucidchart) - rejected as not version-controlled

**Case Study for AWS Pipeline Project**
- **Focus**: Real-time data processing infrastructure
- **Business Challenge**:
  - SaaS platform had 6-hour data latency for business metrics
  - Marketing team couldn't respond to trends in real-time
  - Manual data consolidation cost $50K/year in engineering time
- **Technical Approach**:
  - Architecture: API Gateway → Kinesis → Lambda → S3 → Redshift → QuickSight
  - Streaming: Kinesis Data Streams for event ingestion
  - Processing: Lambda functions for transformation (Python 3.9)
  - Storage: S3 for raw/processed data, Redshift for analytics
  - Visualization: QuickSight dashboards
- **Results**:
  - Reduced data latency from 6 hours to 45 seconds (98% reduction)
  - Enabled 3 additional real-time dashboards for marketing
  - 99.9% uptime over 6 months
  - $40K/year cost savings vs. manual approach

**Case Study for Sentiment Analysis Project**
- **Focus**: Financial NLP for trading decisions
- **Business Challenge**:
  - Traders spending 2+ hours/day reading news manually
  - Missing sentiment signals from social media
  - No systematic way to quantify market sentiment
- **Technical Approach**:
  - Model: BERT-base fine-tuned on financial tweets
  - Data: 50K labeled tweets from Bloomberg, Twitter Finance
  - Preprocessing: Financial tokenization, ticker symbol handling
  - Training: 5-fold cross-validation, hyperparameter tuning
  - Deployment: Flask API with Docker, GCP Cloud Run
- **Results**:
  - Model accuracy: 89% (vs. 72% baseline)
  - Reduced manual news analysis time by 70%
  - Integrated into trading workflow, used by 5 traders
  - Correlation with market moves: 0.62 (statistically significant)

**Case Study for Churn Prediction Project**
- **Focus**: Customer retention ML
- **Business Challenge**:
  - 15% monthly churn rate for subscription product
  - Reactive retention (after churn occurs) vs. proactive
  - No systematic way to identify at-risk customers
- **Technical Approach**:
  - Model: XGBoost with 12 engineered behavioral features
  - Features: Usage frequency, engagement metrics, support interactions
  - Training: 50K customers (2020-2023), stratified 80/20 split
  - Evaluation: Precision-recall tradeoff analysis
  - Deployment: Batch predictions nightly, Salesforce CRM integration
- **Results**:
  - Model AUC: 0.89 (baseline: 0.76)
  - Identified top 20% at-risk customers with 85% precision
  - Retention campaigns increased retention by 8%
  - Estimated revenue impact: $200K/year saved

## Risks / Trade-offs

**Risk: Revealing proprietary BMO data**
- **Mitigation**: Use anonymized/dummy data for metrics. If real results are confidential, use "Illustrative example" format.

**Risk: Case studies becoming too long/detailed**
- **Mitigation**: Keep executive summary concise (150 words), put technical details in collapsible sections or separate pages.

**Trade-off: Time investment vs. portfolio impact**
- **Analysis**: 1 week to write 3 case studies. High ROI for demonstrating business acumen.

**Risk: Metrics without context may be misleading**
- **Mitigation**: Provide baseline/comparison numbers, explain context (e.g., "vs. previous approach", "industry baseline is X").

**Risk: Over-promising results**
- **Mitigation**: Be specific about scope (e.g., "in pilot with 1K customers", "within specific product line")

## Migration Plan

**Week 1: AWS Pipeline Case Study**
1. Outline all sections
2. Create architecture diagram (Mermaid)
3. Quantify impact metrics (use real numbers if possible, otherwise illustrative)
4. Write executive summary
5. Flesh out technical approach with code snippets
6. Add lessons learned and roadmap

**Week 2: Sentiment Analysis Case Study**
1. Outline sections
2. Create model architecture diagram
3. Write business challenge (interview traders if needed for context)
4. Document technical approach with model card details
5. Quantify impact (trader time saved, accuracy improvement)
6. Add lessons learned

**Week 3: Churn Prediction Case Study**
1. Outline sections
2. Create feature engineering diagram
3. Write business challenge (interview product stakeholders)
4. Document model evaluation results
5. Quantify business impact (revenue saved, retention improvement)
6. Add lessons learned

**Week 4: Template & Integration**
1. Create case study template from common patterns
2. Build _layouts/case-study.html
3. Add "Case Studies" link to header.html
4. Link case studies from project pages
5. Add Mermaid CSS styling to main.css
6. Test all links and rendering

**Rollback Strategy**: Case studies are new pages, no existing content modified. Delete if issues found, no impact to projects.

## Open Questions

- [ ] Are the real business metrics (e.g., $200K/year saved) confidential? If so, should we use illustrative examples? (ASK USER)
- [ ] Should we add downloadable PDF versions of case studies? (Recommend: yes, for sharing via email/LinkedIn)
- [ ] Should we include client/colleague testimonials? (Recommend: yes, adds credibility. Get quotes with permission.)
