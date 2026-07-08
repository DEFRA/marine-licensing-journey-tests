@lcml @issue=ML-1311
Feature: LCML: Marine plan policies section on the task list
  As an applicant
  I want to see the Marine plan policies section on the marine licence task list
  So that I know I must consider the relevant marine plan policies before sending my application

  Scenario: The Marine plan policies section is displayed on the task list
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the marine plan policies section shows the "Marine plan policy considerations" task

  Scenario: Marine plan policy considerations is "Cannot start yet" before sites are added
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Marine plan policy considerations" task is "Cannot start yet" and is not a link

  Scenario: Marine plan policy considerations is "Not yet started" with a policy count once site details are completed
    Given an organisation user has completed the site details for a marine licence application
    When the user views the marine licence task list
    Then the "Marine plan policy considerations" task is "Not yet started" and shows the number of policies to complete
