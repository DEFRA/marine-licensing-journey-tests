@smoke
Feature: Concurrent entry of project name - user 9

  Scenario: User 9 enters a project name
    Given the project name page is displayed
    When entering and saving the project with name "Parallel Project I"
    Then the task list page is displayed


