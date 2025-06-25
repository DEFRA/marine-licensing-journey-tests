@issue=ML-12 @run-only
Feature: Back and Cancel from Public register: State management when clicking back or cancel

  Scenario: Cancelling out of the public register task when no information has previously been saved
    Given the Public register page is displayed
    When completing the public register task but cancelling out
    Then the task list page is displayed
    And the "Public register" task status is "Incomplete"
    And any changes made on the public register page before cancelling are not saved

  Scenario: Using the back link from the public register task when no information has previously been saved
    Given the Public register page is displayed
    When completing the public register task but selecting to go back
    Then the task list page is displayed
    And the "Public register" task status is "Incomplete"
    And any changes made on the public register page before going back are not saved

  Scenario: Cancelling out of the public register task when information has previously been saved
    Given the Public register task has been completed with consent
    When changing the public register information to withhold but cancelling out
    Then the "Public register" task status is "Completed"
    And the previously saved changes are pre-populated

  Scenario: Using the back link from the public register task when information has previously been saved
    Given the Public register task has been completed with consent
    When changing the public register information to withhold but selecting to go back
    Then the "Public register" task status is "Completed"
    And the previously saved changes are pre-populated
