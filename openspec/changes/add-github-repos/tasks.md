## 1. Repository Setup

- [x] 1.1 Read design.md to understand repo structure and CI/CD approach
- [x] 1.2 Read specs to understand requirements for repo structure, documentation, and CI/CD
- [x] 1.3 Clone GitHub repository: quangphu1912/aws-ml-pipeline to /Users/WangFu/GitHub/
- [x] 1.4 Clone GitHub repository: quangphu1912/sentiment-analysis-ml to /Users/WangFu/GitHub/
- [x] 1.5 Clone GitHub repository: quangphu1912/churn-prediction-ml to /Users/WangFu/GitHub/

## 2. AWS Pipeline Repository

- [x] 2.1 Initialize with standard structure in /Users/WangFu/GitHub/aws-ml-pipeline: mkdir -p src tests notebooks data models docs
- [x] 2.2 Create .gitignore using Python template (exclude data/, models/, __pycache__/, .ipynb_checkpoints/)
- [x] 2.3 Create requirements.txt with dependencies: boto3, pandas, sqlalchemy, pytest
- [x] 2.4 Create environment.yml with conda dependencies
- [x] 2.5 Create pyproject.toml with project metadata
- [x] 2.6 Create README.md with sections: Overview, Architecture, Setup, Usage, Metrics
- [x] 2.7 Add Mermaid architecture diagram to README.md
- [x] 2.8 Create model_card.md with performance metrics, limitations, ethical considerations

## 3. Sentiment Analysis Repository

- [x] 3.1 Initialize with standard structure in /Users/WangFu/GitHub/sentiment-analysis-ml: mkdir -p src tests notebooks data models docs
- [x] 3.2 Create .gitignore using Python template
- [x] 3.3 Create requirements.txt with dependencies: transformers, torch, scikit-learn, flask, pytest
- [x] 3.4 Create environment.yml with conda dependencies
- [x] 3.5 Create pyproject.toml with project metadata
- [x] 3.6 Create README.md with architecture diagram and setup instructions
- [x] 3.7 Add Mermaid model architecture diagram to README.md
- [x] 3.8 Create model_card.md with BERT model details, performance metrics, limitations

## 4. Churn Prediction Repository

- [x] 4.1 Initialize with standard structure in /Users/WangFu/GitHub/churn-prediction-ml: mkdir -p src tests notebooks data models docs
- [x] 4.2 Create .gitignore using Python template
- [x] 4.3 Create requirements.txt with dependencies: xgboost, pandas, numpy, scikit-learn, pytest
- [x] 4.4 Create environment.yml with conda dependencies
- [x] 4.5 Create pyproject.toml with project metadata
- [x] 4.6 Create README.md with architecture diagram and setup instructions
- [x] 4.7 Add Mermaid feature engineering diagram to README.md
- [x] 4.8 Create model_card.md with XGBoost model details, performance metrics, limitations

## 5. CI/CD Configuration

- [x] 5.1 Create .github/workflows/lint.yml for ruff linting (AWS repo)
- [x] 5.2 Create .github/workflows/test.yml for pytest with coverage (AWS repo)
- [x] 5.3 Create .github/workflows/lint.yml for ruff linting (Sentiment repo)
- [x] 5.4 Create .github/workflows/test.yml for pytest with coverage (Sentiment repo)
- [x] 5.5 Create .github/workflows/lint.yml for ruff linting (Churn repo)
- [x] 5.6 Create .github/workflows/test.yml for pytest with coverage (Churn repo)
- [x] 5.7 Create .pre-commit-config.yaml for ruff, black, isort (all repos)
- [x] 5.8 Add CI status badges to all 3 README.md files

## 6. Code Implementation

- [x] 6.1 Port AWS pipeline code to src/ directory with type hints and docstrings
- [x] 6.2 Port sentiment analysis code to src/ directory with type hints and docstrings
- [x] 6.3 Port churn prediction code to src/ directory with type hints and docstrings
- [x] 6.4 Create tests/ directory with unit tests for each repo (target >80% coverage)
- [x] 6.5 Add notebooks/ with exploratory analysis for each project
- [x] 6.6 Generate performance visualizations for each project

## 7. Portfolio Integration

- [x] 7.1 Update _projects/aws-pipeline.md with GitHub repo link
- [x] 7.2 Update _projects/sentiment-analysis.md with GitHub repo link
- [x] 7.3 Update _projects/churn-prediction.md with GitHub repo link
- [x] 7.4 Add "View on GitHub" buttons to project pages
- [x] 7.5 Test all repo links work
