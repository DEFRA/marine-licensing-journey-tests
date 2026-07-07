@lcml @issue=ML-1376
Feature: LCML: Harbour authority task
  As an applicant
  I want to record whether my project is located in a harbour authority area
  So that the MMO understands the context of my application


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

  Scenario Outline: Saving an invalid harbour authority answer shows a validation error
    Given an organisation user has started a marine licence application
    When the user saves "<answer>" on the harbour authority page
    Then the harbour authority error "<error>" is shown

    Examples:
      | answer | error                                                              |
      |        | Select whether your project is located in a harbour authority area |
      | Yes    | Enter details of the harbour authority                             |

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
