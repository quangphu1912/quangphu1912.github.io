---
layout: default
title: Phu Le - AI & Data Engineer
description: AI & Data Engineer | Production data pipelines, cloud-native ETL, MLOps
image: /assets/images/hero/hero.webp
image_alt: "Hero background"
---

{% include hero-home.html
   eyebrow="DATA & AI ENGINEER · TORONTO · AWS CERTIFIED"
   title="Phu Le"
   lead="I build the cloud data platforms that power AI, production pipelines and the data-quality infrastructure that makes downstream ML trustworthy."
   cue_target="glance" %}

 <!-- Metrics Strip -->
<section id="glance" class="metrics-strip section-sm" data-reveal>
  <div class="container">
    <p class="eyebrow">BY THE NUMBERS</p>
    <h2 class="section-title">At a Glance</h2>
    <div class="metrics-grid">
      <div class="metric-cell"><span class="metric metric-figure"><span data-countup="7">7</span>+</span><span class="metric-label">YEARS EXPERIENCE</span></div>
      <div class="metric-cell"><span class="metric metric-figure">~<span data-countup="3">3</span>M</span><span class="metric-label">RECORDS / DAY</span></div>
      <div class="metric-cell"><span class="metric metric-figure">~<span data-countup="80">80</span>%</span><span class="metric-label">ANALYSIS TIME CUT</span></div>
      <div class="metric-cell"><span class="metric metric-figure">$<span data-countup="150">150</span>M</span><span class="metric-label">REVENUE INFLUENCED</span></div>
    </div>
  </div>
</section>

 <!-- Selected Work -->
<section class="section-sm">
  <div class="container">
    <p class="eyebrow">FEATURED</p>
    <h2 class="section-title">Selected work</h2>
  </div>
  {% assign featured = site.projects | where: 'featured', true | sort: 'date' | reverse %}
  {% assign rest = site.projects | where_exp: 'p', 'p.featured != true' | sort: 'date' | reverse %}
  {% assign teaser = featured | concat: rest %}
  <div class="container">
    <div class="work-rows">
      {% for project in teaser %}
        {% include project-card.html project=project %}
      {% endfor %}
    </div>
  </div>
  <div class="container">
    <p class="lede" style="margin-top: var(--space-3)"><a href="{{ '/projects/' | relative_url }}">View all projects →</a></p>
  </div>
</section>
