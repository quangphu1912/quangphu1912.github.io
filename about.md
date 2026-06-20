---
layout: page
title: About
description: Learn more about my background and expertise
image: /assets/images/hero/profile.jpg
image_alt: "Phu Le — AI & Data Engineer"
---

{% include profile-avatar.html image=page.image alt=page.image_alt loading="eager" %}

<div class="identity-block">
  <div class="identity-name">Phu Le</div>
  <div class="identity-title">AI &amp; Data Engineer</div>
  <div class="identity-loc">Toronto, CA</div>
  <div class="cert-chips">
    <span class="chip">AWS Data Engineer</span>
    <span class="chip">AWS Solutions Architect</span>
    <span class="chip">CFA</span>
  </div>
</div>

## The Story

I build the cloud data platforms that power AI/ML — production ETL pipelines, data warehousing, and the data-quality infrastructure that makes downstream ML trustworthy. My path is unconventional and that's the edge: seven years moving from Big-4 audit and M&A consulting (PwC, Deloitte) into FP&amp;A and analytics, and now into cloud-native data engineering and AI.

That finance foundation means I don't just ship pipelines — I tie them to P&L, risk, and reporting outcomes the business actually measures.

<p class="pullquote">I build the cloud data platforms that power AI/ML.</p>

## Experience

<div class="experience-item">
  <div class="flex justify-between experience-item-header">
    <h3>Data Scientist — Bank of Montreal</h3>
    <span class="experience-date">Sep 2024 – Present</span>
  </div>
  <ul class="experience-description">
    <li>Designed and deployed AWS-native ETL pipelines orchestrated via MWAA, ingesting from RDS, Redshift, and S3 into production datamarts — ~3M records daily in ~7 min, stable production uptime.</li>
    <li>Replaced manual weekly data loading with automated scheduled pipelines; stood up data-quality monitoring for downstream AI/ML initiatives.</li>
  </ul>
</div>

<div class="experience-item">
  <div class="flex justify-between experience-item-header">
    <h3>Senior Financial Analyst — Bank of Montreal</h3>
    <span class="experience-date">May 2022 – Sep 2024</span>
  </div>
  <ul class="experience-description">
    <li>Automated capital reporting and variance analysis with SAS + Power BI (loan-level drill-down), cutting analysis time ~80%; supported RWA forecasting for Canadian P&amp;C Banking.</li>
    <li>Top 10% performer FY23; two Spotlight Awards for reporting modernization and Basel III implementation.</li>
  </ul>
</div>

<div class="experience-item">
  <div class="flex justify-between experience-item-header">
    <h3>Senior FP&A Specialist — Tiki Corp.</h3>
    <span class="experience-date">Apr 2020 – Apr 2022</span>
  </div>
  <ul class="experience-description">
    <li>Built profitability data pipelines with Airflow + BigQuery consolidating multi-source data into centralized reporting.</li>
    <li>Designed Google Data Studio dashboards for e-commerce categories generating ~$150M revenue at 20–30% growth.</li>
  </ul>
</div>

*Started in Big-4 audit and M&A consulting at PwC and Deloitte before moving into data and analytics.*

## Credentials

- **AWS Certified Data Engineer – Associate** (Nov 2025) — Glue, Step Functions, Kinesis, Lake Formation. [Verify on Credly →](https://www.credly.com/earner/earned/badge/2cbce644-127c-4ec5-8a1c-ca269f7a8ef7)
- **AWS Certified Solutions Architect – Associate** (Feb 2024) — VPC, EC2, Lambda, S3, RDS. [Verify on Credly →](https://www.credly.com/badges/3689c0cb-2b65-4186-8524-d37a5b229029)
- **CFA Charterholder** (May 2021) — top performer in Quantitative Methods, Derivatives, Economics, Asset Allocation.
- **MBA, Finance & Consulting — University of Missouri** (2016–2017) — Monte Carlo simulation for agricultural production optimization; 3rd place, Monsanto-Olin MBA Case Competition.
- **ERPM AI Champion** (BMO) — recognition for AI/ML platform impact. [Verify on Credly →](https://www.credly.com/badges/c9913967-d62f-4e6c-96a6-fac5f32b0393/public_url)
- **GCP skills profile** — Google Cloud Skills Boost public profile (skill badges & quests). [View profile →]({{ site.google_cloud_profile }})

## Currently

- Real-time ML inference & serving at scale (Amazon Bedrock)
- Automated ML pipelines and feature stores
- LLM tooling and CLI-assisted development

## Let's Connect

I'm always interested in data engineering, MLOps, and AI-platform opportunities. Reach me on [LinkedIn](https://linkedin.com/in/{{ site.linkedin_username }}) or [GitHub](https://github.com/{{ site.github_username }}).

<div class="contact-links flex gap-4 flex-center">
  <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
    LinkedIn
  </a>
  <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
    GitHub
  </a>
  <a href="{{ '/' | relative_url }}#contact" data-user="{{ site.email | split: '@' | first }}"
     data-domain="{{ site.email | split: '@' | last }}" class="btn btn-secondary">
    Email
  </a>
</div>
