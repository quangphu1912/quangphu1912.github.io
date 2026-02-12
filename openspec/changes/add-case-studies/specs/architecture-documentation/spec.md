## ADDED Requirements

### Requirement: Mermaid architecture diagrams

Each case study MUST include architecture diagrams using Mermaid syntax for portability.

#### Scenario: Create data flow diagram
- **WHEN** case study documents data pipeline
- **THEN** it MUST include Mermaid graph TD (top-down) diagram
- **AND** MUST show data flow from sources → processing → storage → output

#### Scenario: Create system architecture diagram
- **WHEN** case study documents system components
- **THEN** it MUST include Mermaid graph LR (left-right) diagram
- **AND** MUST show all major components and their connections
- **AND** MUST label component technologies (e.g., "AWS Lambda", "PostgreSQL")

#### Scenario: Create sequence diagram
- **WHEN** case study documents multi-step process
- **THEN** it MAY include Mermaid sequenceDiagram
- **AND** MUST show actor interactions and message flow

### Requirement: Mermaid rendering and styling

Mermaid diagrams MUST render correctly with site-specific styling.

#### Scenario: Style diagram elements
- **WHEN** Mermaid diagrams are rendered
- **THEN** they MUST use site colors (--color-primary, --color-secondary)
- **AND** MUST use site font stack
- **AND** MUST be readable in both light and dark modes

#### Scenario: Ensure diagram readability
- **WHEN** diagrams are viewed on mobile
- **THEN** they MUST NOT overflow viewport
- **AND** MUST be horizontally scrollable if needed
