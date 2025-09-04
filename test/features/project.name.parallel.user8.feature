@smoke
Feature: Concurrent entry of project name - user 8

  Scenario: User 8 enters a project name
    Given the project name page is displayed
    When entering and saving the project with name "Parallel Project H"
    Then the task list page is displayed


