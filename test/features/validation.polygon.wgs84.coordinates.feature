@issue=ML-19 @issue=ML-38
Feature: Validation of polygon coordinates: preventing entry of invalid coordinate values for polygon sites using WGS84 coordinates
  As an applicant
  I want to be notified when I have provided invalid coordinate values for polygon sites
  So that I can correct errors before submitting my marine licence application

  Scenario: Error when no WGS84 coordinates are entered for polygon
    Given the Enter multiple sets of coordinates to mark the boundary of the site for WGS84 coordinates page is displayed
    When the Continue button is clicked without providing any coordinates
    Then the following validation errors are displayed:
      | Field                         | Error Message                              |
      | Start and end point latitude  | Enter the latitude of start and end point  |
      | Start and end point longitude | Enter the longitude of start and end point |
      | Point 2 latitude              | Enter the latitude of point 2              |
      | Point 2 longitude             | Enter the longitude of point 2             |
      | Point 3 latitude              | Enter the latitude of point 3              |
      | Point 3 longitude             | Enter the longitude of point 3             |

  Scenario: Adding coordinate point after validation failure shows correct validation state
    Given errors have been generated for the first 3 coordinate points
    When the Add another point button is clicked
    Then the point 4 latitude error should not exist
    And the point 4 longitude error should not exist

  Scenario: Removing coordinate point with validation errors clears errors correctly
    Given errors have been generated for the first 4 coordinate points
    When the Remove button for Point 4 is clicked
    Then the point 4 latitude error should not exist
    And the point 4 longitude error should not exist
