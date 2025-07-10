@issue=ML-96
Feature: View dashboard: View a list of all applications to keep track of and manage them
  - ML-96: View dashboard

  Scenario: After submitting a notification, view it on the dashboard
    Given a user has submitted an exemption notification
    When the user clicks on Projects home in the header
    Then the dashboard displays the submitted notification correctly

  Scenario: View empty dashboard when no notifications exist
    Given the user has not submitted any notifications
    When the user navigates to the dashboard
    Then the message "You currently have no projects." is shown
