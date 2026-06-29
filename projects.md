---
layout: default
title: Projects
description: Selected data engineering and AI work - production pipelines, cloud platforms, and ML systems.
image: /assets/images/hero/projects_index.webp
image_alt: "Data visualization abstract blue analytics dashboard"
---

<section class="projects-hero">
  <div class="container projects-hero__inner">
    <p class="eyebrow">Selected work</p>
    <h1 class="projects-hero__title">Things I've built</h1>
    <p class="projects-hero__lead">Production data platforms, ETL pipelines, and AI/ML systems.</p>
    <ul class="projects-hero__cats" aria-label="Disciplines">
      <li class="projects-hero__cat">Data Engineering</li>
      <li class="projects-hero__cat">Machine Learning</li>
      <li class="projects-hero__cat">Analytics &amp; BI</li>
    </ul>
  </div>
  {% include scroll-cue.html target="work" label="Scroll to projects" %}
</section>

<div class="container">
  <div id="work" class="section-sm">
    {% include project-list.html %}
  </div>
</div>
