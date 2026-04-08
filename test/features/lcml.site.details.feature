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

    Examples:
      | fileType  |
      | KML       |
      | Shapefile |

  Scenario: Continue from review saves site details as In Progress and re-enters via task list
    Given an organisation user has uploaded a valid "KML" file and is on the review site details page
    When the user continues to the task list and re-enters the site details task
    Then the review site details page is displayed for the uploaded site
