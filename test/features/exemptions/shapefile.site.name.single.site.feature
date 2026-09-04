@bug @shapefile
Feature: Single-site shapefile upload with an extracted site name
  As an applicant uploading a single-site shapefile that already contains a site name
  I want the extracted site name to be accepted when site details are saved
  So that I can complete my exemption notification without a backend validation error

  # Bug: for single-site exemptions (multipleSitesEnabled=false) the backend Joi schema
  # marks siteName as forbidden, but file upload extract-site-name now puts the name
  # (e.g. 'Morgan' from MLA_2025_00032/...ArrayMarineLicenceArea.zip, or
  # 'Test Polygon Site' from valid-shapefile-with-site-name.zip) into the save payload.
  # Suggested fix: change forbidden to strip (or allow optional siteName for file uploads).

  Scenario: Completing site details succeeds when a single-site shapefile includes a site name
    Given an exemption notification with a Shapefile that includes a site name
    When completing the site details task
    Then the file is successfully processed
    And the site details review page shows the site details
    And the "Site details" task status is "Completed"
