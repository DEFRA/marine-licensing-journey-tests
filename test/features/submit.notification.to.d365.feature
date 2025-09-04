@issue=ML-379 @d365
Feature: A new case is created in D365 when an exemption notification is submitted

This feature logs into the Dynamics 365 UI and checks the new case has been created in D365.

  Scenario: After successfully submitting an exemption notification a new case is created in D365
    Given the user has submitted an exemption notification
    When the internal user views the submitted exemption notification in D365
    Then the exemption reference and project name are displayed in the case record
