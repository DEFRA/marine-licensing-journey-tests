@smoke
Feature: Concurrent entry of project name - user 4

  Scenario: User 4 enters a project name
    Given the project name page is displayed
    When entering and saving the project with name "Parallel Project D"
    Then the task list page is displayed


