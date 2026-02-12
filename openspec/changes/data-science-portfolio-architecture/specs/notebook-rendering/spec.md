## ADDED Requirements

### Requirement: nbconvert Integration
The system SHALL use nbconvert to convert Jupyter notebooks to HTML format.

#### Scenario: Notebook conversion command
- **WHEN** notebook needs to be converted
- **THEN** system SHALL use `jupyter nbconvert --to html` command

#### Scenario: Output preservation
- **WHEN** notebook is converted
- **THEN** all cell outputs (text, plots, tables) SHALL be preserved in HTML

#### Scenario: Conversion automation
- **WHEN** notebook is added to _notebooks directory
- **THEN** GitHub Actions SHALL automatically convert notebook to HTML on push

### Requirement: Custom nbconvert Template
The system SHALL use custom nbconvert template to match site design.

#### Scenario: Template override
- **WHEN** nbconvert runs
- **THEN** system SHALL use custom template instead of default nbconvert template

#### Scenario: Minimal HTML output
- **WHEN** custom template is applied
- **THEN** output SHALL exclude unnecessary nbconvert CSS and JavaScript

#### Scenario: Site CSS integration
- **WHEN** notebook HTML is generated
- **THEN** output SHALL reference site's main CSS file for consistent styling

### Requirement: Syntax Highlighting
The system SHALL apply consistent syntax highlighting to code cells.

#### Scenario: Code highlighting theme
- **WHEN** code cells are rendered
- **THEN** syntax highlighting SHALL use theme consistent with site design (e.g., GitHub, Monokai, Solarized)

#### Scenario: Language detection
- **WHEN** code cell is rendered
- **THEN** nbconvert SHALL automatically detect and highlight language (Python, R, SQL, etc.)

### Requirement: Plot and Visualization Rendering
The system SHALL render matplotlib, seaborn, and plotly visualizations as static images or interactive HTML.

#### Scenario: Matplotlib plot rendering
- **WHEN** notebook contains matplotlib plots
- **THEN** plots SHALL be embedded as PNG or SVG images

#### Scenario: Plotly interactive plots
- **WHEN** notebook contains plotly visualizations
- **THEN** plots SHALL be rendered as interactive HTML (if plotly.js is included)

#### Scenario: Image optimization
- **WHEN** plots are embedded
- **THEN** images SHALL be optimized for web (reasonable file size, appropriate resolution)

### Requirement: Table Rendering
The system SHALL render pandas DataFrames and markdown tables with clean styling.

#### Scenario: DataFrame HTML rendering
- **WHEN** notebook contains pandas DataFrame output
- **THEN** table SHALL be rendered as styled HTML table

#### Scenario: Table responsiveness
- **WHEN** table is rendered on mobile
- **THEN** table SHALL be horizontally scrollable or use responsive table design

### Requirement: Cell Input/Output Styling
The system SHALL clearly distinguish between code input and output cells.

#### Scenario: Input cell styling
- **WHEN** code input cell is rendered
- **THEN** cell SHALL have distinct background color and "In [n]:" prompt

#### Scenario: Output cell styling
- **WHEN** output cell is rendered
- **THEN** cell SHALL have distinct styling and "Out [n]:" prompt (optional)

#### Scenario: Cell numbering
- **WHEN** cells are rendered
- **THEN** execution order numbers SHALL be preserved from original notebook

### Requirement: Markdown Cell Rendering
The system SHALL render markdown cells with full formatting support.

#### Scenario: Markdown formatting
- **WHEN** notebook contains markdown cells
- **THEN** cells SHALL support headings, lists, bold, italic, links, and images

#### Scenario: LaTeX equation rendering
- **WHEN** markdown cell contains LaTeX equations
- **THEN** equations SHALL be rendered using MathJax or KaTeX

### Requirement: GitHub Actions Workflow
The system SHALL automate notebook conversion via GitHub Actions.

#### Scenario: Workflow trigger
- **WHEN** notebook file is pushed to _notebooks directory
- **THEN** GitHub Actions workflow SHALL trigger automatically

#### Scenario: Conversion and commit
- **WHEN** workflow runs
- **THEN** converted HTML SHALL be committed to repository in appropriate output directory

#### Scenario: Build failure handling
- **WHEN** nbconvert fails
- **THEN** workflow SHALL fail with clear error message and not deploy broken site

### Requirement: Notebook Metadata
The system SHALL extract and display notebook metadata (title, author, date).

#### Scenario: Metadata extraction
- **WHEN** notebook is converted
- **THEN** system SHALL extract metadata from notebook's first markdown cell or metadata field

#### Scenario: Metadata display
- **WHEN** converted notebook is displayed
- **THEN** title, author, and date SHALL be shown at top of page

### Requirement: Performance Optimization
The system SHALL optimize notebook HTML for fast loading.

#### Scenario: HTML file size
- **WHEN** notebook is converted
- **THEN** output HTML SHALL be reasonably sized (target <500KB for typical notebook)

#### Scenario: External resource loading
- **WHEN** notebook requires external libraries (MathJax, Plotly)
- **THEN** libraries SHALL be loaded from CDN for better caching
