---
description: View git workflow requirements for this repository
---

## Git Workflow: Feature → Develop → Master

This repository uses a **three-branch workflow** to ensure production stability and enable testing.

### Branch Structure

```
master (production)     ← Auto-deploys to https://quangphu1912.github.io
  ↑
develop (staging)       ← Integration & testing
  ↑
  ├── fix-code-quality
  ├── add-github-repos
  ├── create-technical-blog
  ├── add-case-studies
  └── add-llm-rag-project
```

### Workflow

#### 1. Create feature branch from develop

```bash
# Ensure on develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b <change-name>
```

**WHY**: Feature branches isolate work from develop (staging) and master (production).

#### 2. Implement changes on feature branch

- Work locally, commit frequently
- Push to remote for backup (NOT deployment)
- Test with `bundle exec jekyll serve`

#### 3. Merge to develop for testing

```bash
# Checkout develop
git checkout develop

# Merge feature branch
git merge <change-name>

# Push to staging
git push origin develop
```

**TEST on develop branch:**
- Switch GitHub Pages to develop branch temporarily (Settings → Pages → Branch)
- OR test locally: `bundle exec jekyll serve`
- Verify all pages, dark mode, and responsiveness

#### 4. Merge develop to master for production

```bash
# Checkout master
git checkout master

# Merge develop (only when tested and ready)
git merge develop

# Push to remote (triggers deployment)
git push origin master
```

**DEPLOYS**: GitHub Pages automatically deploys master to production.

---

## Requirements

See formal requirements: `openspec/specs/git-workflow/spec.md`

- ✅ Feature branches created from develop
- ✅ All work done on feature branches
- ✅ Merge to develop for testing
- ✅ Test on develop before master
- ✅ Master reserved for production

---

## Status Check

### View current branches and changes

```bash
# List all branches
git branch -a

# List all OpenSpec changes
openspec list
```

### Switch GitHub Pages branch

**To test develop branch:**
1. Go to: https://github.com/quangphu1912/quangphu1912.github.io/settings/pages
2. Build and deployment → Source: `develop`
3. Save and test at: https://quangphu1912.github.io

**To deploy to production:**
1. Switch back to: `master` branch in settings
2. Save and deploy to: https://quangphu1912.github.io

---

## Example: Complete Workflow

```bash
# 1. Start new change
git checkout develop
git checkout -b fix-code-quality

# 2. Implement tasks (work on feature branch)
# ... commits ...

# 3. Merge to develop for testing
git checkout develop
git merge fix-code-quality
git push origin develop

# 4. Test on develop (switch GitHub Pages or local jekyll serve)
# Verify changes work correctly

# 5. Merge to master for production
git checkout master
git merge develop
git push origin master  # Deploys to production!

# 6. Clean up (optional)
git branch -d fix-code-quality
```

---

## Important Rules

- ❌ **NEVER** commit directly to master
- ❌ **NEVER** commit directly to develop
- ✅ **ALWAYS** create feature branch from develop
- ✅ **ALWAYS** test on develop before master
- ✅ **ONLY** merge to master when ready for production
