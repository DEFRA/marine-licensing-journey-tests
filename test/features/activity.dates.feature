@issue=ML-10
Feature: Activity dates: The user can provide activity dates for their marine project
  As an applicant
  I want to provide activity dates for my marine project
  So that I can inform MMO when my activity will take place

  @smoke
  Scenario: Save valid activity dates
    Given a notification has been created with a valid project name
    And the activity dates are valid
    When completing the activity dates task
    Then the "Activity dates" task status is "Completed"

  Scenario: Save valid activity dates with today as start date
    Given a notification has been created with a valid project name
    And the start date of the activity is today
    When completing the activity dates task
    Then the "Activity dates" task status is "Completed"

  Scenario: Update previously saved activity dates
    Given a notification has been created with a valid project name
    And the activity dates task has been completed
    When completing the activity dates task with different dates
    Then the "Activity dates" task status is "Completed"

  Scenario: Same start and end date is valid
    Given a notification has been created with a valid project name
    And the activity will take place in a single day
    When completing the activity dates task
    Then the "Activity dates" task status is "Completed"

  Scenario: Cancel preserves previously saved data
    Given a notification has been created with a valid project name
    And the activity dates task has been completed
    When changing the activity dates but cancelling out
    Then the "Activity dates" task status is "Completed"

  Scenario: Back link preserves previously saved data
    Given a notification has been created with a valid project name
    And the activity dates task has been completed
    When changing the activity dates but using the back link
    Then the "Activity dates" task status is "Completed"
