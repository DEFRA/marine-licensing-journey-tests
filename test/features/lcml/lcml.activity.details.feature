@lcml
Feature: LCML: Activity details on review site details page
  As an applicant
  I want to provide activity details for each site
  So that the MMO knows what activities will take place at each site

  Scenario: Activity details card is displayed for an uploaded site
    Given an organisation user is on the upload file page for "KML"
    When the user uploads a valid "KML" file and saves
    Then an activity details card titled "Site 1 - Activity 1" is displayed with all fields as Incomplete
    And an "Add another activity for site 1" button is displayed

  Scenario: Adding another activity creates a new activity card
    Given an organisation user has uploaded a valid "KML" file and is on the review site details page
    When the user clicks the "Add another activity for site 1" button
    Then an activity details card titled "Site 1 - Activity 2" is displayed with all fields as Incomplete
    And an "Add another activity for site 1" button is displayed
