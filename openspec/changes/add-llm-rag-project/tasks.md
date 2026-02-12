## 1. Infrastructure Setup (Week 1)

- [ ] 1.1 Read design.md to understand tech stack and architecture
- [ ] 1.2 Read specs to understand requirements for LLM app, vector DB, RAG, and evaluation
- [ ] 1.3 Create GitHub repository: quangphu1912/financial-rag-qa
- [ ] 1.4 Create Python environment: requirements.txt (langchain, openai, pinecone, streamlit)
- [ ] 1.5 Create environment.yml with conda dependencies
- [ ] 1.6 Get OpenAI API key and set budget limit
- [ ] 1.7 Get Pinecone API key and create serverless index (1536 dimensions, cosine similarity)
- [ ] 1.8 Create basic LangChain RetrievalQA chain (hello world)

## 2. Core Development (Week 2)

- [ ] 2.1 Build document processing pipeline
  - [ ] 2.1.1 Implement LangChain TextSplitter (500 chars, 50 overlap)
  - [ ] 2.1.2 Implement OpenAI embeddings generation
  - [ ] 2.1.3 Implement Pinecone upsert with metadata (doc name, page)
- [ ] 2.2 Build Q&A chain
  - [ ] 2.2.1 Create RetrievalQA chain with GPT-4-Turbo
  - [ ] 2.2.2 Engineer system prompt for financial Q&A role
  - [ ] 2.2.3 Implement "I don't know" for out-of-context questions
  - [ ] 2.2.4 Extract citations from retrieved chunks
- [ ] 2.3 Create Streamlit UI
  - [ ] 2.3.1 Add file upload widget (PDF, TXT, DOCX)
  - [ ] 2.3.2 Add query input widget with "Ask" button
  - [ ] 2.3.3 Display answer with citations section
  - [ ] 2.3.4 Add cost tracker display (per-query, monthly estimate)
- [ ] 2.4 Implement query caching
  - [ ] 2.4.1 Check local cache before API call
  - [ ] 2.4.2 Cache key: question text + document ID
- [ ] 2.5 Test with 1-2 documents

## 3. Demo Documents and Refinement (Week 3)

- [ ] 3.1 Download demo documents
  - [ ] 3.1.1 Apple 2023 10-K (from SEC EDGAR)
  - [ ] 3.1.2 Tesla Q4 2023 earnings transcript
  - [ ] 3.1.3 JPMorgan Chase 2023 Annual Report
- [ ] 3.2 Ingest all 3 demo documents
- [ ] 3.3 Create evaluation framework
  - [ ] 3.3.1 Create RAGAS test set (20 Q&A pairs)
  - [ ] 3.3.2 Calculate faithfulness score (target >0.8)
  - [ ] 3.3.3 Calculate answer relevancy score (target >0.85)
- [ ] 3.4 Iterate on prompt/chunking if scores <0.8
- [ ] 3.5 Benchmark performance
  - [ ] 3.5.1 Measure retrieval speed (target <500ms)
  - [ ] 3.5.2 Measure end-to-end latency (target <3s)
- [ ] 3.6 Write comprehensive README
  - [ ] 3.6.1 Add Mermaid architecture diagram
  - [ ] 3.6.2 Document setup instructions
  - [ ] 3.6.3 Add usage examples
- [ ] 3.7 Create model_card.md
  - [ ] 3.7.1 Specify: LLM (GPT-4-Turbo), embedding (ada-002), vector DB (Pinecone)
  - [ ] 3.7.2 Report: faithfulness, relevancy, latency metrics
  - [ ] 3.7.3 Document limitations (no web search, hallucination risk)

## 4. Integration and Deployment (Week 4)

- [ ] 4.1 Deploy to Streamlit Community Cloud (free hosting)
- [ ] 4.2 Test demo URL works with all 3 documents
- [ ] 4.3 Verify cost tracking displays correctly
- [ ] 4.4 Write blog post: "Building RAG Systems: A Practical Guide"
  - [ ] 4.4.1 Explain architecture (embeddings, vector DB, RAG)
  - [ ] 4.4.2 Include code snippets (chunking, retrieval, generation)
  - [ ] 4.4.3 Discuss lessons learned (chunking strategies, prompt engineering)
  - [ ] 4.4.4 Share performance benchmarks
- [ ] 4.5 Add to portfolio
  - [ ] 4.5.1 Create _projects/llm-rag-qa.md
  - [ ] 4.5.2 Add screenshots (UI, architecture diagram)
  - [ ] 4.5.3 Add link to live demo
  - [ ] 4.5.4 Link to blog post
- [ ] 4.6 Add "LLM Projects" section to index.md skills
- [ ] 4.7 Test all links work
- [ ] 4.8 Monitor costs and adjust budget if needed
