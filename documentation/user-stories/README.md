# Marine Licensing User Stories

This directory contains user stories for the marine licensing application under test. Each user story documents the requirements, acceptance criteria, and screenshots for specific functionality.

## User stories overview

| Story ID | Title                                            | User story file                                                                                                          | Feature files                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ML-1     | Provide project name and create exemption        | [ML-1.provide.project.name.and.create.exemption.md](./ML-1.provide.project.name.and.create.exemption.md)                 | [project.name.feature](../../test/features/project.name.feature), [validation.project.name.feature](../../test/features/validation.project.name.feature)                                                                                                                                                                                                                                                                                                                 |
| ML-9     | View the task list                               | [ML-9.view.the.task.list.md](./ML-9.view.the.task.list.md)                                                               | [task.list.feature](../../test/features/task.list.feature), [project.name.feature](../../test/features/project.name.feature)                                                                                                                                                                                                                                                                                                                                             |
| ML-10    | Provide activity dates                           | [ML-10.provide.activity.dates.md](./ML-10.provide.activity.dates.md)                                                     | [activity.dates.feature](../../test/features/activity.dates.feature), [validation.activity.dates.feature](../../test/features/validation.activity.dates.feature)                                                                                                                                                                                                                                                                                                         |
| ML-11    | Provide activity description                     | [ML-11.provide.activity.description.md](./ML-11.provide.activity.description.md)                                         | [activity.description.feature](../../test/features/activity.description.feature)                                                                                                                                                                                                                                                                                                                                                                                         |
| ML-12    | Provide or withhold public register content      | [ML-12.provide.or.withhold.public.register.content.md](./ML-12.provide.or.withhold.public.register.content.md)           | [public.register.feature](../../test/features/public.register.feature), [validation.public.register.feature](../../test/features/validation.public.register.feature), [back.and.cancel.public.register.feature](../../test/features/back.and.cancel.public.register.feature)                                                                                                                                                                                             |
| ML-16    | Choose file upload or manual coordinate entry    | [ML-16.choose.file.upload.or.manual.coordinate.entry.md](./ML-16.choose.file.upload.or.manual.coordinate.entry.md)       | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature) |
| ML-17    | Choose circle or coordinate list entry           | [ML-17.choose.circle.or.coordinate.list.entry.md](./ML-17.choose.circle.or.coordinate.list.entry.md)                     | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature) |
| ML-18    | Choose coordinate system                         | [ML-18.choose.coordinate.system.md](./ML-18.choose.coordinate.system.md)                                                 | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature) |
| ML-19    | Enter coordinate for polygon site                | [ML-19.enter.coordinate.for.polygon.site.md](./ML-19.enter.coordinate.for.polygon.site.md)                               | [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.polygon.wgs84.coordinates.feature](../../test/features/validation.polygon.wgs84.coordinates.feature), [validation.polygon.osgb36.coordinates.feature](../../test/features/validation.polygon.osgb36.coordinates.feature)                                                                                                                                     |
| ML-21    | Generate application reference                   | [ML-21.generate.application.reference.md](./ML-21.generate.application.reference.md)                                     | [submit.notification.feature](../../test/features/submit.notification.feature)                                                                                                                                                                                                                                                                                                                                                                                           |
| ML-38    | Add another set of coordinates to a polygon site | [ML-38.add.another.set.of.coordinates.to.a.polygon.site.md](./ML-38.add.another.set.of.coordinates.to.a.polygon.site.md) | [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.polygon.wgs84.coordinates.feature](../../test/features/validation.polygon.wgs84.coordinates.feature), [validation.polygon.osgb36.coordinates.feature](../../test/features/validation.polygon.osgb36.coordinates.feature)                                                                                                                                     |
| ML-35    | Enter centre point of a circle                   | [ML-35.enter.centre.point.of.a.circle.md](./ML-35.enter.centre.point.of.a.circle.md)                                     | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [validation.centre.point.coordinates.feature](../../test/features/validation.centre.point.coordinates.feature), [back.link.site.details.feature](../../test/features/back.link.site.details.feature), [cancel.button.site.details.feature](../../test/features/cancel.button.site.details.feature)                                                                         |
| ML-36    | Enter width of circular site                     | [ML-36.enter.width.of.circular.site.md](./ML-36.enter.width.of.circular.site.md)                                         | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [validation.width.circular.site.feature](../../test/features/validation.width.circular.site.feature)                                                                                                                                                                                                                                                                       |
| ML-37    | Review circular site details                     | [ML-37.review.circular.site.details.md](./ML-37.review.circular.site.details.md)                                         | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature)                                                                                                                                                                                                                                                                                                                                                                             |
| ML-69    | Choose file type to upload                       | [ML-69.choose.file.to.upload.md](./ML-69.choose.file.to.upload.md)                                                       | [file.type.selection.feature](../../test/features/file.type.selection.feature), [upload.coordinate.file.feature](../../test/features/upload.coordinate.file.feature)                                                                                                                                                                                                                                                                                                     |
| ML-70    | Upload a coordinate file                         | [ML-70.upload.a.coordinate.file.md](./ML-70.upload.a.coordinate.file.md)                                                 | [upload.coordinate.file.feature](../../test/features/upload.coordinate.file.feature)                                                                                                                                                                                                                                                                                                                                                                                     |
| ML-74    | Review site details (file upload)                | [ML-74.review.site.details.md](./ML-74.review.site.details.md)                                                           | [upload.coordinate.file.feature](../../test/features/upload.coordinate.file.feature)                                                                                                                                                                                                                                                                                                                                                                                     |
| ML-82    | Check answers before sending your information    | [ML-82.check.answers.circular.site.md](./ML-82.check.answers.circular.site.md)                                           | [check.your.answers.feature](../../test/features/check.your.answers.feature), [submit.notification.feature](../../test/features/submit.notification.feature)                                                                                                                                                                                                                                                                                                             |
| ML-84    | Submit notification                              | [ML-84.submit.notification.md](./ML-84.submit.notification.md)                                                           | [submit.notification.feature](../../test/features/submit.notification.feature)                                                                                                                                                                                                                                                                                                                                                                                           |
| ML-96    | View dashboard                                   | [ML-96.view.dashboard.md](./ML-96.view.dashboard.md)                                                                     | [view.dashboard.feature](../../test/features/view.dashboard.feature)                                                                                                                                                                                                                                                                                                                                                                                                     |
| ML-99    | Continue draft notification from dashboard       | [ML-99.continue.draft.notification.from.dashboard.md](./ML-99.continue.draft.notification.from.dashboard.md)             | [view.dashboard.feature](../../test/features/view.dashboard.feature)                                                                                                                                                                                                                                                                                                                                                                                                     |
| ML-379   | View submitted exemption notifications           | [ML-379.submission.of.case.to.d365.md](./ML-379.submission.of.case.to.d365.md)                                           | [submit.notification.to.d365.feature](../../test/features/submit.notification.to.d365.feature)                                                                                                                                                                                                                                                                                                                                                                           |

## Story status

- ✅ **ML-1**: Project name entry and exemption creation
- ✅ **ML-9**: Task list display and navigation
- ✅ **ML-10**: Provide activity dates (Enhanced validation with specific error messages for individual date components)
- ✅ **ML-11**: Provide activity description
- ✅ **ML-12**: Public register consent and withholding
- ✅ **ML-16**: Choose file upload or manual coordinate entry
- ✅ **ML-17**: Choose how to enter site coordinates
- ✅ **ML-18**: Choose coordinate system for site location
- ✅ **ML-19**: Enter coordinate for polygon site (Multiple coordinate entry for triangular sites with comprehensive validation for both WGS84 and OSGB36 systems)
- ✅ **ML-21**: Generate application reference (Generate unique reference number for exemption notifications upon submission)
- ✅ **ML-38**: Add another set of coordinates to a polygon site (Extend polygon coordinate entry to allow adding/removing additional coordinate points beyond the initial three)
- ✅ **ML-35**: Enter centre point of a circle (Coordinate entry with comprehensive validation) ⚠️ _Some back/cancel navigation scenarios @wip_
- ✅ **ML-36**: Enter width of circular site (Width validation and core functionality) ⚠️ _Back/cancel navigation tests planned for future implementation_
- ✅ **ML-37**: Review circular site details (Complete circular site review flow with validation and task completion)
- ✅ **ML-69**: Choose file type to upload (File type selection for site location upload workflow - KML and Shapefile options with validation)
- ✅ **ML-70**: Upload a coordinate file (Complete KML and Shapefile upload functionality with comprehensive validation including virus scanning, file size limits, and file type validation)
- ✅ **ML-74**: Review site details (file upload) (Review uploaded coordinate files with metadata display and task completion for both KML and Shapefile uploads)
- ✅ **ML-82**: Check answers before sending your information (Summary page displaying all notification details before submission)
- ✅ **ML-84**: Submit notification (Submit exemption notification to MMO and display confirmation page with reference number)
- ✅ **ML-96**: View dashboard (Complete dashboard functionality displaying all user exemptions with proper sorting and empty state handling)
- ✅ **ML-99**: Continue draft notification from dashboard (Resume draft applications from dashboard by selecting Continue option to return to task list)
- ✅ **ML-379**: View submitted exemption notifications (D365 integration test that verifies exemption cases are created in Dynamics 365 for MMO internal users to review)

## Feature file tags

Feature files are tagged with `@issue=ML-n` where `n` corresponds to the user story number. This allows for easy tracking between requirements and test implementation.

- `@issue=ML-n` - Links scenarios to specific user stories
- `@smoke` - Core user journey scenarios for fast feedback (run with `npm run test:local -- --cucumberOpts.tags "@smoke"`)
- `@wip` - Features currently under development
- `@run-only` - Can be used to specifically target features during development
- `@real-defra-id` - Tests that require integration with real Defra ID authentication (only runs in test environments integrated with real Defra ID)

**Execution time:** ~2-3 minutes vs full suite ~15+ minutes

## Usage

1. **Product owners/business analysts**: Reference user story files for requirements and acceptance criteria
2. **Developers**: Use both user stories and feature files to understand implementation requirements
3. **Testers**: Feature files contain the automated test scenarios that validate the user stories

## File structure

```
documentation/user-stories/
├── README.md                                                 # This file
├── ML-1.provide.project.name.and.create.exemption.md         # Project name entry
├── ML-9.view.the.task.list.md                                # Task list functionality
├── ML-10.provide.activity.dates.md                           # Activity dates entry with comprehensive validation
├── ML-11.provide.activity.description.md                     # Activity description entry
├── ML-12.provide.or.withhold.public.register.content.md      # Public register consent
├── ML-16.choose.file.upload.or.manual.coordinate.entry.md    # Site location options
├── ML-17.choose.circle.or.coordinate.list.entry.md           # Coordinate entry options (manual path)
├── ML-18.choose.coordinate.system.md                         # Coordinate system selection (manual path)
├── ML-19.enter.coordinate.for.polygon.site.md                # Enter multiple coordinates for polygon sites (manual path)
├── ML-21.generate.application.reference.md                   # Generate application reference (reference number generation)
├── ML-38.add.another.set.of.coordinates.to.a.polygon.site.md # Add another set of coordinates to a polygon site (manual path)
├── ML-35.enter.centre.point.of.a.circle.md                   # Enter centre point of a circle (manual path)
├── ML-36.enter.width.of.circular.site.md                     # Enter width of circular site (manual path)
├── ML-37.review.circular.site.details.md                     # Review circular site details (manual path)
├── ML-69.choose.file.to.upload.md                            # Choose file type to upload (file upload path)
├── ML-70.upload.a.coordinate.file.md                         # Upload a coordinate file (file upload path)
├── ML-74.review.site.details.md                              # Review site details for file upload (file upload path)
├── ML-82.check.answers.circular.site.md                      # Check answers before sending your information
├── ML-84.submit.notification.md                              # Submit notification and show confirmation
├── ML-96.view.dashboard.md                                   # View dashboard with all user exemptions
├── ML-99.continue.draft.notification.from.dashboard.md       # Continue draft notification from dashboard
└── ML-379.submission.of.case.to.d365.md                      # View submitted exemption notifications (MMO internal users)
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
