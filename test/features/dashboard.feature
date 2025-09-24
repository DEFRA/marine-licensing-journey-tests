@issue=ML-96 @issue=ML-99 @issue=ML-100 @issue=ML-124 @issue=ML-591
Feature: View dashboard: View a list of all applications to keep track of and manage them
  As an applicant
  I want to see a list of all my applications
  So that I can keep track of my applications and manage them

  Scenario: After submitting a notification, view it via the dashboard
    Given a user has submitted an exemption notification
    When the user clicks view details for the submitted notification on the dashboard
    Then the user is able to view the notification in a summary format

  Scenario: View empty dashboard when no notifications exist
    Given the user has not submitted any notifications
    When the user navigates to the dashboard
    Then the message "You currently have no projects." is shown

  Scenario: Continue a draft notification from the dashboard
    Given the user has a draft exemption notification
    When the user continues the notification from the dashboard and reenters the project name task
    Then the project name is pre-populated
    And the page caption shows the previously saved project name

  Scenario: When a user has previously submitted a notification and starts a new one, no previously input data is shown
    Given a user has submitted an exemption notification
    When the user starts a new notification
    Then the project name is not pre-populated

  @smoke
  Scenario: View dashboard with notifications in correct sort order
    Given the user has multiple notifications with different statuses and names
    When the user navigates to the dashboard
    Then the notifications are displayed with the correct information
    And the notifications are sorted by status with drafts first then by project name

  Scenario: Delete a draft notification from the dashboard
    Given the user has a draft exemption notification
    When the user deletes the draft notification from the dashboard
    Then the notification is removed from the dashboard
