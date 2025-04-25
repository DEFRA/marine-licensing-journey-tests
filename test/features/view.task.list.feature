@issue=ML-9 @post-iat @task-list @exemptions
Feature: View exemption task details
  As an applicant
  I want to view the details of what I need to provide for my exemption
  So that I can provide the information when I have it

  Scenario: Display the task list page
    Given the project name page is displayed
    When entering and saving the project with a valid name
    Then the project name task is shown as "Completed"
    And the other tasks are shown as "Incomplete"

  Scenario: Access the Project name task where a project has previously been saved
    Given a notification has been created with a valid project name
    When the project name task is selected
    Then the project name is pre-populated

  Scenario: Change the project name of an existing notification
    Given a notification has been created with a valid project name
    When the project name is updated
    Then the new project name is saved

  Scenario Outline: Accessing task <task> not yet implemented
    Given the task list page is displayed
    When the task "<task>" is selected
    Then the task list page remains displayed

    Examples:
      | task |
      |      |
