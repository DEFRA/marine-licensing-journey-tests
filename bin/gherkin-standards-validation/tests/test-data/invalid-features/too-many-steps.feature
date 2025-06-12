Feature: Complex User Journey with Violations
  As a user
  I want to perform complex actions
  So that I can test the step limit validation

  Scenario: User registration process with too many steps
    Given I am on the registration page
    And I can see the registration form
    And the form fields are visible
    When I enter my first name
    And I enter my last name
    And I enter my email address
    And I enter my password
    And I confirm my password
    And I select my country
    And I agree to the terms
    And I click the register button
    Then I should see a success message
    And I should receive a confirmation email
    And I should be redirected to the welcome page

  Scenario: Another scenario with excessive steps
    Given I have an account
    And I am logged in
    And I navigate to settings
    And I open the profile section
    And I edit my personal details
    When I change my address
    And I update my phone number
    And I modify my preferences
    And I save the changes
    And I verify the updates
    Then the changes should be reflected
    And I should see a confirmation message 