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

  @issue=ML-1261
  Scenario: The finished-site-details question is shown once all site details are complete
    Given an organisation user has completed the site details for a marine licence application
    When the user opens the review site details page from the task list
    Then the review page shows the marine plan policies heading and the finished-site-details question
    And neither finished-site-details radio is selected

  @issue=ML-1261
  Scenario: The finished-site-details question is hidden while site details are incomplete
    Given an organisation user has manually entered a circular site for a marine licence
    When the user views the review site details page
    Then the review page does not show the finished-site-details question

  @issue=ML-1261
  Scenario: Selecting Continue without answering the finished-site-details question shows an error
    Given an organisation user has completed the site details for a marine licence application
    And the user opens the review site details page from the task list
    When the user selects Continue without answering the finished-site-details question
    Then the finished-site-details error "Select if you have finished entering your site details" is shown

  @issue=ML-1287 @issue=ML-1261
  Scenario: Answering Yes after changing the width re-queries the marine plan policies
    Given an organisation user has completed the site details for a marine licence application
    And the user opens the review site details page from the task list
    When the user changes the width of the circular site
    And the user answers "Yes" and continues from the review page
    Then the "Marine plan policy considerations" task is "Not yet started" and shows the number of policies to complete

  @issue=ML-1287 @issue=ML-1261
  Scenario: Answering Yes after adding another site re-queries the marine plan policies
    Given an organisation user has completed the site details for a marine licence application
    And the user opens the review site details page from the task list
    When the user adds another circular site
    And the user answers "Yes" and continues from the review page
    Then the "Marine plan policy considerations" task is "Not yet started" and shows the number of policies to complete

  @issue=ML-1261
  Scenario: Answering No returns to the task list without re-querying and resets the tasks
    Given an organisation user has completed the site details for a marine licence application
    And the user opens the review site details page from the task list
    When the user answers "No" and continues from the review page
    Then the "Marine plan policy considerations" task is "Cannot start yet" and is not a link
    And the "Site details" task has status "In progress"

  @issue=ML-1261
  Scenario: The finished-site-details answer is not retained when the review page is revisited
    Given an organisation user has completed the site details for a marine licence application
    And the user opens the review site details page from the task list
    And the user answers "Yes" and continues from the review page
    When the user opens the review site details page from the task list
    Then neither finished-site-details radio is selected

  @issue=ML-1261 @issue=ML-1287
  Scenario: Previously entered policy answers are retained after answering No then re-confirming
    Given an organisation user has completed a marine licence ready to review
    And the user opens the review site details page from the task list
    And the user answers "No" and continues from the review page
    And the user opens the review site details page from the task list
    When the user answers "Yes" and continues from the review page
    Then the "Marine plan policy considerations" task is "Completed" and shows all of the policies completed

  @real-defra-id @issue=ML-1367
  Scenario: Policy considerations are retained when a shapefile site change re-queries overlapping policies
    Given an organisation user has uploaded a shapefile site that returns 39 marine plan policies
    And the user answers considerations for the first 3 marine plan policies
    When the user changes the site location by uploading a different shapefile
    Then the "Marine plan policy considerations" task shows 3 of 45 completed

  @issue=ML-1377
  Scenario: Review and send is hidden while the marine plan policy considerations are incomplete
    Given an organisation user has completed the site details for a marine licence application
    When the user views the marine licence task list
    Then the Review and send your information button is not displayed

  @issue=ML-1377
  Scenario: Review and send is shown once the marine plan policy considerations are completed
    Given an organisation user has completed the site details for a marine licence application
    When the user completes the marine plan policy considerations and returns to the task list
    Then the Review and send your information button is displayed

  @real-defra-id @issue=ML-1400
  Scenario: A site outside any marine plan area falls back to the nearest area's policies
    Given an organisation user has uploaded a shapefile site outside any marine plan area
    When the user opens the Marine plan policy considerations task
    Then the policy list shows 39 policies, all for the "NE" plan area and none for "Land"
