## Context

**Current State**: Three portfolio projects (aws-pipeline, sentiment-analysis, churn-prediction) are described in markdown with code snippets and results, but no working GitHub repositories exist. Recruiters and hiring managers cannot verify code quality, engineering practices, or implementation details.

**Constraints**:
- Must not expose proprietary BMO code (projects should be personal/demonstration code)
- Should follow industry best practices for ML project structure
- CI/CD should use free tier services (GitHub Actions, no paid tools)
- Documentation must be comprehensive but not overwhelming

**Stakeholders**: Portfolio owner (needs to showcase skills), recruiters (need to verify technical competence), collaborators (need to understand and contribute)

## Goals / Non-Goals

**Goals:**
- Create 3 public GitHub repositories with production-quality code
- Demonstrate full-stack ML competence (data → model → deployment)
- Show engineering best practices (testing, CI/CD, documentation)
- Enable collaboration and code review
- Provide reproducible environments with requirements.txt and environment.yml
- Create model cards for transparency on performance and limitations

**Non-Goals:**
- Publishing proprietary work code from BMO
- Creating new ML projects (refactor existing implementations)
- Achieving production-grade performance (demo/portfolio quality is acceptable)
- Adding complex infrastructure (simple deploy on free tiers)

## Decisions

**Repository Structure**
- **Decision**: Use ML project standard structure:
  ```
  project-name/
  ├── src/              # Source code (Python modules)
  ├── notebooks/         # Jupyter notebooks (EDA, experiments)
  ├── tests/             # Unit tests (pytest)
  ├── data/              # Data files (gitignored)
  ├── models/            # Trained models (gitignored)
  ├── docs/              # Documentation, images
  ├── requirements.txt    # Python dependencies
  ├── environment.yml     # Conda environment
  ├── README.md           # Project documentation
  ├── .github/           # GitHub Actions workflows
  └── pyproject.toml     # Project metadata
  ```
- **Rationale**: Follows Cookiecutter Data Science template, industry standard
- **Alternative considered**: Flat structure - rejected as hard to navigate for larger projects

**CI/CD Pipeline**
- **Decision**: GitHub Actions with 3 workflows:
  - `lint.yml` - ruff for Python linting on every push
  - `test.yml` - pytest with coverage reporting
  - `deploy.yml` - Optional: auto-deploy documentation or model
- **Rationale**: Free, integrated with GitHub, industry standard
- **Alternative considered**: Travis CI, CircleCI - rejected as less integrated

**Code Quality Standards**
- **Decision**: Enforce with pre-commit hooks:
  - ruff (fast Python linter)
  - black (code formatter)
  - isort (import sorting)
- **Rationale**: Catch issues before commit, consistent code style
- **Alternative considered**: Manual reviews - rejected as error-prone

**Documentation Strategy**
- **Decision**: Comprehensive README.md with sections:
  - Project Overview & Business Problem
  - Architecture Diagram (Mermaid)
  - Setup/Installation Instructions
  - Usage Examples
  - Model Performance Metrics (with visualizations)
  - Sample Outputs/Results
  - Links to Live Demo (if applicable)
  - Contributing Guidelines
- **Rationale**: Recruiters spend 2-3 minutes reviewing, need quick understanding
- **Alternative considered**: Minimal README - rejected as insufficient for senior roles

**Model Card Template**
- **Decision**: Create model_card.md for each ML project with:
  - Model Details (type, version, training date)
  - Intended Use & Use Cases
  - Performance Metrics (accuracy, precision, recall, F1, AUC)
  - Limitations & Biases
  - Ethical Considerations
  - Training Data Summary
- **Rationale**: Transparency, aligns with ML ethics best practices
- **Reference**: Model Cards for Model Reporting (Mitchell et al., 2019)

## Risks / Trade-offs

**Risk: Code quality not up to senior level**
- **Mitigation**: Review code against PEP 8, use type hints, add docstrings, run tests before pushing

**Risk: Exposing proprietary algorithms**
- **Mitigation**: Only publish personal/demonstration code. If using BMO work, create simplified demo version that demonstrates concepts without IP.

**Trade-off: Time investment vs. quality**
- **Analysis**: 3-4 days per repo for comprehensive setup. Total ~2 weeks for all 3.
- **Decision**: Prioritize quality over speed. One excellent repo > three mediocre repos.

**Risk: CI/CD costs on GitHub Actions**
- **Mitigation**: Free tier provides 2000 minutes/month. Sufficient for 3 repos with lightweight tests.

**Risk: Documentation becoming outdated**
- **Mitigation**: Add "Last Updated" date to README, create checklist for updates when code changes

## Migration Plan

**Phase 1: Repository Setup (Day 1-2 per repo)**
1. Create GitHub repository
2. Initialize with standard structure
3. Add .gitignore (Python template)
4. Create requirements.txt and environment.yml
5. Set up pyproject.toml
6. Write comprehensive README.md

**Phase 2: Code Implementation (Day 3-7 per repo)**
1. Port/refactor code from portfolio to repository
2. Add type hints and docstrings
3. Create src/ module structure
4. Add unit tests (tests/ with pytest)
5. Create notebooks/ for exploratory analysis
6. Generate visualizations/plots

**Phase 3: CI/CD & Quality (Day 8-10 per repo)**
1. Create GitHub Actions workflows (lint, test)
2. Set up pre-commit hooks
3. Run linting and fix issues
4. Achieve >80% test coverage
5. Create model_card.md
6. Add architecture diagram (Mermaid)

**Phase 4: Integration (Day 11-12)**
1. Update portfolio _projects/*.md with repo links
2. Add "View on GitHub" buttons to project pages
3. Test all links work
4. Update portfolio with new code examples from repos

**Rollback Strategy**: Repositories are new, so no rollback needed. If issues found, continue improving in public (git history shows iterations).

## Open Questions

- [ ] Should repos use organization account or personal account? (Recommend: personal for portfolio)
- [ ] Should we include sample data in repos or link to external sources? (Recommend: small sample data, link to full datasets)
- [ ] Should we implement actual deployment (e.g., Hugging Face Spaces, Streamlit Cloud) or just show local deployment instructions? (Recommend: start with instructions, add deployment if time permits)
