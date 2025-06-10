# Marine Licensing User Stories

This directory contains user stories for the marine licensing application under test. Each user story documents the requirements, acceptance criteria, and screenshots for specific functionality.

## User stories overview

| Story ID | Title                                         | User story file                                                                                                    | Feature files                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ML-1     | Provide project name and create exemption     | [ML-1.provide.project.name.and.create.exemption.md](./ML-1.provide.project.name.and.create.exemption.md)           | [project.name.feature](../../test/features/project.name.feature), [validation.project.name.feature](../../test/features/validation.project.name.feature)                                                                                                                                                                                                                                                                                                                 |
| ML-9     | View the task list                            | [ML-9.view.the.task.list.md](./ML-9.view.the.task.list.md)                                                         | [task.list.feature](../../test/features/task.list.feature), [project.name.feature](../../test/features/project.name.feature)                                                                                                                                                                                                                                                                                                                                             |
| ML-11    | Provide activity description                  | [ML-11.provide.activity.description.md](./ML-11.provide.activity.description.md)                                   | [activity.description.feature](../../test/features/activity.description.feature)                                                                                                                                                                                                                                                                                                                                                                                         |
| ML-12    | Provide or withhold public register content   | [ML-12.provide.or.withhold.public.register.content.md](./ML-12.provide.or.withhold.public.register.content.md)     | [public.register.feature](../../test/features/public.register.feature), [validation.public.register.feature](../../test/features/validation.public.register.feature), [back.and.cancel.public.register.feature](../../test/features/back.and.cancel.public.register.feature)                                                                                                                                                                                             |
| ML-16    | Choose file upload or manual coordinate entry | [ML-16.choose.file.upload.or.manual.coordinate.entry.md](./ML-16.choose.file.upload.or.manual.coordinate.entry.md) | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature) |
| ML-17    | Choose circle or coordinate list entry        | [ML-17.choose.circle.or.coordinate.list.entry.md](./ML-17.choose.circle.or.coordinate.list.entry.md)               | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature) |
| ML-18    | Choose coordinate system                      | [ML-18.choose.coordinate.system.md](./ML-18.choose.coordinate.system.md)                                           | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature) |
| ML-35    | Enter centre point of a circle                | [ML-35.enter.centre.point.of.a.circle.md](./ML-35.enter.centre.point.of.a.circle.md)                               | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [validation.centre.point.coordinates.feature](../../test/features/validation.centre.point.coordinates.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature)                                                                         |
| ML-36    | Enter width of circular site                  | [ML-36.enter.width.of.circular.site.md](./ML-36.enter.width.of.circular.site.md)                                   | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [validation.width.circular.site.feature](../../test/features/validation.width.circular.site.feature)                                                                                                                                                                                                                                                                       |
| ML-37    | Review circular site details                  | [ML-37.review.circular.site.details.md](./ML-37.review.circular.site.details.md)                                   | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature)                                                                                                                                                                                                                                                                                                                                                                             |

## Story status

- ✅ **ML-1**: Project name entry and exemption creation
- ✅ **ML-9**: Task list display and navigation
- ✅ **ML-12**: Public register consent and withholding
- ✅ **ML-11**: Provide activity description
- ✅ **ML-16**: Choose file upload or manual coordinate entry
- ✅ **ML-17**: Choose how to enter site coordinates
- ✅ **ML-18**: Choose coordinate system for site location
- ✅ **ML-35**: Enter centre point of a circle (NEW: Coordinate entry with comprehensive validation) ⚠️ _Some back/cancel navigation scenarios @wip_
- ✅ **ML-36**: Enter width of circular site (NEW: Width validation and core functionality) ⚠️ _Back/cancel navigation tests planned for future implementation_
- ✅ **ML-37**: Review circular site details (NEW: Complete circular site review flow with validation and task completion)

## Feature file tags

Feature files are tagged with `@issue=ML-n` where `n` corresponds to the user story number. This allows for easy tracking between requirements and test implementation.

- `@issue=ML-n` - Links scenarios to specific user stories
- `@smoke` - Core user journey scenarios for fast feedback (run with `npm run test:local -- --cucumberOpts.tags "@smoke"`)
- `@wip` - Features currently under development
- `@run-only` - Can be used to specifically target features during development

### Smoke Test Coverage (@smoke)

The `@smoke` tag identifies core user journey scenarios that provide fast feedback on essential functionality:

**Tagged scenarios (7 core journeys):**

- Project name creation (ML-1)
- Task list display (ML-9)
- Activity description completion (ML-11)
- Public register consent decision (ML-12)
- Public register withhold decision (ML-12)
- Site details with WGS84 coordinates (ML-16,17,18,35,36,37)
- Site details with OSGB36 coordinates (ML-16,17,18,35,36,37)

**Execution time:** ~2-3 minutes vs full suite ~15+ minutes

### Current @wip Scenarios

**ML-35 Related @wip scenarios:**

- Back navigation from coordinate entry pages preserving coordinate system selection (2 scenarios)
- Cancel functionality from coordinate entry pages with data discard validation (2 scenarios)

**ML-36 Navigation scenarios (planned for future implementation):**

- Back navigation from width entry page to centre point coordinates page
- Cancel functionality from width entry page with data discard validation

**Note:** These @wip scenarios represent edge cases in the navigation flow that require additional step definitions and are planned for future completion as part of an improved navigation test strategy.

## Usage

1. **Product owners/business analysts**: Reference user story files for requirements and acceptance criteria
2. **Developers**: Use both user stories and feature files to understand implementation requirements
3. **Testers**: Feature files contain the automated test scenarios that validate the user stories

## File structure

```
documentation/user-stories/
├── README.md                                               # This file
├── ML-1.provide.project.name.and.create.exemption.md       # Project name entry
├── ML-9.view.the.task.list.md                              # Task list functionality
├── ML-12.provide.or.withhold.public.register.content.md    # Public register consent
├── ML-11.provide.activity.description.md                   # Activity description entry
├── ML-16.choose.file.upload.or.manual.coordinate.entry.md  # Site location options
├── ML-17.choose.circle.or.coordinate.list.entry.md         # Coordinate entry options
├── ML-18.choose.coordinate.system.md                       # Coordinate system selection
├── ML-35.enter.centre.point.of.a.circle.md                 # Enter centre point of a circle
├── ML-36.enter.width.of.circular.site.md                   # Enter width of circular site
└── ML-37.review.circular.site.details.md                   # Review circular site details
```

## Adding new user stories

When adding new user stories:

1. Create a new `.md` file following the naming convention: `ML-{number}.{descriptive.name}.md`
2. Update this README.md file with the new entry in the table above
3. Add descriptions of the screenshots provided as images
4. Update the story status section

## Related documentation

- [Project structure](../README.md) - Overall project organisation
- [Test strategy](../test-strategy/README.md) - Quality engineering approach
- [Test charters](../test-charters/README.md) - Investigative testing plans for exploring features
- [Domain context](../test-strategy/domain-context.md) - Context about the marine licensing application
