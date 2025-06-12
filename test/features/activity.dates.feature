@issue=ML-10
Feature: Activity dates: The user can provide activity dates for their marine project
  As an applicant
  I want to provide activity dates for my marine project
  So that I can inform MMO when my activity will take place

  @smoke
  Scenario: Save valid activity dates
    Given a notification has been created with a valid project name
    When entering and saving valid activity dates
    Then the "Activity dates" task status is "Completed"

  Scenario: Update previously saved activity dates
    Given the activity dates task has been completed with valid information
    When updating the activity dates with new valid dates
    Then the "Activity dates" task status is "Completed"

  Scenario: Cancel preserves previously saved data
    Given the activity dates task has been completed with valid information
    When changing the activity dates but cancelling out
    Then the "Activity dates" task status is "Completed"

  Scenario: Back link preserves previously saved data
    Given the activity dates task has been completed with valid information
    When changing the activity dates but using the back link
    Then the "Activity dates" task status is "Completed"

  Scenario: Same start and end date is valid
    Given a notification has been created with a valid project name
    When entering and saving activity dates with the same start and end date
    Then the "Activity dates" task status is "Completed" 