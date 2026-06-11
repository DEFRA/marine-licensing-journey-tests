@lcml
Feature: LCML: Site details journey
  As an applicant
  I want to provide site details for my marine licence application
  So that the MMO knows where the activity will take place

  Scenario: Site details journey navigates from intro through to choose file type page
    Given an organisation user is on the site details page
    When the user navigates through site details to the choose file type page
    Then the choose file type page heading and project name are displayed

  Scenario Outline: Uploading a file lands on the review site details page
    Given an organisation user is on the upload file page for "<fileType>"
    When the user uploads a valid "<fileType>" file and saves
    Then the review site details page is displayed for the uploaded site
    And all action links retain their default blue styling after being visited

    Examples:
      | fileType  |
      | KML       |
      | Shapefile |

  Scenario Outline: Adding a site name and continuing to the task list
    Given an organisation user has uploaded a valid "<fileType>" file and added a site name
    When the user continues to the task list and re-enters the site details task
    Then the review site details page is displayed with the site name for site 1

    Examples:
      | fileType  |
      | KML       |
      | Shapefile |

  @issue=ML-1308
  Scenario: Site details task is "Not yet started" and opens the start page before any sites are added
    Given an organisation user has started a marine licence application
    And the "Site details" task is displayed with status "Not yet started"
    When the "Site details" task is selected
    Then the site details start page is displayed

  @issue=ML-1308
  Scenario: Site details task is "Completed" and opens the review site details page once all details are done
    Given an organisation user has completed all site and activity details for a marine licence
    And the "Site details" task is displayed with status "Completed"
    When the "Site details" task is selected
    Then the review site details page is displayed
