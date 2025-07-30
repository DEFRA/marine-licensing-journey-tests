@d365 @d365-login
Feature: Verify that login to D365 is successful

This feature logs into the Dynamics 354 UI and checks the new case has been created in D365.

  Scenario: After successfully submitting an exemption notification a new case is created in D365
    Given a D365 user
    When the the user launches D365
    Then the user is logged in
