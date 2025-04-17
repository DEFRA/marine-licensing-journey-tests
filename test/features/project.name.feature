@issue=536842
@post-iat
Feature: Project name entry for exemption notifications
  As the first step in creating an exemption notification,
  applicants can provide a meaningful name for their project.
  This helps them identify and track their notification throughout the process.

  Scenario: Starting a new exemption notification by providing a project name
    Given the project name page is displayed
    When entering and saving the project name
    Then a new notification record is created
    And the project name page remains displayed