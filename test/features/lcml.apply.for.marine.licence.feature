@lcml
Feature: LCML: Apply for a marine licence
  As an applicant
  I want to apply for a marine licence
  So that I can carry out licensable marine activities

  Scenario: Submit a marine licence application
    Given a user is ready to apply for a marine licence
    When the user submits a marine licence application
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page
