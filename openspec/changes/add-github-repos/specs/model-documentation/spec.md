## ADDED Requirements

### Requirement: Model card documentation

Each ML project repository MUST include a model_card.md documenting model performance, limitations, and ethical considerations.

#### Scenario: Include required model card sections
- **WHEN** model_card.md is created
- **THEN** it MUST include sections: Model Details, Intended Use, Performance Metrics, Limitations, Ethical Considerations, Training Data

#### Scenario: Document model performance
- **WHEN** model_card.md includes Performance Metrics
- **THEN** it MUST report: accuracy, precision, recall, F1-score, AUC (or applicable metrics)
- **AND** MUST include baseline comparison
- **AND** MUST specify test dataset size and time period

#### Scenario: Document model limitations
- **WHEN** model_card.md includes Limitations
- **THEN** it MUST describe scenarios where model performs poorly
- **AND** MUST identify any biases in training data
- **AND** MUST specify any constraints on use cases

#### Scenario: Document ethical considerations
- **WHEN** model_card.md includes Ethical Considerations
- **THEN** it MUST identify whether protected features (race, gender, age) were used
- **AND** MUST describe fairness audits performed
- **AND** MUST specify error costs (false positive vs false negative)

### Requirement: Performance visualization

Model performance MUST be visualized with charts/graphs in the repository.

#### Scenario: Include confusion matrix
- **WHEN** model is a classifier
- **THEN** model_card.md or README.md MUST include a confusion matrix visualization
- **AND** MUST show precision/recall by class

#### Scenario: Include feature importance
- **WHEN** model is tree-based (XGBoost, Random Forest)
- **THEN** model_card.md or README.md MUST include a feature importance plot
- **AND** MUST identify top 10 features

### Requirement: Model versioning

Models MUST be versioned to track iterations and performance changes.

#### Scenario: Version model in model card
- **WHEN** model_card.md is created
- **THEN** it MUST specify Model Version (e.g., v2.1)
- **AND** MUST specify Training Date
- **AND** MUST list changes from previous version (if applicable)
