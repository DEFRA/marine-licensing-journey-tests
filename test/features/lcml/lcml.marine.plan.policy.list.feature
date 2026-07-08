@lcml @issue=ML-1248
Feature: LCML: Marine plan policies Policy list page
  As an applicant
  I want to see the list of marine plan policies for my application
  So that I know which policies I must consider before sending my information

  Scenario: Selecting the task opens the Policy list page with the policies sorted alphabetically by code
    Given an organisation user has completed the site details for a marine licence application
    When the user opens the Marine plan policy considerations task
    Then the policy list page shows the policy count and an alphabetically sorted list of policy codes
