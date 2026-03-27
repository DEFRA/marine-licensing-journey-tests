@lcml
Feature: LCML: Site details journey
  As an applicant
  I want to provide site details for my marine licence application
  So that the MMO knows where the activity will take place

  Scenario: Site details page displays correctly and navigates to provide coordinates page
    Given an organisation user is on the site details page
    When the user views the site details page
    Then the site details page heading and project name are displayed
    And the Continue, Cancel and Back links are displayed on the site details page

  Scenario: Provide coordinates page validates selection and displays error
    Given an organisation user is on the provide coordinates page
    When the user clicks Continue without selecting an option
    Then the error "Select how you want to provide the site location" is displayed

  Scenario: User selects file upload and navigates to choose file type page
    Given an organisation user is on the provide coordinates page
    When the user selects "Upload a file with the coordinates of the site"
    And the user clicks Continue
    Then the choose file type page heading and project name are displayed
    And the Continue, Cancel and Back links are displayed on the choose file type page
    And the "Help with file types" details section is displayed

  Scenario: Choose file type page validates selection and displays error
    Given an organisation user is on the choose file type page
    When the user clicks Continue without selecting an option
    Then the error "Select which type of file you want to upload" is displayed
