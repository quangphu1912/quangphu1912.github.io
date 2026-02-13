## 1. Case Study Setup

- [x] 1.1 Read design.md to understand case study structure and approach
- [x] 1.2 Read specs to understand requirements for case studies, diagrams, and impact measurement
- [x] 1.3 Create _layouts/case-study.html for consistent case study formatting
- [x] 1.4 Add "Case Studies" link to header.html navigation

## 2. AWS Pipeline Case Study (Week 1)

- [x] 2.1 Create /case-studies/aws-ml-pipeline/ directory and page
- [x] 2.2 Write Executive Summary (150 words)
  - [x] 2.2.1 Summarize problem, solution, impact in one glance
- [x] 2.3 Write Business Challenge section
  - [x] 2.3.1 Describe stakeholder pain points (6-hour latency, manual costs)
  - [x] 2.3.2 Specify success metrics (latency, cost savings)
  - [x] 2.3.3 Identify constraints (budget, time)
- [x] 2.4 Write Technical Approach section
  - [x] 2.4.1 Create Mermaid diagram: API Gateway → Kinesis → Lambda → S3 → Redshift → QuickSight
  - [x] 2.4.2 Explain data pipeline architecture
  - [x] 2.4.3 Justify technology choices
- [x] 2.5 Write Implementation Journey section
  - [x] 2.5.1 Document timeline (6 weeks)
  - [x] 2.5.2 Describe challenges: backpressure, schema evolution
  - [x] 2.5.3 Explain solutions and iterations
- [x] 2.6 Write Results & Impact section
  - [x] 2.6.1 Quantify: latency 6 hours → 45 seconds (98% reduction)
  - [x] 2.6.2 Quantify: cost savings $50K/year → $10K/year
  - [x] 2.6.3 Report: 99.9% uptime over 6 months
  - [x] 2.6.4 Include: 3 additional dashboards enabled
- [x] 2.7 Write Lessons Learned section
  - [x] 2.7.1 Document what worked (serverless, streaming)
  - [x] 2.7.2 Document what to do differently (start with smaller scale)
- [x] 2.8 Write Future Roadmap section

## 3. Sentiment Analysis Case Study (Week 2)

- [x] 3.1 Create /case-studies/sentiment-analysis/ directory and page
- [x] 3.2 Write Executive Summary (150 words)
- [x] 3.3 Write Business Challenge section
  - [x] 3.3.1 Describe trader manual analysis burden (2+ hours/day)
  - [x] 3.3.2 Missing sentiment signals from social media
- [x] 3.4 Write Technical Approach section
  - [x] 3.4.1 Create Mermaid diagram: Training pipeline, model architecture
  - [x] 3.4.2 Explain BERT fine-tuning on financial tweets
- [x] 3.5 Write Implementation Journey section
  - [x] 3.5.1 Document hyperparameter tuning process
- [x] 3.6 Write Results & Impact section
  - [x] 3.6.1 Quantify: accuracy 72% → 89%
  - [x] 3.6.2 Quantify: manual analysis time reduced by 70%
  - [x] 3.6.3 Report: 5 traders using in workflow
  - [x] 3.6.4 Report: correlation with market moves 0.62
- [x] 3.7 Write Lessons Learned section
- [x] 3.8 Write Future Roadmap section

## 4. Churn Prediction Case Study (Week 3)

- [x] 4.1 Create /case-studies/churn-prediction/ directory and page
- [x] 4.2 Write Executive Summary (150 words)
- [x] 4.3 Write Business Challenge section
  - [x] 4.3.1 Describe 15% monthly churn rate
  - [x] 4.3.2 Reactive vs. proactive retention issue
- [x] 4.4 Write Technical Approach section
  - [x] 4.4.1 Create Mermaid diagram: Feature engineering, model training
  - [x] 4.4.2 Explain XGBoost with 12 behavioral features
- [x] 4.5 Write Implementation Journey section
- [x] 4.6 Write Results & Impact section
  - [x] 4.6.1 Quantify: AUC 0.76 → 0.89
  - [x] 4.6.2 Quantify: retention increased by 8%
  - [x] 4.6.3 Estimate: $200K/year revenue saved
- [x] 4.7 Write Lessons Learned section
- [x] 4.8 Write Future Roadmap section

## 5. Case Study Template

- [x] 5.1 Create template from common patterns across 3 case studies
- [x] 5.2 Save template at /case-studies/_template.md
- [x] 5.3 Include section headers with placeholder descriptions
- [x] 5.4 Add guidance for each section

## 6. Integration and Styling

- [x] 6.1 Add Mermaid CSS styling to main.css for diagram rendering
- [x] 6.2 Link case studies from project pages
  - [x] 6.2.1 Add "Read Case Study" link to /projects/aws-pipeline.md
  - [x] 6.2.2 Add "Read Case Study" link to /projects/sentiment-analysis.md
  - [x] 6.2.3 Add "Read Case Study" link to /projects/churn-prediction.md
- [x] 6.3 Test all case study pages render correctly
- [x] 6.4 Verify Mermaid diagrams render in light and dark modes
- [x] 6.5 Commit and push changes
