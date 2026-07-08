@lcml @issue=ML-1249
Feature: LCML: Marine plan policy consideration page
  As an applicant
  I want to record how I have considered each marine plan policy
  So that I can complete the marine plan policies section of my application

  Scenario: The Policy consideration page displays the policy details
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy from the marine plan policy list
    Then the policy consideration page shows the policy code, policy information and a blank consideration textarea

  Scenario: Saving a policy consideration with no text shows the mandatory error
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves an empty consideration
    Then the policy consideration error "Enter how you have considered this policy" is shown

  Scenario: Saving a policy consideration over 2000 characters shows the maximum length error
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves a consideration of 2001 characters
    Then the policy consideration error "Policy consideration must be 2000 characters or less" is shown

  Scenario: Saving a valid policy consideration marks the policy Completed and updates the count
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves a valid consideration
    Then the saved policy is shown as "Completed" with an updated completed count

  Scenario: A saved policy consideration is defaulted in when the policy is reopened
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves a valid consideration
    And the user reopens the saved policy
    Then the policy consideration textarea contains the saved response
