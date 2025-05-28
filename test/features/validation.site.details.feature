@issue=ML-16 @issue=ML-17 @issue=ML-18
Feature: Validation of Site details: the user is prevented from proceeding with invalid site location information
  As an applicant
  I want to be notified when I have not provided required site location information
  So that I can correct errors before submitting my marine licence application

  @wip
  Scenario: User is prevented from proceeding without selecting a site location input method
    Given the "How do you want to provide the site location?" page is displayed
    When the Continue button is clicked without selecting a site location option
    Then the error "Select how you want to provide the site location" is displayed

  @wip
  Scenario: User is prevented from proceeding without selecting a coordinate entry method
    Given the "How do you want to enter the coordinates?" page is displayed
    When the Continue button is clicked without selecting a coordinate entry method
    Then the error "Select how you want to enter the coordinates" is displayed

  @wip
  Scenario: User is prevented from proceeding without selecting a coordinate system
    Given the "Which coordinate system do you want to use?" page is displayed
    When the Continue button is clicked without selecting a coordinate system
    Then the error "Select which coordinate system you want to use" is displayed
