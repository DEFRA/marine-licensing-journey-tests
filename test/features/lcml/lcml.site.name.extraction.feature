@lcml @issue=ML-710
Feature: LCML: Extract site names from uploaded files
  As an applicant uploading the sites for my application
  I want site names read from my uploaded file
  So that I do not have to name every site by hand

  Scenario Outline: Site names are extracted from an uploaded file
    Given an organisation user is on the "<fileType>" file upload page
    When the user uploads a file "<variant>"
    Then site 1 shows the site name "<siteName>" with the "<link>" link on the review site details page

    Examples:
      | fileType  | variant             | siteName          | link   |
      | KML       | with a site name    | Bridge Pontoon    | Change |
      | KML       | without a site name |                   | Add    |
      | Shapefile | with a site name    | Test Polygon Site | Change |
      | Shapefile | without a site name |                   | Add    |
