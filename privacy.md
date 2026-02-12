---
layout: page
title: Privacy Policy
description: Privacy policy for analytics and data collection
---

## Privacy Policy

Last updated: {{ 'now' | date: "%B %d, %Y" }}

### Overview

This website is committed to protecting your privacy. This policy explains what data we collect and how it's used.

### Analytics

We use Google Analytics 4 to understand how visitors use our site. This helps us improve the content and user experience.

**Data Collected:**
- Pages visited
- Time spent on site
- Browser and device information
- Geographic location (city-level)
- Referral source

**Data NOT Collected:**
- Personal identifying information
- Email addresses
- Precise location data

### IP Anonymization

All IP addresses are anonymized before being stored, ensuring your privacy is protected.

### Cookies

We use cookies only for analytics purposes. These cookies:
- Track page views and sessions
- Remember your opt-out preference
- Expire after 2 years

### Opt-Out

You can opt out of analytics tracking at any time.

<div style="margin: var(--space-4) 0; padding: var(--space-4); background-color: var(--color-surface); border-radius: var(--border-radius);">
  <h4>Analytics Opt-Out</h4>
  <p id="opt-out-status" style="margin: var(--space-2) 0;"></p>
  <button id="opt-out-btn" class="btn btn-primary" onclick="toggleOptOut()">
    Loading...
  </button>
</div>

<script>
function toggleOptOut() {
  const isOptedOut = localStorage.getItem('analytics-opt-out') === 'true';
  
  if (isOptedOut) {
    localStorage.removeItem('analytics-opt-out');
    updateOptOutUI(false);
    alert('Analytics tracking enabled. Refresh the page for changes to take effect.');
  } else {
    localStorage.setItem('analytics-opt-out', 'true');
    updateOptOutUI(true);
    alert('Analytics tracking disabled. Refresh the page for changes to take effect.');
  }
}

function updateOptOutUI(isOptedOut) {
  const status = document.getElementById('opt-out-status');
  const btn = document.getElementById('opt-out-btn');
  
  if (isOptedOut) {
    status.textContent = 'Status: Analytics tracking is currently DISABLED';
    status.style.color = 'var(--color-accent)';
    btn.textContent = 'Enable Analytics';
    btn.className = 'btn btn-secondary';
  } else {
    status.textContent = 'Status: Analytics tracking is currently ENABLED';
    status.style.color = 'var(--color-primary)';
    btn.textContent = 'Disable Analytics';
    btn.className = 'btn btn-primary';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const isOptedOut = localStorage.getItem('analytics-opt-out') === 'true';
  updateOptOutUI(isOptedOut);
});
</script>

### Third-Party Services

- **Google Analytics**: [Privacy Policy](https://policies.google.com/privacy)
- **GitHub Pages**: [Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement)

### Data Retention

Analytics data is retained for 26 months, after which it is automatically deleted.

### Your Rights

You have the right to:
- Access your data
- Request data deletion
- Opt out of tracking
- Export your data

### Contact

For privacy-related questions, contact: {{ site.email }}

### Changes to This Policy

We may update this privacy policy from time to time. Changes will be posted on this page with an updated date.
