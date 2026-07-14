@lcml
Feature: LCML: Marine plan policies
  As an applicant
  I want to consider the marine plan policies relevant to my application
  So that I can complete the marine plan policies section before sending my information

  @issue=ML-1311
  Scenario: The Marine plan policies section is displayed on the task list
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the marine plan policies section shows the "Marine plan policy considerations" task

  @issue=ML-1311
  Scenario: Marine plan policy considerations is "Cannot start yet" before sites are added
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Marine plan policy considerations" task is "Cannot start yet" and is not a link

  @issue=ML-1311 @issue=ML-1248 @issue=ML-1351
  Scenario: Marine plan policy considerations is "Not yet started" with a policy count once site details are completed
    Given an organisation user has completed the site details for a marine licence application
    When the user views the marine licence task list
    Then the "Marine plan policy considerations" task is "Not yet started" and shows the number of policies to complete

  @issue=ML-1248
  Scenario: Selecting the task opens the Policy list page with the policies sorted alphabetically by code
    Given an organisation user has completed the site details for a marine licence application
    When the user opens the Marine plan policy considerations task
    Then the policy list page shows the policy count and an alphabetically sorted list of policy codes

  @issue=ML-1249
  Scenario: The Policy consideration page displays the policy details
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy from the marine plan policy list
    Then the policy consideration page shows the policy code, policy information and a blank consideration textarea

  @issue=ML-1249
  Scenario: Saving a policy consideration with no text shows the mandatory error
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves an empty consideration
    Then the policy consideration error "Enter how you have considered this policy" is shown

  @issue=ML-1249
  Scenario: Saving a policy consideration over 2000 characters shows the maximum length error
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves a consideration of 2001 characters
    Then the policy consideration error "Policy consideration must be 2000 characters or less" is shown

  @issue=ML-1249
  Scenario: Saving a valid policy consideration marks the policy Completed and updates the count
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves a valid consideration
    Then the saved policy is shown as "Completed" with an updated completed count

  @issue=ML-1249
  Scenario: A saved policy consideration is defaulted in when the policy is reopened
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves a valid consideration
    And the user reopens the saved policy
    Then the policy consideration textarea contains the saved response

  @issue=ML-1351
  Scenario: The task is "In progress" with a completed count when some policies are completed
    Given an organisation user has completed the site details for a marine licence application
    When the user opens a policy and saves a valid consideration
    And the user returns to the task list from the policy list
    Then the "Marine plan policy considerations" task is "In progress" and shows some of the policies completed

  @issue=ML-1351
  Scenario: The task is "Completed" when all policies are completed
    Given an organisation user has completed the site details for a marine licence application
    When the user completes all marine plan policy considerations
    And the user returns to the task list from the policy list
    Then the "Marine plan policy considerations" task is "Completed" and shows all of the policies completed

  @issue=ML-1342
  Scenario Outline: The marine plan policies guidance link opens a standalone guidance page in a new tab
    Given an organisation user has completed the site details for a marine licence application
    When the user opens the marine plan policies guidance link from the "<page>" page
    Then the marine plan policies guidance page opens in a new tab, without header links, a back link or a project name, and lists GOV.UK guidance links

    Examples:
      | page                 |
      | task list            |
      | policy list          |
      | policy consideration |
