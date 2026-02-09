@real-defra-id
Feature: Dashboard filter: Filter projects by ownership
  As an applicant
  I want to filter the dashboard by my projects or all organisation projects
  So that I can find the relevant project quickly

  Background:
    Given a user has submitted an exemption notification

  Scenario: Dashboard displays filter radio buttons and Owner column with JS enabled
    When the user navigates to the dashboard
    Then the dashboard filter is displayed with "My projects" and "All projects" radio options
    And the "My projects" radio option is selected by default
    And the "All projects" radio option label includes the user's organisation name
    And the "Update results" button is not visible
    And the projects table includes an "Owner" column

  Scenario: Changing the filter radio auto-updates results without clicking Update results
    When the user navigates to the dashboard
    And the user selects the "All projects" filter radio option
    Then the dashboard results are updated without clicking a button
    And the projects table is displayed
