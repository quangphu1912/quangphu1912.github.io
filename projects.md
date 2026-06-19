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

<div class="container section">
  {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
  <div class="grid grid-cols-1 gap-8">
    {% for project in sorted_projects %}
      {% include project-card.html project=project %}
    {% endfor %}
  </div>
</div>