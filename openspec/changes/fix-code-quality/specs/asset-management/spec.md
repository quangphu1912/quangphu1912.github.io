## ADDED Requirements

### Requirement: Fix broken asset references

All references to non-existent assets (favicon, resume.pdf) MUST be either removed or replaced with valid assets.

#### Scenario: Handle missing favicon
- **WHEN** default.html references /assets/images/favicon.png
- **AND** the file does not exist
- **THEN** the favicon link MUST be commented out or removed
- **OR** a valid favicon.png MUST be created

#### Scenario: Handle missing resume
- **WHEN** index.md links to /pdf/resume.pdf
- **AND** the file does not exist
- **THEN** the download link MUST be removed
- **OR** a valid resume.pdf MUST be added to /pdf/ directory
- **AND** a TODO comment MUST be added indicating action needed

### Requirement: Update placeholder contact information

All placeholder contact information (email addresses) MUST be updated with real values.

#### Scenario: Update email in config
- **WHEN** _config.yml contains email: your-email@example.com
- **THEN** the email MUST be updated to a real contact email address
- **AND** the email MUST be functional for contact form links

### Requirement: Asset TODO comments

When assets are temporarily unavailable, the site MUST include TODO comments for future addition.

#### Scenario: Document missing resume
- **WHEN** resume.pdf is not yet available
- **THEN** a comment <!-- TODO: Add resume.pdf to /pdf/ directory --> MUST be added
- **AND** the comment MUST be placed where the resume link would go
