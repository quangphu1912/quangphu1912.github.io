---
title: "Sentiment Analysis of Financial News"
description: "NLP project using BERT to analyze sentiment in financial news articles and predict stock market movements."
date: 2023-11-20
tags: [NLP, BERT, Python, TensorFlow, Finance]
featured: true
image: /assets/images/projects/sentiment-analysis.jpg
---

## Overview

This project applies natural language processing (NLP) to analyze sentiment in financial news articles and correlate it with stock price movements.

## Objective

- Extract sentiment from 100,000+ financial news articles
- Fine-tune BERT model for financial domain
- Correlate sentiment scores with stock returns

## Methodology

### Data Collection
- Scraped articles from Bloomberg, Reuters, WSJ (2020-2023)
- Collected corresponding stock price data via Yahoo Finance API
- Labeled 5,000 articles manually for training

### Model Architecture
- Base model: BERT-base-uncased
- Fine-tuned on financial news corpus
- Added classification head for 3-class sentiment (positive/neutral/negative)

### Training
- Batch size: 16
- Learning rate: 2e-5
- Epochs: 3
- Validation accuracy: 87%

## Results

- **Sentiment Accuracy**: 87% on test set
- **Stock Correlation**: 0.42 correlation between sentiment and next-day returns
- **Trading Strategy**: Sentiment-based strategy outperformed buy-and-hold by 8% annually

## Key Insights

1. Negative sentiment had stronger predictive power than positive
2. Sentiment impact was strongest in first 24 hours after publication
3. Tech sector showed highest correlation between sentiment and returns

## Technologies

- **NLP**: Hugging Face Transformers, BERT
- **Data**: BeautifulSoup, pandas
- **ML**: TensorFlow, scikit-learn
- **Visualization**: Plotly, matplotlib

## Code Sample

```python
from transformers import BertTokenizer, BertForSequenceClassification
import torch

# Load fine-tuned model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('./financial-bert')

# Analyze sentiment
def predict_sentiment(text):
    inputs = tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
    outputs = model(**inputs)
    prediction = torch.argmax(outputs.logits, dim=1)
    return ['negative', 'neutral', 'positive'][prediction]

article = "Apple reports record quarterly earnings, beating analyst expectations"
print(f"Sentiment: {predict_sentiment(article)}")
```

## Future Work

- Expand to multi-lingual financial news
- Incorporate social media sentiment (Twitter, Reddit)
- Real-time sentiment dashboard for traders

## GitHub Repository

[![View on GitHub](https://img.shields.io/badge/Github-sentiment--analysis--ml-blue?logo=github)](https://github.com/quangphu1912/sentiment-analysis-ml)
[![Lint](https://img.shields.io/github/actions/workflow/status/quangphu1912/sentiment-analysis-ml/lint.yml?branch=main)](https://github.com/quangphu1912/sentiment-analysis-ml/actions)
[![Test](https://img.shields.io/github/actions/workflow/status/quangphu1912/sentiment-analysis-ml/test.yml?branch=main)](https://github.com/quangphu1912/sentiment-analysis-ml/actions)

View the complete source code, model training, and documentation on **[GitHub](https://github.com/quangphu1912/sentiment-analysis-ml)**.
