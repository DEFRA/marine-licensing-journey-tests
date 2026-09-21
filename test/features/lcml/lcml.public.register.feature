@lcml @issue=ML-1509
Feature: LCML: Public register task
  As an applicant
  I want to be clear about what I am consenting to, and the reasons why I can withhold consent
  So that my application can be handled appropriately

  Scenario: The page asks whether information should be withheld and hides the details until asked
    Given an organisation user has started a marine licence application
    When the user opens the Public register task
    Then the page asks "Do you want to request that information is withheld for either of these reasons?"
    And the withholding details field is hidden
    And selecting "Yes" reveals the withholding details field with a 1000 character limit
    And selecting "No" hides the withholding details field

  Scenario: Saving a request to withhold information marks the task Completed
    Given an organisation user has started a marine licence application
    When the user saves "Yes" with details "Mooring positions are commercially confidential" on the Public register page
    Then the "Public register" task status is "Completed"

  Scenario: The saved request and details are shown on Check your answers
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    And the user saves "Yes" with details "Mooring positions are commercially confidential" on the Public register page
    When the user opens the check your answers page from the task list
    Then "Request that information is withheld" on the public register card is "Yes"
    And "Details of information to be withheld and why" on the public register card is "Mooring positions are commercially confidential"

  Scenario: The public register answers are read-only on the View details page
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "No"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    When the user submits the marine licence application from the task list
    And the user views the submitted application on the projects page
    Then the public register card shows "Yes" with no Change link
