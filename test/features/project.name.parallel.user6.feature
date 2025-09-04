@smoke
Feature: Concurrent entry of project name - user 6

  Scenario: User 6 enters a project name
    Given the project name page is displayed
    When entering and saving the project with name "Parallel Project F"
    Then the task list page is displayed


