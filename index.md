---
layout: default
title: Home
description: Data Scientist & ML Engineer | Python, TensorFlow, Cloud ML
image: /assets/images/hero/hero.webp
image_alt: "Modern office workspace with professional blue tones"
---

{% include image-hero.html image=page.image alt=page.image_alt title="Phu Le" subtitle="Data Scientist & ML Engineer" %}

<div class="container">
  <div class="hero-section">
    <p class="hero-description">
      Senior Analyst at BMO Financial Group with 7+ years of experience in analytics, strategy, and financial analysis.
      CFA charterholder and MBA graduate specializing in machine learning and cloud-based solutions.
    </p>
    
    <div class="cta-buttons flex gap-4">
      <a href="{{ '/projects/' | relative_url }}" class="btn btn-primary">
        View Projects
      </a>
      <!-- TODO: Add resume.pdf to /pdf/ directory -->
      <!-- <a href="{{ '/pdf/resume.pdf' | relative_url }}" class="btn btn-secondary" download>
         Download Resume
      </a> -->
    </div>
  </div>
</div>

 <!-- Skills Section -->
<section class="skills-section section-sm section-tinted">
  <div class="container">
    <h2 class="section-title">Skills & Expertise</h2>
    
    <div class="skills-grid grid grid-cols-1">
      <div class="skill-category card">
        <h3 class="card-title">Machine Learning & AI</h3>
        <div class="flex gap-2 skills-tags">
          <span class="tag">Python</span>
          <span class="tag">TensorFlow</span>
          <span class="tag">PyTorch</span>
          <span class="tag">Scikit-learn</span>
          <span class="tag">NLP</span>
          <span class="tag">Computer Vision</span>
        </div>
      </div>
      
      <div class="skill-category card">
        <h3 class="card-title">Data Engineering & Analytics</h3>
        <div class="flex gap-2 skills-tags">
          <span class="tag">SQL</span>
          <span class="tag">PostgreSQL</span>
          <span class="tag">Pandas</span>
          <span class="tag">NumPy</span>
          <span class="tag">Data Visualization</span>
          <span class="tag">ETL Pipelines</span>
        </div>
      </div>
      
      <div class="skill-category card">
        <h3 class="card-title">Cloud & DevOps</h3>
        <div class="flex gap-2 skills-tags">
          <span class="tag">AWS</span>
          <span class="tag">GCP</span>
          <span class="tag">Docker</span>
          <span class="tag">Git</span>
          <span class="tag">CI/CD</span>
        </div>
      </div>
      
      <div class="skill-category card">
        <h3 class="card-title">Finance & Business</h3>
        <div class="flex gap-2 skills-tags">
          <span class="tag">CFA</span>
          <span class="tag">Financial Analysis</span>
          <span class="tag">Strategy</span>
          <span class="tag">Risk Management</span>
        </div>
      </div>
    </div>
  </div>
</section>

 <!-- Experience Section -->
<section class="experience-section section">
  <div class="container">
    <h2 class="section-title">Experience</h2>
    
    <div class="experience-timeline">
      <div class="experience-item">
        <div class="flex justify-between experience-item-header">
          <h3>Senior Analyst</h3>
          <span class="experience-date">2020 - Present</span>
        </div>
        <p class="experience-company">BMO Financial Group</p>
        <ul class="experience-description">
          <li>Led analytics initiatives driving strategic decision-making</li>
          <li>Developed ML models for risk assessment and forecasting</li>
          <li>Collaborated with cross-functional teams on data-driven projects</li>
        </ul>
      </div>
      
      <div class="experience-item">
        <div class="flex justify-between experience-item-header">
          <h3>Consultant</h3>
          <span class="experience-date">2018 - 2020</span>
        </div>
        <p class="experience-company">Deloitte & PwC</p>
        <ul class="experience-description">
          <li>Provided strategic advisory services to Fortune 500 clients</li>
          <li>Conducted financial analysis and business intelligence</li>
          <li>Delivered data-driven insights for operational improvements</li>
        </ul>
      </div>
      
      <div class="experience-item">
        <div class="flex justify-between experience-item-header">
          <h3>Analyst</h3>
          <span class="experience-date">2016 - 2018</span>
        </div>
        <p class="experience-company">Tiki Corporation</p>
        <ul class="experience-description">
          <li>Performed market research and competitive analysis</li>
          <li>Built dashboards and reporting systems</li>
          <li>Supported business strategy development</li>
        </ul>
      </div>
    </div>
  </div>
</section>

 <!-- Education Section -->
<section class="education-section section-sm section-tinted">
  <div class="container">
    <h2 class="section-heading-centered">Education & Certifications</h2>

    <div class="grid grid-cols-1 prose">
      <div class="card">
        <h3 class="card-title">MBA</h3>
        <p class="text-secondary">Business Administration</p>
      </div>

      <div class="card">
        <h3 class="card-title">CFA Charterholder</h3>
        <p class="text-secondary">Chartered Financial Analyst</p>
      </div>

      <div class="card">
        <h3 class="card-title">Google Cloud Certified</h3>
        <p class="text-secondary">
          <a href="{{ site.google_cloud_profile }}" target="_blank" rel="noopener noreferrer">
            View Profile →
          </a>
        </p>
      </div>
    </div>
  </div>
</section>

 <!-- Contact Section -->
<section class="contact-section section">
  <div class="container text-center">
    <h2 class="contact-heading">Let's Connect</h2>
    <p class="lede contact-lede">
      Interested in collaborating or discussing data science opportunities? Reach out through LinkedIn or explore my projects on GitHub.
    </p>

    <div class="contact-links flex gap-4 flex-center">
      <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        LinkedIn
      </a>
      <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        GitHub
      </a>
      <a href="mailto:{{ site.email }}" class="btn btn-secondary">
        Email
      </a>
    </div>
  </div>
</section>
