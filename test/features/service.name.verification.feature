@issue=ML-543
Feature: Service name verification: Ensure correct service name is displayed consistently
  As a user of the marine licensing service
  I want to see the correct service name "Get permission for marine work" displayed consistently
  So that I have a clear understanding of what service I am using

  @smoke
  Scenario: Verify service name on dashboard
    Given a user has submitted an exemption notification
    When the user navigates to the dashboard
    Then the service name "Get permission for marine work" is displayed in the header

  @smoke
  Scenario: Verify service name on task list
    Given the project name page is displayed
    When entering and saving a project with a valid name
    Then the task list page is displayed
    And the service name "Get permission for marine work" is displayed in the header
