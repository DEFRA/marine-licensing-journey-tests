@lcml @issue=ML-1243
Feature: LCML: Preferred start and end dates of the licence task
  As an applicant
  I want to provide details of preferred start and end dates of the licence
  So that MMO know my preferred dates and can manage my application accordingly

  Scenario: Preferred dates task is displayed with "Not yet started"
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Preferred start and end dates of the licence" task is displayed with status "Not yet started"

  Scenario: Preferred dates page loads empty with dynamic hint text
    Given an organisation user has started a marine licence application
    When the user opens the preferred dates task
    Then the preferred dates page is displayed with no pre-populated dates
    And the start date hint shows the month 3 months from now
    And the end date hint shows the month 15 months from now

  Scenario: Saving valid preferred dates marks the task Completed and returns to task list
    Given an organisation user has started a marine licence application
    When the user saves valid preferred dates on the preferred dates page
    Then the "Preferred start and end dates of the licence" task is displayed with status "Completed"
    And the user is on the marine licence task list

  Scenario: Cancel returns to task list without changing the task status
    Given an organisation user has started a marine licence application
    When the user opens the preferred dates task
    And the user cancels from the preferred dates page
    Then the user is on the marine licence task list
    And the "Preferred start and end dates of the licence" task is displayed with status "Not yet started"

  Scenario: Changing preferred dates via Check your answers bounces back showing updated dates
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    When the user opens the check your answers page from the task list
    And the user changes the preferred dates via check your answers
    Then the check your answers page is displayed with the preferred dates section

  Scenario: View details page shows the saved preferred dates as read-only
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    When the user submits the marine licence application from the task list
    And the user views the submitted application on the projects page
    Then the preferred dates are displayed as read-only on the view details page
