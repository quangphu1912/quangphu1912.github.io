---
layout: default
title: Phu Le — AI & Data Engineer
description: AI & Data Engineer | Production data pipelines, cloud-native ETL, MLOps
image: /assets/images/hero/hero.webp
image_alt: "Hero background"
---

{% include hero-home.html
   eyebrow="DATA & AI ENGINEER · TORONTO · AWS CERTIFIED"
   title="Phu Le"
   lead="I build the cloud data platforms that power AI — production pipelines and the data-quality infrastructure that makes downstream ML trustworthy." %}

 <!-- Metrics Strip -->
<section class="metrics-strip section-sm" data-reveal>
  <div class="container">
    <p class="eyebrow">BY THE NUMBERS</p>
    <h2 class="section-title">At a Glance</h2>
    <div class="metrics-grid">
      <div class="metric-cell"><span class="metric metric-figure">7+</span><span class="metric-label">YEARS EXPERIENCE</span></div>
      <div class="metric-cell"><span class="metric metric-figure">~3M</span><span class="metric-label">RECORDS / DAY</span></div>
      <div class="metric-cell"><span class="metric metric-figure">~80%</span><span class="metric-label">ANALYSIS TIME CUT</span></div>
      <div class="metric-cell"><span class="metric metric-figure">$150M</span><span class="metric-label">REVENUE INFLUENCED</span></div>
    </div>
  </div>
</section>

 <!-- Skills Section -->
<section class="skills-section section-sm section-tinted">
  <div class="container">
    <p class="eyebrow">TOOLKIT</p>
    <h2 class="section-title">Skills</h2>
    
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

 <!-- Selected Work -->
<section class="section-sm section-tinted">
  <div class="container">
    <p class="eyebrow">FEATURED</p>
    <h2 class="section-title">Selected work</h2>
  </div>
  {% assign featured = site.projects | where: 'featured', true | sort: 'date' | reverse %}
  {% assign rest = site.projects | where_exp: 'p', 'p.featured != true' | sort: 'date' | reverse %}
  {% assign teaser = featured | concat: rest %}
  <div class="work-scroller" data-reveal>
    {% for project in teaser %}
      {% include project-card.html project=project %}
    {% endfor %}
  </div>
  <div class="container">
    <p class="lede" style="margin-top: var(--space-3)"><a href="{{ '/projects/' | relative_url }}">View all projects →</a></p>
  </div>
</section>

 <!-- Closing invitation -->
<section class="closing" data-reveal>
  <div class="container closing__inner">
    <p class="eyebrow">GET IN TOUCH</p>
    <h2 class="closing__title">Let's build something that ships.</h2>
    <p class="closing__lead">Open to data engineering, MLOps, and AI-platform work — and always happy to talk shop.</p>
    <div class="cta-buttons flex gap-4">
      <a href="https://linkedin.com/in/{{ site.linkedin_username }}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Get in touch</a>
      <a href="{{ '/about/' | relative_url }}" class="btn btn-secondary">Read my story</a>
    </div>
  </div>
</section>
