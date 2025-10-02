@issue=ML-379 @d365-view-notifications
Feature: A new case is created in D365 when an exemption notification is submitted
This feature logs into the Dynamics 365 UI and checks the new case has been created in D365.

  Scenario: After successfully submitting an exemption notification a new case is created in D365
    Given the user has submitted an exemption notification
    When the internal user views the submitted exemption notification in D365
    Then the exemption reference and project name are displayed in the case record

  @issue=ML-271
  Scenario: Authentication is required to access the read-only notification page
    Given the user has submitted an exemption notification
    When an unauthenticated user tries to access the notification view link
    Then access is denied

  @issue=ML-271 @broken
  Scenario: After a notification has been submitted, the internal user is able to see the details from the link in MCMS
    Given the user has submitted an exemption notification
    When the internal user views the submitted exemption notification in D365
    And the internal user follows the link to view the exemption notification from D365
    Then the submitted exemption notification is displayed
