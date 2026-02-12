## ADDED Requirements

### Requirement: Standard ML project repository structure

All portfolio project repositories MUST follow industry-standard ML project structure.

#### Scenario: Create repository directories
- **WHEN** a new project repository is created
- **THEN** it MUST include directories: src/, notebooks/, tests/, data/, models/, docs/
- **AND** MUST include files: requirements.txt, environment.yml, README.md, .gitignore, pyproject.toml

#### Scenario: Organize code by type
- **WHEN** source code is added
- **THEN** Python modules MUST be in src/ directory
- **AND** Jupyter notebooks MUST be in notebooks/ directory
- **AND** unit tests MUST be in tests/ directory

#### Scenario: Exclude large files from git
- **WHEN** .gitignore is configured
- **THEN** it MUST exclude data/, models/, __pycache__/, .ipynb_checkpoints/
- **AND** MUST follow Python .gitignore template

### Requirement: Comprehensive README documentation

Each project repository MUST include a comprehensive README.md following standard sections.

#### Scenario: Include all required sections
- **WHEN** README.md is created
- **THEN** it MUST include sections: Project Overview, Business Problem, Architecture Diagram, Setup Instructions, Usage Examples, Performance Metrics, Contributing

#### Scenario: Provide architecture diagram
- **WHEN** README.md describes the system
- **THEN** it MUST include a Mermaid diagram showing data flow and components
- **AND** the diagram MUST be rendered in GitHub

#### Scenario: Provide setup instructions
- **WHEN** README.md includes Setup section
- **THEN** it MUST provide commands: git clone, pip install/conda env create, run tests
- **AND** MUST list all dependencies with versions

### Requirement: Python project metadata

Each project MUST include pyproject.toml with project metadata and build configuration.

#### Scenario: Define project metadata
- **WHEN** pyproject.toml is created
- **THEN** it MUST include: project name, version, description, authors, dependencies
- **AND** MUST specify build system (setuptools or poetry)

#### Scenario: Enable reproducible builds
- **WHEN** pyproject.toml is configured
- **THEN** it MUST pin dependency versions
- **AND** MUST specify Python version required (>=3.9)
