## ADDED Requirements

### Requirement: RAGAS evaluation framework

The application MUST include evaluation using RAGAS metrics for answer quality.

#### Scenario: Evaluate faithfulness
- **WHEN** test set of Q&A pairs is created
- **THEN** system MUST calculate faithfulness score
- **AND** MUST measure if answer is grounded in retrieved context
- **AND** MUST target score >0.8

#### Scenario: Evaluate answer relevancy
- **WHEN** test set of Q&A pairs is created
- **THEN** system MUST calculate answer relevancy score
- **AND** MUST measure if answer addresses the question
- **AND** MUST target score >0.85

#### Scenario: Create test set
- **WHEN** application is developed
- **THEN** developer MUST create 20 Q&A pairs from demo documents
- **AND** questions MUST cover various topics (financial metrics, risk factors, business segments)
- **AND** answers MUST be verified against documents

### Requirement: Performance benchmarking

The application MUST benchmark retrieval and generation latency.

#### Scenario: Measure retrieval speed
- **WHEN** question is asked
- **THEN** system MUST measure time from query to Pinecone response
- **AND** MUST target <500ms for semantic search

#### Scenario: Measure end-to-end latency
- **WHEN** question is asked
- **THEN** system MUST measure time from question submit to answer display
- **AND** MUST target <3s for full RAG pipeline
- **AND** MUST display timing to user

### Requirement: Model card for RAG system

The application MUST include a model card documenting RAG system performance.

#### Scenario: Document RAG system details
- **WHEN** model_card.md is created
- **THEN** it MUST specify: LLM (GPT-4-Turbo), embedding model (ada-002), vector DB (Pinecone)
- **AND** MUST report: faithfulness score, relevancy score, retrieval latency, end-to-end latency
- **AND** MUST specify: chunk size (500 chars), overlap (50 chars), top-k (5)

#### Scenario: Document limitations
- **WHEN** model_card.md includes Limitations
- **THEN** it MUST specify: only queries uploaded documents (no web search)
- **AND** MUST specify: hallucination risk if context is incomplete
- **AND** MUST specify: API costs if used heavily
