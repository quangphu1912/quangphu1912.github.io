## ADDED Requirements

### Requirement: Cost-effective LLM usage

The application MUST optimize for low API costs while maintaining quality.

#### Scenario: Use GPT-4-Turbo not GPT-4
- **WHEN** LLM is selected
- **THEN** it MUST use GPT-4-Turbo (not GPT-4)
- **AND** MUST achieve similar quality at 3x lower cost
- **AND** MUST cost $0.01/1K tokens (vs. $0.03/1K for GPT-4)

#### Scenario: Cache frequent queries
- **WHEN** user asks question
- **THEN** system MUST check local cache for identical questions
- **AND** if cached, MUST return cached answer (no API call)
- **AND** MUST cache key be question text + document ID

#### Scenario: Set monthly budget limit
- **WHEN** OpenAI API is configured
- **THEN** developer MUST set hard budget limit in OpenAI dashboard
- **AND** limit MUST trigger warning when 80% of budget is used
- **AND** application MUST display budget usage to user

### Requirement: Pinecone cost optimization

The application MUST use Pinecone free tier effectively.

#### Scenario: Use serverless index
- **WHEN** Pinecone index is created
- **THEN** it MUST use serverless (pay-per-query) not pod-based (fixed cost)
- **AND** free tier MUST provide 1M vectors, 5K queries/month
- **AND** estimated cost for demo usage MUST be $0/month

#### Scenario: Estimate scale before exceeding free tier
- **WHEN** document count approaches free tier limit
- **THEN** system MUST calculate projected usage
- **AND** MUST alert if exceeding 1M vectors or 5K queries/month
- **AND** MUST suggest switching to local ChromaDB if needed

### Requirement: Cost transparency

The application MUST make costs transparent to users.

#### Scenario: Display per-query cost
- **WHEN** user asks question
- **THEN** UI MUST display cost for that query (e.g., "$0.002")
- **AND** MUST show breakdown (embedding cost + generation cost)

#### Scenario: Display monthly cost estimate
- **WHEN** user has asked multiple questions
- **THEN** UI MUST display estimated monthly cost based on current usage rate
- **AND** MUST project if usage continues at current rate
