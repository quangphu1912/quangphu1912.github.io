## ADDED Requirements

### Requirement: Streamlit web interface

The application MUST provide a web UI using Streamlit for user interaction.

#### Scenario: Upload file widget
- **WHEN** user visits application
- **THEN** UI MUST display file upload widget
- **AND** MUST accept PDF, TXT, DOCX files
- **AND** MUST show uploaded file name and size

#### Scenario: Query input widget
- **WHEN** document is uploaded
- **THEN** UI MUST display text input for questions
- **AND** MUST include "Ask" button
- **AND** MUST support multi-line questions

#### Scenario: Display answer with citations
- **WHEN** answer is generated
- **THEN** UI MUST display answer text
- **AND** MUST display citations section below answer
- **AND** citations MUST link to document chunks (highlight text)

#### Scenario: Display cost tracker
- **WHEN** UI is loaded
- **THEN** it MUST display cumulative API cost
- **AND** MUST update after each query
- **AND** MUST show estimated monthly cost

### Requirement: Responsive and accessible UI

The Streamlit UI MUST be responsive and accessible.

#### Scenario: Mobile-responsive layout
- **WHEN** UI is viewed on mobile
- **THEN** layout MUST stack vertically
- **AND** widgets MUST be touch-friendly (min 44px height)

#### Scenario: Keyboard navigation
- **WHEN** user navigates with keyboard
- **THEN** all widgets MUST be focusable
- **AND** MUST have visible focus indicators
