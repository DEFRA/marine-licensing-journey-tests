@issue=536842 @post-iat @project-name
Feature: Starting a new exemption notification by providing a project name

  Scenario: As the first step in creating an exemption notification,
  applicants can provide a meaningful name for their project.
  This helps them identify and track their notification throughout the process.  

    Given the project name page is displayed
    When entering and saving the project name
    Then a new notification record is created
    And the project name page remains displayed

  Scenario Outline: Invalid projects names should generate an error.
    Given the project name page is displayed
    When entering and saving the project with name "<projectName>"
    Then the error "<errorMessage>" is displayed

    Examples:
      | projectName | errorMessage             |
      |             | Enter the projectus name |
