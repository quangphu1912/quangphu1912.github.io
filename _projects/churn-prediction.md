---
title: "Customer Churn Prediction with ML"
description: "Built a machine learning model to predict customer churn using Random Forest and XGBoost, achieving 89% accuracy on test data."
date: 2024-01-15
tags: [Machine Learning, Python, Scikit-learn, XGBoost, Classification]
featured: true
image: /assets/images/projects/churn-prediction.jpg
---

## Overview

This project focuses on predicting customer churn for a telecommunications company using machine learning techniques. By identifying customers at risk of leaving, the company can take proactive retention measures.

## Problem Statement

Customer churn is a critical metric for subscription-based businesses. The goal was to build a predictive model that could:
- Identify customers likely to churn in the next 30 days
- Provide actionable insights into churn drivers
- Achieve at least 85% accuracy on unseen data

## Approach

### Data Exploration
- Analyzed dataset of 50,000 customer records
- Identified key features: contract type, monthly charges, tenure, customer service calls
- Handled missing values and outliers

### Feature Engineering
- Created interaction features (e.g., charges_per_tenure)
- Encoded categorical variables using one-hot encoding
- Normalized numerical features using StandardScaler

### Model Development
Tested multiple algorithms:
- Logistic Regression (baseline): 76% accuracy
- Random Forest: 87% accuracy
- XGBoost: **89% accuracy** (selected model)
- Neural Network: 88% accuracy

### Model Evaluation
- Precision: 0.91
- Recall: 0.85
- F1-Score: 0.88
- ROC-AUC: 0.93

## Key Findings

1. **Contract Type**: Month-to-month contracts had 3x higher churn rate
2. **Customer Service**: More than 4 service calls strongly predicted churn
3. **Tenure**: Customers with less than 6 months tenure were high-risk

## Technologies Used

- **Python**: pandas, numpy, scikit-learn, xgboost
- **Visualization**: matplotlib, seaborn
- **Deployment**: Flask API for real-time predictions

## Impact

The model was deployed in production and helped reduce churn by 12% in the first quarter, saving an estimated $2.3M in revenue.

## Code

```python
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Train model
model = XGBClassifier(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1,
    random_state=42
)

model.fit(X_train, y_train)
predictions = model.predict(X_test)

print(classification_report(y_test, predictions))
```

## Next Steps

- Implement SHAP values for better model interpretability
- A/B test retention strategies based on model predictions
- Explore deep learning approaches for further accuracy improvements

## GitHub Repository

[![View on GitHub](https://img.shields.io/badge/Github-churn--predition--ml-blue?logo=github)](https://github.com/quangphu1912/churn-prediction-ml)
[![Lint](https://img.shields.io/github/actions/workflow/status/quangphu1912/churn-prediction-ml/lint.yml?branch=main)](https://github.com/quangphu1912/churn-prediction-ml/actions)
[![Test](https://img.shields.io/github/actions/workflow/status/quangphu1912/churn-prediction-ml/test.yml?branch=main)](https://github.com/quangphu1912/churn-prediction-ml/actions)

View the complete source code, model training, and documentation on **[GitHub](https://github.com/quangphu1912/churn-prediction-ml)**.
