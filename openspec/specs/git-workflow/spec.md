## ADDED Requirements

### Requirement: Feature branch workflow from develop

All OpenSpec changes MUST be implemented on feature branches created from the develop branch, not directly on master.

#### Scenario: Create feature branch from develop
- **WHEN** starting work on an OpenSpec change
- **THEN** developer MUST checkout develop branch first: `git checkout develop`
- **AND** MUST create feature branch: `git checkout -b <change-name>`
- **AND** feature branch name MUST match OpenSpec change name exactly (kebab-case)

#### Scenario: Implement tasks on feature branch
- **WHEN** implementing tasks from tasks.md
- **THEN** all commits MUST be made to feature branch
- **AND** changes MUST NOT be pushed directly to master
- **AND** changes MUST NOT be pushed directly to develop (unless merging for integration)

#### Scenario: Feature branch isolation
- **WHEN** feature branch is created
- **THEN** it MUST be isolated from other feature branches
- **AND** it MUST track develop branch
- **AND** it MUST NOT track master branch

### Requirement: Develop branch as staging integration

All feature branches MUST be merged to develop branch for testing and integration before master.

#### Scenario: Merge feature to develop
- **WHEN** all tasks on feature branch are complete
- **THEN** developer MUST checkout develop: `git checkout develop`
- **AND** MUST merge feature branch: `git merge <feature-branch>`
- **AND** MUST push to remote: `git push origin develop`
- **AND** MUST verify changes on develop branch

#### Scenario: Test on develop branch
- **WHEN** develop branch has new changes
- **THEN** developer MUST test on develop branch before merging to master
- **AND** MUST verify locally: `bundle exec jekyll serve`
- **AND** MAY configure GitHub Pages to deploy develop branch temporarily
- **AND** MUST verify all pages, dark mode, and responsiveness

#### Scenario: Multiple features on develop
- **WHEN** multiple feature branches are merged to develop
- **THEN** develop branch serves as integration point
- **AND** features can be tested together
- **AND** conflicts MUST be resolved on develop

### Requirement: Master branch protection

Master branch is reserved for production-ready code only.

#### Scenario: Merge develop to master
- **WHEN** develop branch changes are tested and ready
- **THEN** developer MUST checkout master: `git checkout master`
- **AND** MUST merge develop: `git merge develop`
- **AND** MUST verify all tasks in change are marked complete [x]
- **AND** MUST push to remote: `git push origin master`
- **AND** GitHub Pages MUST automatically deploy to production

#### Scenario: Master auto-deploys to production
- **WHEN** changes are pushed to master branch
- **THEN** GitHub Pages MUST automatically build and deploy
- **AND** deployment MUST be visible at https://quangphu1912.github.io
- **AND** production MUST always be stable

#### Scenario: No direct commits to master
- **WHEN** developer needs to make changes
- **THEN** changes MUST NOT be committed directly to master
- **AND** changes MUST follow feature → develop → master workflow

### Requirement: Feature branch naming

Feature branches MUST use OpenSpec change names.

#### Scenario: Branch name matches change
- **WHEN** creating feature branch
- **THEN** branch name MUST match OpenSpec change name exactly
- **EXAMPLE**: Change "fix-code-quality" → branch "fix-code-quality"
- **AND** MUST NOT use "feature/" prefix
- **AND** MUST be kebab-case

#### Scenario: List branches and changes
- **WHEN** developer views available changes
- **THEN** `openspec list` MUST show all changes
- **AND** `git branch -a` MUST show matching feature branches
