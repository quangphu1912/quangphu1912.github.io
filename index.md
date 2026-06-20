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
   creds="AWS Certified Data Engineer · Solutions Architect · CFA"
   show_cta=true %}

 <!-- Metrics Strip -->
<section class="metrics-strip section-sm" data-reveal>
  <div class="container">
    <span class="eyebrow">Impact</span>
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

 <!-- Selected Work -->
<section class="section-sm section-tinted" data-reveal>
  <div class="container">
    <span class="eyebrow">Projects</span>
    <h2 class="section-title">Selected Work</h2>
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

 <!-- Contact Section -->
<section id="contact" class="contact-section section-lg" data-reveal>
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
