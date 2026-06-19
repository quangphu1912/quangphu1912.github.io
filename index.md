---
layout: default
title: Home
description: AI & Data Engineer | Production data pipelines, cloud-native ETL, MLOps
image: /assets/images/hero/hero.webp
image_alt: "Hero background"
---

{% include image-hero.html image=page.image alt=page.image_alt
   title="Phu Le" subtitle="AI & Data Engineer"
   lead="Production data pipelines & AI systems."
   creds="GCP Professional Data Engineer · AWS Solutions Architect"
   show_cta=true %}

 <!-- Metrics Strip -->
<section class="metrics-strip section-sm" data-reveal>
  <div class="container">
    <span class="eyebrow">Impact</span>
    <h2 class="section-title">At a Glance</h2>
    <div class="metrics-grid">
      <div class="metric-cell"><span class="metric metric-figure">7+</span><span class="metric-label">EXPERIENCE</span></div>
      <div class="metric-cell"><span class="metric metric-figure">10M+</span><span class="metric-label">EVENTS / DAY</span></div>
      <div class="metric-cell"><span class="metric metric-figure">98%</span><span class="metric-label">LATENCY REDUCTION</span></div>
      <div class="metric-cell"><span class="metric metric-figure">$240K+</span><span class="metric-label">ANNUAL IMPACT</span></div>
    </div>
  </div>
</section>

 <!-- Testimonials Section -->
<section class="testimonials-section section-sm" data-reveal>
  <div class="container">
    <span class="eyebrow">Proof</span>
    <h2 class="section-title">What collaborators say</h2>
    <div class="testimonials-grid">
      {% for t in site.data.testimonials %}
      {% include testimonial-card.html quote=t.quote author=t.author context=t.context source=t.source %}
      {% endfor %}
    </div>
  </div>
</section>

 <!-- Skills Section -->
<section class="skills-section section-sm section-tinted" data-reveal>
  <div class="container">
    <span class="eyebrow">Skills</span>
    <h2 class="section-title">Skills & Expertise</h2>
    
    <div class="skills-grid grid grid-cols-1">
      {% for skill in site.data.skills %}
      <div class="skill-category card" data-reveal>
        <h3 class="card-title">{{ skill.category }}</h3>
        <div class="flex gap-2 skills-tags">
          {% for item in skill.items %}
          <span class="tag">{{ item }}</span>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

 <!-- Experience Section -->
<section class="experience-section section" data-reveal>
  <div class="container">
    <span class="eyebrow">Experience</span>
    <h2 class="section-title">Experience</h2>
    
    <div class="experience-timeline">
      <div class="experience-item" data-reveal>
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
      
      <div class="experience-item" data-reveal>
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
      
      <div class="experience-item" data-reveal>
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
<section class="education-section section-sm section-tinted" data-reveal>
  <div class="container">
    <span class="eyebrow">Credentials</span>
    <h2 class="section-title">Education & Certifications</h2>

    <div class="grid grid-cols-1 prose">
      <div class="card">
        <span class="cert-badge">GCP Professional Data Engineer</span>
        <p class="meta-text">
          <a href="{{ site.google_cloud_profile }}" target="_blank" rel="noopener noreferrer">View profile →</a>
        </p>
      </div>
      <div class="card">
        <span class="cert-badge">AWS Certified Solutions Architect</span>
      </div>
      <div class="card">
        <h3 class="card-title">MBA</h3>
        <p class="meta-text">Business Administration</p>
      </div>
      <div class="card">
        <h3 class="card-title">CFA Charterholder</h3>
        <p class="meta-text">Chartered Financial Analyst</p>
      </div>
    </div>
  </div>
</section>

 <!-- Contact Section -->
<section class="contact-section section-lg" data-reveal>
  <div class="container text-center">
    <span class="eyebrow">Contact</span>
    <h2 class="contact-heading">Let's Connect</h2>
    <p class="lede contact-lede">
      Interested in collaborating on AI & Data Engineering projects? Reach out on LinkedIn or explore my work on GitHub.
    </p>

    <div class="contact-links flex gap-4 flex-center">
      <a href="https://linkedin.com/in/{{ site.linkedin_username }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        LinkedIn
      </a>
      <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        GitHub
      </a>
      <a href="#contact" data-user="{{ site.email | split: '@' | first }}"
         data-domain="{{ site.email | split: '@' | last }}" class="btn btn-secondary">
        Email
      </a>
    </div>
  </div>
</section>
