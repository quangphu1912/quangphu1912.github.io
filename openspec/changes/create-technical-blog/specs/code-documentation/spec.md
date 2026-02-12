## ADDED Requirements

### Requirement: Code snippet documentation

All code examples in blog posts MUST be well-documented with comments explaining logic.

#### Scenario: Comment complex code
- **WHEN** code snippet includes non-obvious logic
- **THEN** it MUST include inline comments explaining why, not just what
- **AND** comments MUST reference line numbers if explaining multi-step process

#### Scenario: Provide context for code
- **WHEN** code example is shown
- **THEN** preceding text MUST explain what code does
- **AND** following text MUST explain expected output
- **AND** MUST specify required imports or dependencies

### Requirement: Runnable code examples

Code snippets MUST be copy-paste runnable with minimal setup.

#### Scenario: Include all imports
- **WHEN** code example is shown
- **THEN** it MUST include all required import statements
- **AND** MUST specify required libraries in requirements format

#### Scenario: Use example data
- **WHEN** code processes data
- **THEN** it MUST either provide sample data
- **OR** MUST specify data format clearly
- **AND** MUST show expected input/output

#### Scenario: Handle errors gracefully
- **WHEN** code includes operations that can fail
- **THEN** it MUST show error handling
- **AND** MUST explain common errors and how to fix them

### Requirement: Version-specific documentation

Code examples MUST specify dependency versions to ensure reproducibility.

#### Scenario: Pin package versions
- **WHEN** code example uses libraries
- **THEN** post MUST mention versions tested with (e.g., "Tested with Python 3.11, pandas 2.1.0")
- **AND** MUST warn if API changes in newer versions

### Requirement: Syntax highlighting

Code blocks MUST use proper syntax highlighting for readability.

#### Scenario: Specify language
- **WHEN** code block is created in markdown
- **THEN** it MUST specify language after opening ``` (e.g., ```python, ```yaml, ```bash)
- **AND** Jekyll MUST apply syntax highlighting
