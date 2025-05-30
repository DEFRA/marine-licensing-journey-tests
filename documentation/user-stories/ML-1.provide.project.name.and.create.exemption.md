# ML-1: Provide project name and create exemption

## User story

**AS** an applicant  
**I WANT** to provide a name for my marine project  
**SO THAT** I can find it easily later on

## Background

The project name page allows the user to define a freetext name for their project which is meaningful to them. This is the beginning of the process to create the exemption notification, with the IAT aspect of the journey having been conducted in the Fivium space.

## Resources

- Link to "Project name" page in prototype MVP
- Link to data dictionary
- [GitHub - defra-design/marine-licensing-prototype](https://github.com/defra-design/marine-licensing-prototype)

## Out of scope

This story does not cover the use of the project name elsewhere within the service, for example on an applicant dashboard or in Dynamics.

This story does not cover editing the project name from the task list.

This story does not cover navigating to the task list after saving the page.

## Questions and answers

**Q.** How many characters should be allowed for the project name?

**A.** MCMS allows up to 250 characters for project name, and we should continue with that field length.

**Q.** What special characters (if any) does MCMS allow? Should we allow the same?

**A.** MCMS does not appear to have any restrictions on special characters in the project name. If any are required from a security perspective, these can be added under separate stories.

## Screenshots

**Project name page showing:**

- "Project name" as H1 heading
- Helper text: "Enter a descriptive name to help you find your project later"
- Empty text input field for project name
- "Save and continue" button
- Standard GOV.UK page layout with Beta banner

## Acceptance criteria

### AC1 - Display "Project name" page

**GIVEN** I am creating a new exemption notification

**WHEN** I land on the "Project name" page

**THEN** the page will appear as per the prototype  
**AND** the project name field will be blank initially

### AC2 - Validate the project name

**GIVEN** I am viewing the "Project name" page

**WHEN** I select the "Save and continue" button

**THEN** the following validation will be performed on the "Project name" field:

- **Mandatory field** - if the field is not populated, display the following error message: "Enter the project name"
- **Max field length** - if the field contains over 250 characters, display the following error message: "Project name should be 250 characters or less"

### AC3 - Create notification & save project name

**GIVEN** I am viewing the "Project name" page  
**AND** I have provided a project name which will pass the validation defined in the previous AC

**WHEN** I select the "Save and continue" button

**THEN** a new notification record will be created  
**AND** the project name will be saved against that notification  
**AND** I will remain on the "Project name" page (the next story will cover navigation to the task list following a successful save)

## Standard behaviour

**"Back" link** - when I select the "Back" link (if present), I will be returned to the page I was on immediately prior to the current page. Any changes I made on the current page will be discarded.

**"Cancel" link** - when I select the "Cancel" link (if present) I will be returned to the task list. Any changes I made on the current page will be discarded.

**Displaying validation errors** - if any validation errors are triggered, they will be displayed in standard GDS format i.e. [error summary](https://design-system.service.gov.uk/components/error-summary/) at the top of the page, and [error message](https://design-system.service.gov.uk/components/error-message/) against the specific item that triggered the error. The wording of error messages should be verified against the data dictionary.
