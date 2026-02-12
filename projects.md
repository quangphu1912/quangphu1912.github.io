---
layout: page
title: Projects
description: Explore my data science and machine learning projects
---

<div class="projects-grid grid grid-cols-1">
  {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
  {% assign featured_projects = sorted_projects | where: 'featured', true %}
  
  {% if featured_projects.size > 0 %}
  <section class="featured-projects" style="margin-bottom: var(--space-8);">
    <h2 style="margin-bottom: var(--space-4);">Featured Projects</h2>
    <div class="grid grid-cols-1">
      {% for project in featured_projects %}
      <article class="project-card card">
        {% if project.image %}
        <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--border-radius-sm); margin-bottom: var(--space-2);">
        {% endif %}
        
        <h3 class="card-title">
          <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
        </h3>
        
        <p class="card-description">{{ project.description }}</p>
        
        {% if project.tags %}
        <div class="project-tags flex gap-2" style="flex-wrap: wrap; margin-top: var(--space-2);">
          {% for tag in project.tags %}
          <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
        
        <div style="margin-top: var(--space-3);">
          <a href="{{ project.url | relative_url }}" class="btn btn-primary">
            View Project →
          </a>
        </div>
      </article>
      {% endfor %}
    </div>
  </section>
  {% endif %}
  
  <section class="all-projects">
    <h2 style="margin-bottom: var(--space-4);">All Projects</h2>
    <div class="grid grid-cols-1">
      {% for project in sorted_projects %}
        {% unless project.featured %}
        <article class="project-card card">
          {% if project.image %}
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--border-radius-sm); margin-bottom: var(--space-2);">
          {% endif %}
          
          <h3 class="card-title">
            <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
          </h3>
          
          <p class="card-description">{{ project.description }}</p>
          
          {% if project.tags %}
          <div class="project-tags flex gap-2" style="flex-wrap: wrap; margin-top: var(--space-2);">
            {% for tag in project.tags %}
            <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
          {% endif %}
          
          <div style="margin-top: var(--space-3);">
            <a href="{{ project.url | relative_url }}" class="btn btn-secondary">
              View Project →
            </a>
          </div>
        </article>
        {% endunless %}
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
