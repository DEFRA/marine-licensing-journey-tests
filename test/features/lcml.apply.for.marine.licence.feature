@lcml
Feature: LCML: Apply for a marine licence
  As an applicant
  I want to apply for a marine licence
  So that I can carry out licensable marine activities

  Scenario: Organisation user can submit with other authorities answered Yes
    Given an organisation user has completed other permissions with special legal powers "Yes" and other authorities "Yes"
    When the user submits the marine licence application from the task list
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page

  Scenario: Intermediary user can submit with other authorities answered No
    Given an intermediary user has completed other permissions with special legal powers "No" and other authorities "No"
    When the user submits the marine licence application from the task list
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page

  Scenario: Individual user can submit with other authorities answered No
    Given an individual user has completed other permissions with other authorities "No"
    When the user submits the marine licence application from the task list
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page
