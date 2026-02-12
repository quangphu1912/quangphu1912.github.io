## 1. Case Study Setup

- [ ] 1.1 Read design.md to understand case study structure and approach
- [ ] 1.2 Read specs to understand requirements for case studies, diagrams, and impact measurement
- [ ] 1.3 Create _layouts/case-study.html for consistent case study formatting
- [ ] 1.4 Add "Case Studies" link to header.html navigation

## 2. AWS Pipeline Case Study (Week 1)

- [ ] 2.1 Create /case-studies/aws-ml-pipeline/ directory and page
- [ ] 2.2 Write Executive Summary (150 words)
  - [ ] 2.2.1 Summarize problem, solution, impact in one glance
- [ ] 2.3 Write Business Challenge section
  - [ ] 2.3.1 Describe stakeholder pain points (6-hour latency, manual costs)
  - [ ] 2.3.2 Specify success metrics (latency, cost savings)
  - [ ] 2.3.3 Identify constraints (budget, time)
- [ ] 2.4 Write Technical Approach section
  - [ ] 2.4.1 Create Mermaid diagram: API Gateway → Kinesis → Lambda → S3 → Redshift → QuickSight
  - [ ] 2.4.2 Explain data pipeline architecture
  - [ ] 2.4.3 Justify technology choices
- [ ] 2.5 Write Implementation Journey section
  - [ ] 2.5.1 Document timeline (6 weeks)
  - [ ] 2.5.2 Describe challenges: backpressure, schema evolution
  - [ ] 2.5.3 Explain solutions and iterations
- [ ] 2.6 Write Results & Impact section
  - [ ] 2.6.1 Quantify: latency 6 hours → 45 seconds (98% reduction)
  - [ ] 2.6.2 Quantify: cost savings $50K/year → $10K/year
  - [ ] 2.6.3 Report: 99.9% uptime over 6 months
  - [ ] 2.6.4 Include: 3 additional dashboards enabled
- [ ] 2.7 Write Lessons Learned section
  - [ ] 2.7.1 Document what worked (serverless, streaming)
  - [ ] 2.7.2 Document what to do differently (start with smaller scale)
- [ ] 2.8 Write Future Roadmap section

## 3. Sentiment Analysis Case Study (Week 2)

- [ ] 3.1 Create /case-studies/sentiment-analysis/ directory and page
- [ ] 3.2 Write Executive Summary (150 words)
- [ ] 3.3 Write Business Challenge section
  - [ ] 3.3.1 Describe trader manual analysis burden (2+ hours/day)
  - [ ] 3.3.2 Missing sentiment signals from social media
- [ ] 3.4 Write Technical Approach section
  - [ ] 3.4.1 Create Mermaid diagram: Training pipeline, model architecture
  - [ ] 3.4.2 Explain BERT fine-tuning on financial tweets
- [ ] 3.5 Write Implementation Journey section
  - [ ] 3.5.1 Document hyperparameter tuning process
- [ ] 3.6 Write Results & Impact section
  - [ ] 3.6.1 Quantify: accuracy 72% → 89%
  - [ ] 3.6.2 Quantify: manual analysis time reduced by 70%
  - [ ] 3.6.3 Report: 5 traders using in workflow
  - [ ] 3.6.4 Report: correlation with market moves 0.62
- [ ] 3.7 Write Lessons Learned section
- [ ] 3.8 Write Future Roadmap section

## 4. Churn Prediction Case Study (Week 3)

- [ ] 4.1 Create /case-studies/churn-prediction/ directory and page
- [ ] 4.2 Write Executive Summary (150 words)
- [ ] 4.3 Write Business Challenge section
  - [ ] 4.3.1 Describe 15% monthly churn rate
  - [ ] 4.3.2 Reactive vs. proactive retention issue
- [ ] 4.4 Write Technical Approach section
  - [ ] 4.4.1 Create Mermaid diagram: Feature engineering, model training
  - [ ] 4.4.2 Explain XGBoost with 12 behavioral features
- [ ] 4.5 Write Implementation Journey section
- [ ] 4.6 Write Results & Impact section
  - [ ] 4.6.1 Quantify: AUC 0.76 → 0.89
  - [ ] 4.6.2 Quantify: retention increased by 8%
  - [ ] 4.6.3 Estimate: $200K/year revenue saved
- [ ] 4.7 Write Lessons Learned section
- [ ] 4.8 Write Future Roadmap section

## 5. Case Study Template

- [ ] 5.1 Create template from common patterns across 3 case studies
- [ ] 5.2 Save template at /case-studies/_template.md
- [ ] 5.3 Include section headers with placeholder descriptions
- [ ] 5.4 Add guidance for each section

## 6. Integration and Styling

- [ ] 6.1 Add Mermaid CSS styling to main.css for diagram rendering
- [ ] 6.2 Link case studies from project pages
  - [ ] 6.2.1 Add "Read Case Study" link to /projects/aws-pipeline.md
  - [ ] 6.2.2 Add "Read Case Study" link to /projects/sentiment-analysis.md
  - [ ] 6.2.3 Add "Read Case Study" link to /projects/churn-prediction.md
- [ ] 6.3 Test all case study pages render correctly
- [ ] 6.4 Verify Mermaid diagrams render in light and dark modes
- [ ] 6.5 Commit and push changes
