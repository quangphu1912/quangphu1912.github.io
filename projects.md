---
layout: page
title: Projects
description: Explore my data science and machine learning projects
image: /assets/images/hero/projects_index.webp
image_alt: "Data visualization abstract blue analytics dashboard"
image_credit: "Photo by Clément Hélardot on Unsplash"
image_url: "https://unsplash.com/@clemhlrdt"
---

{% include image-hero.html image=page.image alt=page.image_alt title=page.title %}

<div class="projects-grid grid grid-cols-1">
  {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
  {% assign featured_projects = sorted_projects | where: 'featured', true %}

  {% if featured_projects.size > 0 %}
  <section class="featured-projects">
    <h2 class="project-section-title">Featured Projects</h2>
    <div class="grid grid-cols-1">
      {% for project in featured_projects %}
        {% include project-card.html project=project featured=true %}
      {% endfor %}
    </div>
  </section>
  {% endif %}

  <section class="all-projects">
    <h2 class="project-section-title">All Projects</h2>
    <div class="grid grid-cols-1">
      {% for project in sorted_projects %}
        {% unless project.featured %}
          {% include project-card.html project=project featured=false %}
        {% endunless %}
      {% endfor %}
    </div>
  </section>
</div>