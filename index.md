---
layout: default
title: Home
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
    <h2 class="section-title">Selected work</h2>
    {% assign featured = site.projects | where: 'featured', true | sort: 'date' | reverse %}
    {% assign rest = site.projects | where_exp: 'p', 'p.featured != true' | sort: 'date' | reverse %}
    {% assign teaser = featured | concat: rest %}
    <div class="grid grid-cols-1 gap-8">
      {% for project in teaser limit: 2 %}
        {% include project-card.html project=project %}
      {% endfor %}
    </div>
    <p class="lede" style="margin-top: var(--space-4)"><a href="{{ '/projects/' | relative_url }}">View all projects →</a></p>
  </div>
</section>
