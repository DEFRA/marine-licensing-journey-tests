# ML-9: View the Task List

## User Story

**AS** an applicant  
**I WANT** to view the details of what I need to provide for my exemption  
**SO THAT** I can provide the information when I have it

## Background

The task list is effectively the 'home page' of the notification - it is where the user accesses the different tasks and provides the information required. The user returns to this page when each task is completed.

## Resources

- Link to "Task list" page in prototype MVP
- Link to data dictionary
- Link to entity relationship diagram
- Design System: [Task list](https://design-system.service.gov.uk/patterns/task-list/)

## Out of Scope

This story does not cover the other tasks on the task list. Only the "Project name" task will be displayed.

This story does not cover the status updates for the tasks on the task list i.e. changing the status of the task from "Not started" to "Completed" as the user completes them.

This story does not cover the conditionally revealed CTA at the bottom of the page when all tasks are completed.

This story does not cover the behaviour of the links in the header - "Projects home", "Defra account" and "Sign out". These links are shown in the screenshot/prototype when the user goes back into the "project name" task, but will be implemented later in a separate story.

This story does not cover the link for the survey in the header.

This story does not cover the links in the footer.

## Questions and Answers

**Q.** Given that we are adding individual site-level activity dates and descriptions, do we still need these project-level tasks? If not, the screenshot will need to be updated, with those tasks removed.

**A.** This story has been updated (AC1) to reflect that the other tasks on the task list will not be added until the functionality behind each task is delivered. This means that the only task that will appear initially is the "Project name" task. This gives means we are not affected by any design changes that are made to the other tasks.

## Screenshots

**Task list page showing:**

- "Exempt activity" page type
- "Hammersmith pontoon construction" as H1 heading
- "Project name" task marked as "Completed"
- Other tasks ("Activity dates", "Activity details", "Site details", "Public register") marked as "Incomplete"
- Explanatory text about completing sections and ability to make changes

**NOTE** - the only task that will appear as part of this story is the "Project name" task

## Acceptance Criteria

### AC1 - Display the "Task list" page

**GIVEN** I am viewing the "Project name" page (as per [ML-1: Provide project name and create exemption](./ML-1.provide.project.name.and.create.exemption.md))

**WHEN** the new application is successfully created via the "Save and continue" button

**THEN** I am taken to the "Task list" page  
**AND** the page appears as per the prototype:

- the project name appears as the H1 for the page (e.g. "Hammersmith pontoon construction")
- the "Project name" task is shown as "Completed"
- the other tasks are not shown (these task links will be added in later stories, as the functionality behind each task is delivered)

### AC2 - "Project name" task

**GIVEN** I am viewing the "Task list" page

**WHEN** I select the "Project name" task link

**THEN** I am taken to the "Project name" page  
**AND** the page is pre-populated with the project name for the notification  
**AND** I can make changes as necessary and return to the task list

**NOTE** - changes to the project name would be saved as expected

**NOTE** - links in the project header shown in the prototype will not be displayed as yet, this will be covered in a separate ticket

### AC3 - Other tasks

**GIVEN** I am viewing the "Task list" page

**WHEN** I select any of the other task links on the page (i.e. anything other than "Project name")

**THEN** I remain on the "Task list" page (i.e. the links don't do anything yet)

**NOTE** - the behaviour of the other tasks will be covered under separate stories
