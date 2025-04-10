Feature: Provide the project name

  Scenario: Create a project with a project name and save
    Given a web browser is on the Project Name page
    When the user inputs a valid project name and clicks save and continue
    Then the new notification is created
