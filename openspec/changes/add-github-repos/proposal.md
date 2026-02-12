## Why

Projects describe code and ML implementations but don't link to working GitHub repositories. For a Senior Data Scientist role, seeing production-quality code structure, tests, CI/CD pipelines, and documentation is essential. Without visible code, the portfolio appears as "hobbyist" rather than "professional" level. Making the code accessible will demonstrate engineering best practices, enable collaboration, and provide tangible proof of technical claims.

## What Changes

- **Create GitHub repositories** for all 3 existing projects (aws-pipeline, sentiment-analysis, churn-prediction)
- **Add comprehensive READMEs** with architecture diagrams, setup instructions, and performance metrics
- **Implement CI/CD pipelines** using GitHub Actions (linting, testing, deployment)
- **Add model cards** documenting model performance, limitations, and ethical considerations
- **Include requirements.txt** and environment.yml for reproducibility
- **Structure repos** with proper directories (src/, tests/, notebooks/, docs/)
- **Link repositories** from portfolio project pages

## Capabilities

### New Capabilities

- `github-repo-structure`: Standard repository template with README, CI/CD, and documentation
- `model-documentation`: Model cards providing transparency on model performance, limitations, and ethical considerations
- `reproducible-environments`: Requirements files and environment setup for consistent dependencies
- `continuous-integration`: Automated testing and linting pipelines for code quality

### Modified Capabilities

None (new external repositories, no changes to portfolio spec behavior)

## Impact

- **New repositories**: 3 GitHub repos (quangphu1912/aws-ml-pipeline, quangphu1912/sentiment-analysis-ml, quangphu1912/churn-prediction-ml)
- **Portfolio changes**: Add repo links to _projects/*.md files, update project layouts
- **Documentation**: README.md, requirements.txt, environment.yml, model_card.md for each project
- **CI/CD**: .github/workflows/ directories with test and lint workflows
- **Demonstrated skills**: Version control, testing, documentation, DevOps practices
