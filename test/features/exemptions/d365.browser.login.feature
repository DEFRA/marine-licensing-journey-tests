@wip
Feature: Verify that browser login to D365 is successful

  Scenario: User can log into D365
    Given a D365 user
    When the user logs into D365 via browser
    Then the user is logged in
