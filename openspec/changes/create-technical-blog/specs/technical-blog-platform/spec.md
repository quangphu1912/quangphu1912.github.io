## ADDED Requirements

### Requirement: Jekyll posts collection

The site MUST use Jekyll's native _posts/ collection for blog content with proper frontmatter.

#### Scenario: Configure posts collection
- **WHEN** _config.yml is configured
- **THEN** it MUST include collection: posts with output: true
- **AND** MUST set permalink: /blog/:year/:month/:day/:title/

#### Scenario: Create post frontmatter
- **WHEN** a new blog post is created
- **THEN** it MUST include frontmatter: layout, title, date, tags, description
- **AND** date MUST be in YYYY-MM-DD format
- **AND** tags MUST be an array for filtering

#### Scenario: Store posts in _posts directory
- **WHEN** blog posts are created
- **THEN** they MUST be stored in _posts/ directory
- **AND** filenames MUST follow YYYY-MM-DD-title.md format

### Requirement: Blog landing page

The site MUST include a /blog/ page listing all posts with filtering capabilities.

#### Scenario: Display post list
- **WHEN** /blog/ is visited
- **THEN** it MUST display all posts in reverse chronological order
- **AND** each post MUST show title, date, excerpt, tags
- **AND** each post MUST link to full post page

#### Scenario: Filter by tags
- **WHEN** user clicks a tag on /blog/ page
- **THEN** the page MUST filter to show only posts with that tag
- **AND** MUST display tag name in page title

#### Scenario: Paginate posts
- **WHEN** there are more than 10 posts
- **THEN** /blog/ MUST paginate with 10 posts per page
- **AND** MUST include Previous/Next navigation

### Requirement: Individual post pages

Each blog post MUST have its own page at /blog/year/month/day/title/.

#### Scenario: Render post layout
- **WHEN** a post page is visited
- **THEN** it MUST use post layout
- **AND** MUST display post title, date, tags, content
- **AND** MUST include navigation back to /blog/

#### Scenario: Enable code syntax highlighting
- **WHEN** post content includes code blocks
- **THEN** code MUST be syntax highlighted using Jekyll's built-in highlighter
- **AND** MUST support Python, SQL, YAML, Bash languages

### Requirement: RSS feed generation

The site MUST automatically generate an RSS feed for blog post subscriptions.

#### Scenario: Generate RSS feed
- **WHEN** jekyll-feed plugin is configured
- **THEN** it MUST generate /feed.xml
- **AND** MUST include all posts with title, content, date
- **AND** MUST update automatically when new posts are added

#### Scenario: Link to RSS feed
- **WHEN** /blog/ page is viewed
- **THEN** it MUST include an RSS subscribe link
- **AND** link MUST point to /feed.xml
