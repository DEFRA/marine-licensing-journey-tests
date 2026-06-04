@lcml @issue=ML-1241
Feature: LCML: Pre-application consultation task
  As an applicant
  I want to record whether I have consulted with public groups or organisations
  So that the MMO understands the context of my application

  Scenario: Pre-application consultation task is displayed with "Not yet started"
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Pre-application consultation" task is displayed with status "Not yet started"

  Scenario: Page loads empty with toggleable guidance and toggleable details textbox
    Given an organisation user has started a marine licence application
    When the user opens the pre-application consultation task
    Then the pre-application consultation page is empty with toggleable guidance
    And selecting "Yes" reveals the details textbox
    And selecting "No" hides the details textbox

  Scenario Outline: Saving "<answer>" marks the pre-application consultation task Completed
    Given an organisation user has started a marine licence application
    When the user has saved "<answer>" with details "<details>" on pre-application consultation
    Then the "Pre-application consultation" task status is "Completed"

    Examples:
      | answer | details                                                    |
      | Yes    | Consulted the local conservation group and Natural England |
      | No     |                                                            |

  Scenario: Changing the consultation answer via Check your answers bounces back showing the new value
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    And the user has saved "Yes" with details "Initial consultation notes" on pre-application consultation
    When the user opens the check your answers page from the task list
    And the user changes the consultation answer to "No" via check your answers
    Then the consultation answer on the check your answers page is "No"

  Scenario: View details page shows the saved consultation answer as read-only
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    And the user has saved "Yes" with details "Met with the local fisheries forum" on pre-application consultation
    When the user submits the marine licence application from the task list
    And the user views the submitted application on the projects page
    Then the consultation answer on the view details page is "Met with the local fisheries forum" and read-only
