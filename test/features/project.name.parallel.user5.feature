@smoke
Feature: Concurrent entry of project name - user 5

  Scenario: User 5 enters a project name
    Given the project name page is displayed
    When entering and saving the project with name "Parallel Project E"
    Then the task list page is displayed


