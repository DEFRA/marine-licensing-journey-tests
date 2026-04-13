@lcml
Feature: LCML: Apply for a marine licence
  As an applicant
  I want to apply for a marine licence
  So that I can carry out licensable marine activities

  Scenario: Organisation user can submit a marine licence with KML upload, other authorities Yes and sharing consent Yes
    Given an organisation user has completed all tasks with special legal powers "Yes", other authorities "Yes" and sharing consent "Yes"
    When the user submits the marine licence application from the task list
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page

  Scenario: Intermediary user can submit a marine licence with shapefile upload, other authorities No and sharing consent No
    Given an intermediary user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "No"
    When the user submits the marine licence application from the task list
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page

  Scenario: Individual user can submit a marine licence with KML upload, other authorities No and sharing consent No
    Given an individual user has completed all tasks with other authorities "No" and sharing consent "No"
    When the user submits the marine licence application from the task list
    Then the confirmation page is displayed with a marine licence reference
    And the submitted marine licence application is displayed on the projects page
