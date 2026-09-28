@issue=ML-9
Feature: Task list: The user can view the details of what they need to provide for their exemption
  As an applicant
  I want to view the details of what I need to provide for my exemption
  So that I can provide the information when I have it

  Scenario: Display the task list page
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the "Project name" task status is "Completed"

  Scenario: Access the Project name task where a project has previously been saved
    Given a notification has been created with a valid project name
    When the "Project name" task is selected
    Then the project name is pre-populated
