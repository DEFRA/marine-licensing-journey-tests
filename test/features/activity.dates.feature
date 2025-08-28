@issue=ML-10
Feature: Activity dates: The user can provide activity dates for their marine project
  As an applicant
  I want to provide activity dates for my marine project
  So that I can inform MMO when my activity will take place

  The majority of scenarios are covered using integration tests within the frontend project.

  @smoke
  Scenario: Save valid activity dates
    Given a notification has been created with a valid project name
    And the activity dates are valid
    When completing the activity dates task
    Then the "Activity dates" task status is "Completed"

  Scenario: Update previously saved activity dates
    Given a notification has been created with a valid project name
    And the activity dates task has been completed
    When completing the activity dates task with different dates
    Then the "Activity dates" task status is "Completed"
