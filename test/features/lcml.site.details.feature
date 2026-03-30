@lcml
Feature: LCML: Site details journey
  As an applicant
  I want to provide site details for my marine licence application
  So that the MMO knows where the activity will take place

  Scenario: Site details journey navigates from intro through to choose file type page
    Given an organisation user is on the site details page
    When the user navigates through site details to the choose file type page
    Then the choose file type page heading and project name are displayed
