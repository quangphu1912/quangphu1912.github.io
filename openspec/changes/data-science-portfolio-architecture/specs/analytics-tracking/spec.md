## ADDED Requirements

### Requirement: Analytics Platform Selection
The system SHALL integrate privacy-respecting analytics to track recruiter engagement.

#### Scenario: Google Analytics 4 integration
- **WHEN** Google Analytics is chosen
- **THEN** system SHALL use GA4 with privacy-respecting configuration

#### Scenario: Alternative analytics platform
- **WHEN** budget allows (~$9-14/month)
- **THEN** system MAY use privacy-first alternatives (Plausible, Fathom, Simple Analytics)

### Requirement: Privacy Configuration
The system SHALL configure analytics to respect user privacy.

#### Scenario: IP anonymization
- **WHEN** Google Analytics is used
- **THEN** IP anonymization SHALL be enabled

#### Scenario: Do Not Track respect
- **WHEN** user has Do Not Track enabled
- **THEN** analytics script SHOULD respect DNT header (optional, based on platform)

#### Scenario: Cookie consent
- **WHEN** analytics is implemented
- **THEN** system SHALL comply with privacy regulations (GDPR, CCPA) if applicable

### Requirement: Tracking Script Integration
The system SHALL integrate analytics tracking script in site templates.

#### Scenario: Script placement
- **WHEN** analytics is configured
- **THEN** tracking script SHALL be included in site's default layout (head or footer)

#### Scenario: Async loading
- **WHEN** tracking script is loaded
- **THEN** script SHALL load asynchronously to not block page rendering

#### Scenario: Environment-based loading
- **WHEN** site is in development mode
- **THEN** analytics script SHALL NOT load (only in production)

### Requirement: Event Tracking
The system SHALL track key user interactions beyond pageviews.

#### Scenario: Project view tracking
- **WHEN** user views project detail page
- **THEN** analytics SHALL track project view event with project title

#### Scenario: Resume download tracking
- **WHEN** user downloads resume PDF
- **THEN** analytics SHALL track download event

#### Scenario: External link tracking
- **WHEN** user clicks external link (LinkedIn, GitHub)
- **THEN** analytics SHALL track outbound link click

### Requirement: Metrics Dashboard
The system SHALL provide dashboard to view key engagement metrics.

#### Scenario: Pageview metrics
- **WHEN** analytics dashboard is accessed
- **THEN** dashboard SHALL show total pageviews, unique visitors, and top pages

#### Scenario: Traffic sources
- **WHEN** analytics dashboard is accessed
- **THEN** dashboard SHALL show traffic sources (direct, referral, search, social)

#### Scenario: Popular projects
- **WHEN** analytics dashboard is accessed
- **THEN** dashboard SHALL show which projects receive most views

### Requirement: Performance Impact
The system SHALL minimize analytics impact on site performance.

#### Scenario: Script size
- **WHEN** analytics script is loaded
- **THEN** script size SHALL be minimal (<50KB for GA4, <5KB for privacy-first alternatives)

#### Scenario: Page load impact
- **WHEN** analytics is enabled
- **THEN** page load time SHALL increase by less than 200ms

### Requirement: Data Retention
The system SHALL configure appropriate data retention policies.

#### Scenario: Google Analytics retention
- **WHEN** Google Analytics is used
- **THEN** data retention SHALL be set to 14 months (or shorter for privacy)

#### Scenario: Data export
- **WHEN** analytics data needs to be preserved
- **THEN** system SHALL support data export for long-term storage

### Requirement: Privacy Policy
The system SHALL include privacy policy disclosing analytics usage.

#### Scenario: Privacy policy page
- **WHEN** analytics is enabled
- **THEN** site SHALL include privacy policy page explaining data collection

#### Scenario: Privacy policy link
- **WHEN** site is rendered
- **THEN** footer SHALL include link to privacy policy

### Requirement: Opt-Out Mechanism
The system SHALL provide way for users to opt out of analytics tracking.

#### Scenario: Opt-out link
- **WHEN** privacy policy is displayed
- **THEN** page SHALL include link or button to disable analytics

#### Scenario: Opt-out persistence
- **WHEN** user opts out
- **THEN** preference SHALL be stored in browser (localStorage or cookie)

### Requirement: Analytics Reporting
The system SHALL enable regular review of analytics insights.

#### Scenario: Weekly review
- **WHEN** portfolio owner reviews analytics
- **THEN** key metrics (visitors, top projects, traffic sources) SHALL be easily accessible

#### Scenario: Recruiter behavior insights
- **WHEN** analytics data is reviewed
- **THEN** data SHALL reveal which projects and skills recruiters focus on most
