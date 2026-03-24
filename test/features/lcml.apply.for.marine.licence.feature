@lcml
Feature: LCML: Apply for a marine licence
  As an applicant
  I want to apply for a marine licence
  So that I can carry out licensable marine activities

  Scenario: Organisation user can submit a marine licence application
    Given an organisation user has started a marine licence application
    When the user submits the marine licence application
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page

  Scenario: Intermediary user can submit a marine licence application
    Given an intermediary user has started a marine licence application
    When the user submits the marine licence application
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page

  Scenario: Individual user can submit a marine licence application
    Given an individual user has started a marine licence application
    When the user submits the marine licence application
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page
