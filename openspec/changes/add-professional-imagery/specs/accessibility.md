## ADDED Requirements

### Requirement: Alt Text Standards

All images MUST include descriptive alt text for accessibility.

#### Scenario: Write Descriptive Alt Text
- **WHEN** adding `image_alt` to front matter
- **THEN** MUST describe image content in 1-2 sentences
- **AND** MUST include context relevant to page (e.g., "Blue server network diagram for AWS data pipeline project")
- **AND** MUST NOT be redundant with surrounding text
- **AND** MUST be ≤ 125 characters (screen reader default)

#### Scenario: Decorative Images
- **WHEN** image is purely decorative (no informational content)
- **THEN** MUST use empty alt text: `alt=""`

#### Scenario: Screen Reader Testing
- **WHEN** alt text is added
- **THEN** SHOULD test with screen reader (VoiceOver, NVDA)
- **AND** MUST verify alt text conveys meaning without image

---

### Requirement: Color Contrast Compliance

All images with text overlays MUST meet WCAG 2.1 AA contrast requirements.

#### Scenario: Text Over Image Contrast
- **WHEN** text overlays image (e.g., hero title)
- **THEN** MUST have overlay gradient (30-50% opacity black)
- **AND** MUST verify contrast ratio ≥ 4.5:1 (normal text) or 7:1 (large text)
- **AND** SHOULD test with contrast checker: https://webaim.org/resources/contrastchecker/

#### Scenario: Light/Dark Mode Compatibility
- **WHEN** images are used
- **THEN** MUST verify readability in both light and dark modes
- **AND** SHOULD adjust overlay opacity if needed (dark mode may need less overlay)

---

### Requirement: Image Precedence

Images MUST NOT interfere with screen reader navigation.

#### Scenario: Decorative Images
- **WHEN** image is decorative (section dividers, abstract backgrounds)
- **THEN** MUST use `role="presentation"` or `alt=""` 
- **AND** MUST NOT be focusable (no tabindex)

#### Scenario: Informative Images
- **WHEN** image conveys information (charts, diagrams)
- **THEN** MUST have descriptive alt text
- **AND** SHOULD include long description if complex (`longdesc` attribute or adjacent text)
