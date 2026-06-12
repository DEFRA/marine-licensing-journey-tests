@issue=ML-1206
Feature: Pre and post login checks: account setup guidance and notification type selection
  As a user starting an exempt activity notification
  I want guidance on accessing my organisation's Defra account before signing in,
  and to choose how I am notifying after signing in
  So that I use the correct account and the correct notification type

  Scenario: Check setup page - create new account path shows account creation guidance
    Given the user is on the check setup employee page
    When the user selects the create new account radio option
    And the user clicks Continue
    Then the heading "Create a new Defra account for your organisation" is displayed

  Scenario: Check setup page - need to be added path shows account addition guidance
    Given the user is on the check setup employee page
    When the user selects the need to be added radio option
    And the user clicks Continue
    Then the heading "You need to be added to your organisation" is displayed

  Scenario: Check setup page - yes I can sign in path navigates to confirm employee
    Given the user is on the check setup employee page
    When the user selects the yes I can sign in radio option
    And the user clicks Continue
    And the user logs in and accepts cookies
    Then the heading "Are you notifying us as an employee" is displayed


  Scenario: Individual user selecting organisation option shows organisation guidance page
    Given the user is on the confirm employee page as an "individual"
    When the user selects the organisation radio option
    And the user clicks Continue
    Then the heading "Exempt activity notification for an organisation" is displayed

  Scenario: Individual user selecting personal option navigates to project name
    Given the user is on the confirm employee page as an "individual"
    When the user selects the personal radio option
    And the user clicks Continue
    Then the heading "Project name" is displayed

  Scenario: Organisation user selecting organisation option shows organisation guidance page
    Given the user is on the confirm employee page as an "organisation"
    When the user selects the organisation radio option
    And the user clicks Continue
    Then the heading "Exempt activity notification for an organisation" is displayed

  Scenario: Organisation user selecting personal option shows individual guidance page
    Given the user is on the confirm employee page as an "organisation"
    When the user selects the personal radio option
    And the user clicks Continue
    Then the heading "Exempt activity notification for an individual" is displayed
    And the subheading "Create an individual Defra account" is displayed
