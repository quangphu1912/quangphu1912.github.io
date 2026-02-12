## ADDED Requirements

### Requirement: Vector database for semantic search

The application MUST use a vector database (Pinecone) for semantic document retrieval.

#### Scenario: Create Pinecone index
- **WHEN** application initializes
- **THEN** it MUST create or connect to Pinecone index
- **AND** index MUST use OpenAI text-embedding-ada-002 dimensions (1536)
- **AND** MUST use cosine similarity for search

#### Scenario: Upsert document chunks
- **WHEN** document is processed
- **THEN** each chunk MUST be embedded with OpenAI embeddings API
- **AND** embeddings MUST be upserted to Pinecone with metadata (doc name, page)
- **AND** chunks MUST be 500 characters with 50 character overlap

#### Scenario: Retrieve relevant chunks
- **WHEN** user asks a question
- **THEN** system MUST embed question using OpenAI embeddings API
- **AND** MUST query Pinecone for top 5 semantically similar chunks
- **AND** MUST retrieve chunk metadata (doc name, page) for citations

### Requirement: Cost-effective vector database usage

The application MUST use free tier or low-cost vector database options.

#### Scenario: Use Pinecone serverless free tier
- **WHEN** Pinecone is configured
- **THEN** it MUST use serverless index (not pod-based)
- **AND** MUST be within free tier limits (1M vectors, 5K queries/month)
- **AND** MUST estimate costs before exceeding free tier

#### Scenario: Fallback to local vector DB
- **WHEN** Pinecone limits are exceeded
- **THEN** system MUST fallback to ChromaDB (local, open-source)
- **AND** MUST notify user of fallback
- **AND** MUST preserve same API for switching backends
