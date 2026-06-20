---
layout: default
title: Projects
description: Selected data engineering and AI work — production pipelines, cloud platforms, and ML systems.
image: /assets/images/hero/projects_index.webp
image_alt: "Data visualization abstract blue analytics dashboard"
---

<div class="container">
  <header class="page-header page-header--spaced">
    <p class="eyebrow page-eyebrow">SELECTED WORK</p>
    <h1>Things I've built</h1>
    <p class="page-description">Production data platforms, ETL pipelines, and AI/ML systems — a few representative projects.</p>
  </header>

  <div class="section-sm">
    {% assign featured = site.projects | where: 'featured', true | sort: 'date' | reverse %}
    {% assign rest = site.projects | where_exp: 'p', 'p.featured != true' | sort: 'date' | reverse %}
    {% assign sorted_projects = featured | concat: rest %}
    <div class="work-grid" data-reveal>
      {% for project in sorted_projects %}
        {% include project-card.html project=project %}
      {% endfor %}
    </div>
  </div>
</div>
