@smoke
Feature: Concurrent entry of project name - user 10

  Scenario: User 10 enters a project name
    Given the project name page is displayed
    When entering and saving the project with name "Parallel Project J"
    Then the task list page is displayed


