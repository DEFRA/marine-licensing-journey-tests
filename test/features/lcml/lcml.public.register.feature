@lcml @issue=ML-1509 @issue=ML-1631
Feature: LCML: Information published on the public register task
  As an applicant
  I want to be clear about what I am consenting to, and the reasons why I can withhold consent
  So that my application can be handled appropriately

  Scenario: The page asks whether information should be withheld and hides the reasons until asked
    Given an organisation user has started a marine licence application
    When the user opens the Information published on the public register task
    Then the page asks "Do you want to ask us to withhold any information from the public register?"
    And the withholding reasons are hidden
    And selecting "Yes" reveals the withholding reasons "National security reasons" and "Commercial or industrial confidentiality reasons"
    And selecting "No" hides the withholding reasons

  Scenario: Saving a request to withhold information marks the task Completed
    Given an organisation user has started a marine licence application
    When the user saves "Yes" with reason "Commercial or industrial confidentiality reasons" on the public register page
    Then the "Information published on the public register" task status is "Completed"

  Scenario: The saved withholding request is shown on Check your answers
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    And the user saves "Yes" with reason "Commercial or industrial confidentiality reasons" on the public register page
    When the user opens the check your answers page from the task list
    Then "Request that information is withheld" on the public register card is "Yes"

  Scenario: The public register answers are read-only on the View details page
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "No"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    When the user submits the marine licence application from the task list
    And the user views the submitted application on the projects page
    Then the public register card shows "Yes" with no Change link
