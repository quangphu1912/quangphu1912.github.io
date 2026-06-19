---
layout: page
title: "Projects"
description: "In-depth technical breakdowns of AI & Data Engineering projects — architecture decisions, business impact, and lessons learned."
image: /assets/images/hero/case_studies_index.webp
image_alt: "Data engineering architecture portfolio overview"
image_credit: "Photo by Scott Graham on Unsplash"
image_url: "https://unsplash.com/@scottgraham"
---

{% include image-hero.html image=page.image alt=page.image_alt title=page.title %}

<div class="container section">
  <div class="grid grid-cols-1 gap-8">
    {% assign portfolio_sorted = site.portfolio | sort: "date" | reverse %}
    {% for item in portfolio_sorted %}
      {% include project-card.html project=item %}
    {% endfor %}
  </div>
</div>
