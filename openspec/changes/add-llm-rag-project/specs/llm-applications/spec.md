## ADDED Requirements

### Requirement: End-to-end LLM application

The LLM/RAG project MUST be a complete working application from document upload to question answering.

#### Scenario: Upload document
- **WHEN** user uploads a PDF, TXT, or DOCX file
- **THEN** system MUST process and ingest the document
- **AND** MUST confirm upload with success message
- **AND** MUST make document available for querying

#### Scenario: Ask question
- **WHEN** user enters a natural language question
- **THEN** system MUST retrieve relevant document chunks
- **AND** MUST generate answer using LLM
- **AND** MUST display answer with citations

#### Scenario: Display citations
- **WHEN** answer is generated
- **THEN** system MUST highlight which document chunks were used
- **AND** MUST display chunk source (document name, page number)
- **AND** MUST allow user to view source context

### Requirement: Financial document specialization

The application MUST be optimized for financial documents (10-K, 10-Q, earnings transcripts).

#### Scenario: Handle financial terminology
- **WHEN** processing financial documents
- **THEN** system MUST correctly handle ticker symbols, financial metrics
- **AND** MUST preserve formatting for tables (if possible)
- **AND** MUST recognize document sections (MD&A, Risk Factors, etc.)

#### Scenario: Provide financial context in responses
- **WHEN** user asks financial questions
- **THEN** responses MUST use appropriate financial terminology
- **AND** MUST cite specific sections (e.g., "According to the MD&A section...")
- **AND** MUST include numeric values with units

### Requirement: Working demo with real data

The application MUST include a working demo with real financial documents.

#### Scenario: Include demo documents
- **WHEN** application is launched
- **THEN** it MUST have at least 3 real financial documents pre-loaded
- **AND** documents MUST include: Apple 10-K, Tesla earnings transcript, JPMorgan annual report
- **AND** user MUST be able to query these documents immediately

#### Scenario: Deploy demo publicly
- **WHEN** demo is ready
- **THEN** it MUST be deployed to public URL (Streamlit Community Cloud)
- **AND** MUST be accessible without authentication
- **AND** URL MUST be added to portfolio
