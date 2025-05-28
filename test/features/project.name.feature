@issue=ML-1 @issue=ML-9
Feature: Project name: Starting a new exemption notification by providing a project name

  Scenario: Provide a valid project name for a new exemption notification (less than 250 characters)
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed

  Scenario: Change the project name of an existing notification
    Given a notification has been created with a valid project name
    When the project name is updated
    Then the new project name is saved
