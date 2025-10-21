@issue=ML-10
Feature: Activity dates: The user can provide activity dates for their marine project
  As an applicant
  I want to provide activity dates for my marine project
  So that I can inform MMO when my activity will take place

  As an applicant
  I want to be notified when I have provided invalid activity dates
  So that I can correct errors before submitting my marine licence application

  The majority of validation scenarios are covered using integration tests within the frontend project.

  Scenario: Error when no dates are entered
    Given a notification has been created with a valid project name
    And the activity dates are valid
    When clicking save and continue without entering any dates
    Then the start date error "Enter the start date" is displayed
    And the end date error "Enter the end date" is displayed
