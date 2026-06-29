---
layout: default
title: Projects
description: Selected data engineering and AI work - production pipelines, cloud platforms, and ML systems.
image: /assets/images/hero/projects_index.webp
image_alt: "Data visualization abstract blue analytics dashboard"
---

<section class="projects-hero">
  <div class="container projects-hero__inner">
    <h1 class="projects-hero__title">Things I've built</h1>
    <p class="projects-hero__lead">Production data platforms, ETL pipelines, and AI/ML systems.</p>
    <ul class="projects-hero__cats" aria-label="Work by category">
      <li class="projects-hero__cat projects-hero__cat--data">Data Engineering</li>
      <li class="projects-hero__cat projects-hero__cat--ml">Machine Learning</li>
      <li class="projects-hero__cat projects-hero__cat--bi">Analytics &amp; BI</li>
    </ul>
  </div>
  {% include scroll-cue.html target="work" label="Scroll to projects" %}
</section>

<div class="container">
  <div id="work" class="section-sm">
    {% include project-list.html %}
  </div>
</div>
