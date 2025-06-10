@issue=ML-16 @issue=ML-17 @issue=ML-18
Feature: Validation of Site details: the user is prevented from proceeding with invalid site location information
  As an applicant
  I want to be notified when I have not provided required site location information
  So that I can correct errors before submitting my marine licence application

  Scenario: User is prevented from proceeding without selecting a site location input method
    Given a user is providing site details
    And the "How do you want to provide the site location?" page has been reached
    When the Continue button is clicked without selecting a site location option
    Then the coordinates type error: "Select how you want to provide the site location" is displayed

  Scenario: User is prevented from proceeding without selecting a coordinate entry method
    Given a user is providing site details
    And the "How do you want to enter the coordinates?" page has been reached
    When the Continue button is clicked without selecting a coordinate entry method
    Then the coordinates entry method error: "Select how you want to enter the coordinates" is displayed

  Scenario: User is prevented from proceeding without selecting a coordinate system
  
    Given a user is providing site details
    And the "Which coordinate system do you want to use?" page has been reached
    When the Continue button is clicked without selecting a coordinate system
    Then the coordinates system error "Select which coordinate system you want to use" is displayed
