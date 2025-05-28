# Marine Licensing User Stories

This directory contains user stories for the marine licensing application under test. Each user story documents the requirements, acceptance criteria, and screenshots for specific functionality.

## User Stories Overview

| Story ID | Title                                         | User Story File                                                                                                      | Feature Files                                                                                                                            |
| -------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ML-1     | Provide Project Name and Create Exemption     | [ML-1.provide.project.name.and.create.exemption.mdc](./ML-1.provide.project.name.and.create.exemption.mdc)           | [project.name.feature](../../test/features/project.name.feature)                                                                         |
| ML-9     | View the Task List                            | [ML-9.view.the.task.list.mdc](./ML-9.view.the.task.list.mdc)                                                         | [view.task.list.feature](../../test/features/view.task.list.feature)<br>[project.name.feature](../../test/features/project.name.feature) |
| ML-12    | Provide or Withhold Public Register Content   | [ML-12.provide.or.withhold.public.register.content.mdc](./ML-12.provide.or.withhold.public.register.content.mdc)     | [public.register.consent.feature](../../test/features/public.register.consent.feature)                                                   |
| ML-16    | Choose File Upload or Manual Coordinate Entry | [ML-16.choose.file.upload.or.manual.coordinate.entry.mdc](./ML-16.choose.file.upload.or.manual.coordinate.entry.mdc) | -                                                                                                                                        |
| ML-17    | Choose Circle or Coordinate List Entry        | [ML-17.choose.circle.or.coordinate.list.entry.mdc](./ML-17.choose.circle.or.coordinate.list.entry.mdc)               | -                                                                                                                                        |
| ML-18    | Choose Coordinate System                      | [ML-18.choose.coordinate.system.mdc](./ML-18.choose.coordinate.system.mdc)                                           | -                                                                                                                                        |

## Story Status

- ✅ **ML-1**: Project name entry and exemption creation
- ✅ **ML-9**: Task list display and navigation
- ✅ **ML-12**: Public register consent and withholding
- 🔄 **ML-16**: Choose file upload or manual coordinate entry
- 🔄 **ML-17**: Choose how to enter site coordinates
- 🔄 **ML-18**: Choose coordinate system for site location

## Feature File Tags

Feature files are tagged with `@issue=ML-n` where `n` corresponds to the user story number. This allows for easy tracking between requirements and test implementation.

## Usage

1. **Product Owners/Business Analysts**: Reference user story files for requirements and acceptance criteria
2. **Developers**: Use both user stories and feature files to understand implementation requirements
3. **Testers**: Feature files contain the automated test scenarios that validate the user stories

## File Structure

```
.cursor/user-stories/
├── README.md                                               # This file
├── ML-1.provide.project.name.and.create.exemption.mdc      # Project name entry
├── ML-9.view.the.task.list.mdc                             # Task list functionality
├── ML-12.provide.or.withhold.public.register.content.mdc   # Public register consent
├── ML-16.choose.file.upload.or.manual.coordinate.entry.mdc # Site location options
├── ML-17.choose.circle.or.coordinate.list.entry.mdc        # Coordinate entry options
└── ML-18.choose.coordinate.system.mdc                      # Coordinate system selection
```

## Adding New User Stories

When adding new user stories:

1. Create a new `.mdc` file following the naming convention: `ML-{number}.{descriptive.name}.mdc`
2. Update this README.md file with the new entry in the table above
3. Add descriptions of the screenshots provided as images
4. Update the story status section

## Related Documentation

- [Project Structure](../../marine-licensing-journey-tests/project-structure.mdc) - Overall project organisation
- [Application Under Test](../../marine-licensing-journey-tests/application.under.test.mdc) - Context about the marine licensing application
- [Screenplay Pattern](../../marine-licensing-journey-tests/screenplay-pattern.mdc) - Testing approach and patterns
