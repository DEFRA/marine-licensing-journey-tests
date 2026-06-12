@lcml @issue=ML-1237
Feature: LCML: Change site location
  As an applicant
  I want to replace the location of a site I provided by file upload
  So that I can correct the site without losing its name or activity details

  Scenario: Selecting Change site location opens the confirmation page
    Given an organisation user has uploaded a valid "KML" file and is on the review site details page
    When the user selects "Change site location" for site 1
    Then the change site location confirmation page is displayed
    And the confirmation page shows the site reference "Site 1"

  Scenario: The confirmation page shows the site name when one has been provided
    Given an organisation user has uploaded a valid "KML" file and added a site name
    When the user selects "Change site location" for site 1
    Then the change site location confirmation page is displayed
    And the confirmation page shows the stored site name prefixed with "Site 1"

  Scenario: Uploading a file containing more than one site is rejected on the single-site upload page
    Given an organisation user is on the change site location upload page for site 1 with file type "KML"
    When the user uploads a file containing more than one site
    Then a single site upload error is displayed with message "Upload a file that contains a single site"
    And the upload file page asks for a single site file only
    And the upload file page states point and line sites are not allowed

  @issue=ML-1236
  Scenario: Replacing a site location retains the site name and activity details
    Given an organisation user has uploaded a valid "KML" file, named site 1 and added activity details
    When the user changes the location of site 1 by uploading a single "Shapefile" file
    Then the review site details page is displayed scrolled to site 1
    And the site 1 name is retained
    And the site 1 activity details are retained
    And the site 1 location reflects the new uploaded file
