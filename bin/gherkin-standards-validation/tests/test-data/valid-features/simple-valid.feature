Feature: User Authentication
  As a registered user
  I want to log into the system
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged into the system

  Scenario: User navigates to dashboard
    Given I am logged in
    And I am on the main page
    When I click the dashboard link
    Then I should see the dashboard
    And my user information should be displayed 