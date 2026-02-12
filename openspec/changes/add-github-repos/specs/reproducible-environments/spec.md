## ADDED Requirements

### Requirement: Python requirements specification

Each project MUST include requirements.txt listing all Python dependencies with pinned versions.

#### Scenario: Pin dependency versions
- **WHEN** requirements.txt is created
- **THEN** each dependency MUST specify version (package==X.Y.Z)
- **AND** MUST NOT use unbounded versions (package, package>=X.Y)

#### Scenario: Include development dependencies
- **WHEN** requirements.txt is created
- **THEN** it MUST include testing dependencies (pytest, pytest-cov)
- **AND** MUST include linting dependencies (ruff, black)
- **AND** MUST include data science dependencies (pandas, numpy, scikit-learn, etc.)

### Requirement: Conda environment specification

Each project MUST include environment.yml for reproducible conda environments.

#### Scenario: Specify conda dependencies
- **WHEN** environment.yml is created
- **THEN** it MUST include name: project-name
- **AND** MUST list dependencies with versions
- **AND** MUST specify Python version (python>=X.Y)

#### Scenario: Include pip dependencies within conda
- **WHEN** environment.yml includes pip packages
- **THEN** they MUST be listed under pip: subsection
- **AND** MUST match requirements.txt versions

### Requirement: Environment setup documentation

README MUST include instructions for setting up both pip and conda environments.

#### Scenario: Document pip setup
- **WHEN** README.md includes Setup section
- **THEN** it MUST provide command: pip install -r requirements.txt

#### Scenario: Document conda setup
- **WHEN** README.md includes Setup section
- **THEN** it MUST provide command: conda env create -f environment.yml
- **AND** MUST provide command: conda activate project-name

### Requirement: Dependency isolation

Development environments MUST be isolated to avoid conflicts between projects.

#### Scenario: Use virtual environments
- **WHEN** developer sets up project
- **THEN** they MUST use virtualenv or conda environment
- **AND** MUST NOT install packages globally
