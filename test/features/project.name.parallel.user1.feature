@smoke
Feature: Concurrent entry of project name - user 1

  Scenario: User 1 enters a project name
    Given the project name page is displayed
    When entering and saving the project with name "Parallel Project A"
    Then the project name is pre-populated


