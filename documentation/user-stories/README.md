# Marine Licensing User Stories

This directory contains user stories for the marine licensing application under test. Each user story documents the requirements, acceptance criteria, and screenshots for specific functionality.

## User stories overview

| Story ID | Title                                         | User story file                                                                                                    | Feature files                                                                                                                                                                                                                                                                                                                                                                          |
| -------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ML-1     | Provide project name and create exemption     | [ML-1.provide.project.name.and.create.exemption.md](./ML-1.provide.project.name.and.create.exemption.md)           | [project.name.feature](../../test/features/project.name.feature), [validation.project.name.feature](../../test/features/validation.project.name.feature)                                                                                                                                                                                                                               |
| ML-9     | View the task list                            | [ML-9.view.the.task.list.md](./ML-9.view.the.task.list.md)                                                         | [task.list.feature](../../test/features/task.list.feature), [project.name.feature](../../test/features/project.name.feature)                                                                                                                                                                                                                                                           |
| ML-12    | Provide or withhold public register content   | [ML-12.provide.or.withhold.public.register.content.md](./ML-12.provide.or.withhold.public.register.content.md)     | [public.register.feature](../../test/features/public.register.feature), [validation.public.register.feature](../../test/features/validation.public.register.feature), [back.and.cancel.public.register.feature](../../test/features/back.and.cancel.public.register.feature)                                                                                                           |
| ML-16    | Choose file upload or manual coordinate entry | [ML-16.choose.file.upload.or.manual.coordinate.entry.md](./ML-16.choose.file.upload.or.manual.coordinate.entry.md) | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.and.cancel.site.details.feature](../../test/features/back.and.cancel.site.details.feature) |
| ML-17    | Choose circle or coordinate list entry        | [ML-17.choose.circle.or.coordinate.list.entry.md](./ML-17.choose.circle.or.coordinate.list.entry.md)               | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.and.cancel.site.details.feature](../../test/features/back.and.cancel.site.details.feature) |
| ML-18    | Choose coordinate system                      | [ML-18.choose.coordinate.system.md](./ML-18.choose.coordinate.system.md)                                           | [site.details.manual.circle.feature](../../test/features/site.details.manual.circle.feature), [site.details.manual.polygon.feature](../../test/features/site.details.manual.polygon.feature), [validation.site.details.feature](../../test/features/validation.site.details.feature), [back.and.cancel.site.details.feature](../../test/features/back.and.cancel.site.details.feature) |

## Story status

- ✅ **ML-1**: Project name entry and exemption creation
- ✅ **ML-9**: Task list display and navigation
- ✅ **ML-12**: Public register consent and withholding
- ✅ **ML-16**: Choose file upload or manual coordinate entry
- ✅ **ML-17**: Choose how to enter site coordinates
- ✅ **ML-18**: Choose coordinate system for site location

## Feature file tags

Feature files are tagged with `@issue=ML-n` where `n` corresponds to the user story number. This allows for easy tracking between requirements and test implementation.

- `@wip` tags are used for features currently under development
- `@run-only` can be used to specifically target features during development

## Usage

1. **Product owners/business analysts**: Reference user story files for requirements and acceptance criteria
2. **Developers**: Use both user stories and feature files to understand implementation requirements
3. **Testers**: Feature files contain the automated test scenarios that validate the user stories

## File structure

```
documentation/user-stories/
├── README.md                                               # This file
├── ML-1.provide.project.name.and.create.exemption.md      # Project name entry
├── ML-9.view.the.task.list.md                             # Task list functionality
├── ML-12.provide.or.withhold.public.register.content.md   # Public register consent
├── ML-16.choose.file.upload.or.manual.coordinate.entry.md # Site location options
├── ML-17.choose.circle.or.coordinate.list.entry.md        # Coordinate entry options
└── ML-18.choose.coordinate.system.md                      # Coordinate system selection
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
