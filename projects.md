---
layout: page
title: Projects
description: Explore my data science and machine learning projects
---

<div class="projects-grid grid grid-cols-1">
  {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
  {% assign featured_projects = sorted_projects | where: 'featured', true %}
  

  {% endif %}
  
       <section class="all-projects">
     <h2 style="text-align: center;">All Projects</h2>
     <div class="grid grid-cols-1">
       {% for project in sorted_projects %}
         {% include project-card.html %}
       </article>
       {% endfor %}
     </div>
   </section>
</div>

<style>
@media (min-width: 640px) {
  .projects-grid .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
