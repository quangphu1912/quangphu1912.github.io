# Jekyll Site Local Testing Guide

This guide explains how to test your Jekyll portfolio site locally before deploying changes.

## Prerequisites

- Ruby installed (check with `ruby --version`)
- Bundler installed (`gem install bundler`)
- Jekyll dependencies installed (`bundle install`)

## Start Jekyll Development Server

### Basic Command

```bash
cd /Users/WangFu/GitHub/quangphu1912.github.io
bundle exec jekyll serve
```

### With Additional Options

```bash
# Serve on specific port (default is 4000)
bundle exec jekyll serve --port 4000

# Host publicly (accessible from other devices on network)
bundle exec jekyll serve --host 0.0.0.0

# Force rebuild of everything (useful if files aren't updating)
bundle exec jekyll serve --force_polling

# Combine options
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

## Access Your Site

Once the server is running, open your browser to:

- **Homepage**: http://localhost:4000
- **Projects**: http://localhost:4000/projects/
- **About**: http://localhost:4000/about/
- **Notebooks**: http://localhost:4000/notebooks/

## Testing Checklist

### Visual Regression Testing

After making CSS or layout changes, verify:

- [ ] Homepage displays correctly
- [ ] Hero section styling matches expectations
- [ ] Skills grid layout is intact
- [ ] Experience timeline formatting is correct
- [ ] Project cards display properly (both featured and regular)
- [ ] Footer and header appear as expected

### Dark Mode Testing

1. Open System Settings → Appearance → Dark
2. Refresh the browser page
3. Verify:
   - [ ] Background colors change appropriately
   - [ ] Text remains readable
   - [ ] All elements are visible
   - [ ] No color contrast issues

### Accessibility Testing

1. **Keyboard Navigation**
   - Press `Tab` to navigate through interactive elements
   - Verify:
     - [ ] Focus indicators are visible
     - [ ] Tab order is logical
     - [ ] All links and buttons are accessible

2. **Skip to Content Link**
   - Press `Tab` at page load
   - Verify:
     - [ ] "Skip to content" link appears
     - [ ] Pressing `Enter` jumps to main content

### Mobile Responsiveness

1. Open Chrome DevTools (`Cmd+Option+I` on Mac)
2. Click "Toggle device toolbar" icon or press `Cmd+Shift+M`
3. Test at different viewport widths:

   **Mobile (375px)**
   - [ ] Navigation menu is readable
   - [ ] Content is not cramped
   - [ ] Buttons are tappable (min 44px height)

   **Tablet (768px)**
   - [ ] Grid layouts adjust appropriately
   - [ ] Navigation works smoothly

   **Desktop (1024px+)**
   - [ ] Multi-column layouts display correctly

### Link Testing

Check all links work:

- [ ] Navigation links (Home, Projects, About)
- [ ] Project card links
- [ ] Social links (GitHub, LinkedIn)
- [ ] No broken links (check browser console for 404s)

### Cross-Browser Testing

Test in multiple browsers if possible:

- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari (if on Mac)

## Common Issues and Solutions

### Server Won't Start

**Problem**: `Command 'jekyll' not found`

**Solution**:
```bash
# Install dependencies
bundle install

# Try again
bundle exec jekyll serve
```

### Changes Not Appearing

**Problem**: You edited a file but changes aren't showing

**Solution**:
```bash
# Stop the server (Ctrl+C)
# Clean the build
bundle exec jekyll clean
# Restart with force polling
bundle exec jekyll serve --force_polling
```

### Port Already in Use

**Problem**: `Address already in use - bind(2) for "0.0.0.0:4000"`

**Solution**:
```bash
# Use a different port
bundle exec jekyll serve --port 4001
```

### Build Errors

**Problem**: Liquid syntax error or similar

**Solution**:
- Check for unclosed `{% %}` tags
- Verify include file syntax
- Check for YAML frontmatter errors
- Review error message for specific line number

## Deployment Workflow

After testing locally:

1. **Commit Changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. **Push to GitHub**
   ```bash
   git push origin feature/branch-name
   ```

3. **Verify on GitHub Pages**
   - Wait ~1-2 minutes for deployment
   - Visit `https://quangphu1912.github.io`
   - Verify production matches local testing

## Performance Tips

- Use `--incremental` flag for faster rebuilds during development
- Run `jekyll clean` periodically to remove old build artifacts
- Keep terminal output visible to catch build warnings

## Additional Resources

- [Jekyll Official Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Templating Language](https://shopify.github.io/liquid/)
