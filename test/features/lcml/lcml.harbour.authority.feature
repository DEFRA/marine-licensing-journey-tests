@lcml @issue=ML-1376
Feature: LCML: Harbour authority task
  As an applicant
  I want to record whether my project is located in a harbour authority area
  So that the MMO understands the context of my application

  # AC8 (Cancel / Back returns to the task list without changing the saved answer
  # or status) is intentionally not automated: project convention is not to write
  # Back-link or Continue-button navigation tests.

  Scenario: Harbour authority task is displayed in the Other permissions section with "Not yet started"
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the harbour authority task is shown in the Other permissions section with status "Not yet started"

  Scenario: Harbour authority page loads empty with a toggleable details textbox
    Given an organisation user has started a marine licence application
    When the user opens the harbour authority task
    Then the harbour authority page is empty with the details textbox hidden
    And selecting "Yes" reveals the harbour authority details textbox
    And selecting "No" hides the harbour authority details textbox

  Scenario: Saving with no answer selected shows a validation error
    Given an organisation user has started a marine licence application
    When the user saves the harbour authority page without selecting an answer
    Then the harbour authority error "Select whether your project is located in a harbour authority area" is shown

  Scenario: Saving "Yes" without details shows a validation error
    Given an organisation user has started a marine licence application
    When the user saves "Yes" on the harbour authority page without details
    Then the harbour authority error "Enter details of the harbour authority" is shown

  Scenario: Saving "Yes" with more than 1000 characters shows a validation error
    Given an organisation user has started a marine licence application
    When the user saves "Yes" on the harbour authority page with 1001 characters of details
    Then the harbour authority error "Details of the harbour authority must be 1000 characters or fewer" is shown

  Scenario Outline: Saving a valid harbour authority answer marks the task Completed
    Given an organisation user has started a marine licence application
    When the user saves "<answer>" with details "<details>" on the harbour authority page
    Then the "Harbour authority" task status is "Completed"

    Examples:
      | answer | details                                     |
      | Yes    | Located within the Port of Dover authority  |
      | No     |                                             |

  Scenario: Harbour authority answer "No" is shown on the Check your answers page
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    When the user opens the check your answers page from the task list
    Then the harbour authority answer on the check your answers page is "No"

  Scenario: Changing the harbour authority answer via Check your answers bounces back showing the new value
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    When the user opens the check your answers page from the task list
    And the user changes the harbour authority answer to "Yes" with details "Located within the Port of Dover authority" via check your answers
    Then the harbour authority answer on the check your answers page is "Located within the Port of Dover authority"

  Scenario: Harbour authority answer is shown read-only on the View details page
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    And the user has saved "Yes" with details "Located within the Port of Dover authority" on the harbour authority page
    When the user submits the marine licence application from the task list
    And the user views the submitted application on the projects page
    Then the harbour authority answer on the view details page is "Located within the Port of Dover authority" and read-only
