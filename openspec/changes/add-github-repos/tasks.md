## 1. Repository Setup

- [ ] 1.1 Read design.md to understand repo structure and CI/CD approach
- [ ] 1.2 Read specs to understand requirements for repo structure, documentation, and CI/CD
- [ ] 1.3 Create GitHub repository: quangphu1912/aws-ml-pipeline
- [ ] 1.4 Create GitHub repository: quangphu1912/sentiment-analysis-ml
- [ ] 1.5 Create GitHub repository: quangphu1912/churn-prediction-ml

## 2. AWS Pipeline Repository

- [ ] 2.1 Initialize with standard structure: mkdir -p src tests notebooks data models docs
- [ ] 2.2 Create .gitignore using Python template (exclude data/, models/, __pycache__/, .ipynb_checkpoints/)
- [ ] 2.3 Create requirements.txt with dependencies: boto3, pandas, sqlalchemy, pytest
- [ ] 2.4 Create environment.yml with conda dependencies
- [ ] 2.5 Create pyproject.toml with project metadata
- [ ] 2.6 Create README.md with sections: Overview, Architecture, Setup, Usage, Metrics
- [ ] 2.7 Add Mermaid architecture diagram to README.md
- [ ] 2.8 Create model_card.md with performance metrics, limitations, ethical considerations

## 3. Sentiment Analysis Repository

- [ ] 3.1 Initialize with standard structure: mkdir -p src tests notebooks data models docs
- [ ] 3.2 Create .gitignore using Python template
- [ ] 3.3 Create requirements.txt with dependencies: transformers, torch, scikit-learn, flask, pytest
- [ ] 3.4 Create environment.yml with conda dependencies
- [ ] 3.5 Create pyproject.toml with project metadata
- [ ] 3.6 Create README.md with architecture diagram and setup instructions
- [ ] 3.7 Add Mermaid model architecture diagram to README.md
- [ ] 3.8 Create model_card.md with BERT model details, performance metrics, limitations

## 4. Churn Prediction Repository

- [ ] 4.1 Initialize with standard structure: mkdir -p src tests notebooks data models docs
- [ ] 4.2 Create .gitignore using Python template
- [ ] 4.3 Create requirements.txt with dependencies: xgboost, pandas, numpy, scikit-learn, pytest
- [ ] 4.4 Create environment.yml with conda dependencies
- [ ] 4.5 Create pyproject.toml with project metadata
- [ ] 4.6 Create README.md with architecture diagram and setup instructions
- [ ] 4.7 Add Mermaid feature engineering diagram to README.md
- [ ] 4.8 Create model_card.md with XGBoost model details, performance metrics, limitations

## 5. CI/CD Configuration

- [ ] 5.1 Create .github/workflows/lint.yml for ruff linting (AWS repo)
- [ ] 5.2 Create .github/workflows/test.yml for pytest with coverage (AWS repo)
- [ ] 5.3 Create .github/workflows/lint.yml for ruff linting (Sentiment repo)
- [ ] 5.4 Create .github/workflows/test.yml for pytest with coverage (Sentiment repo)
- [ ] 5.5 Create .github/workflows/lint.yml for ruff linting (Churn repo)
- [ ] 5.6 Create .github/workflows/test.yml for pytest with coverage (Churn repo)
- [ ] 5.7 Create .pre-commit-config.yaml for ruff, black, isort (all repos)
- [ ] 5.8 Add CI status badges to all 3 README.md files

## 6. Code Implementation

- [ ] 6.1 Port AWS pipeline code to src/ directory with type hints and docstrings
- [ ] 6.2 Port sentiment analysis code to src/ directory with type hints and docstrings
- [ ] 6.3 Port churn prediction code to src/ directory with type hints and docstrings
- [ ] 6.4 Create tests/ directory with unit tests for each repo (target >80% coverage)
- [ ] 6.5 Add notebooks/ with exploratory analysis for each project
- [ ] 6.6 Generate performance visualizations for each project

## 7. Portfolio Integration

- [ ] 7.1 Update _projects/aws-pipeline.md with GitHub repo link
- [ ] 7.2 Update _projects/sentiment-analysis.md with GitHub repo link
- [ ] 7.3 Update _projects/churn-prediction.md with GitHub repo link
- [ ] 7.4 Add "View on GitHub" buttons to project pages
- [ ] 7.5 Test all repo links work
