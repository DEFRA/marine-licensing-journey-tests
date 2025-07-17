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

  Scenario Outline: Error when WGS84 coordinate field contains invalid data for field type <fieldType> for point <point> with value <invalidValue>
    Given the Enter multiple sets of coordinates to mark the boundary of the site for WGS84 coordinates page is displayed
    When the "<fieldType>" input for "<point>" is set to "<invalidValue>"
    And the Continue button is clicked
    Then the "<fieldType>" error for "<point>" is "<expectedError>"

    Examples:
      | fieldType | point               | invalidValue | expectedError                                                                  |
      | Latitude  | Start and end point | abc          | Latitude of start and end point must be a number                               |
      | Latitude  | Point 2             | xyz          | Latitude of point 2 must be a number                                           |
      | Latitude  | Point 3             |       123abc | Latitude of point 3 must be a number                                           |
      | Longitude | Start and end point | def          | Longitude of start and end point must be a number                              |
      | Longitude | Point 2             | uvw          | Longitude of point 2 must be a number                                          |
      | Longitude | Point 3             |       456def | Longitude of point 3 must be a number                                          |
      | Latitude  | Start and end point |   -91.000000 | Latitude of start and end point must be between -90 and 90                     |
      | Latitude  | Point 2             |    91.000000 | Latitude of point 2 must be between -90 and 90                                 |
      | Latitude  | Point 3             |   -95.123456 | Latitude of point 3 must be between -90 and 90                                 |
      | Longitude | Start and end point |  -181.000000 | Longitude of start and end point must be between -180 and 180                  |
      | Longitude | Point 2             |   181.000000 | Longitude of point 2 must be between -180 and 180                              |
      | Longitude | Point 3             |  -185.123456 | Longitude of point 3 must be between -180 and 180                              |
      | Latitude  | Start and end point |     55.01988 | Latitude of start and end point must include 6 decimal places, like 55.019889  |
      | Latitude  | Point 2             |   55.0198899 | Latitude of point 2 must include 6 decimal places, like 55.019889              |
      | Latitude  | Point 3             |     55.12345 | Latitude of point 3 must include 6 decimal places, like 55.019889              |
      | Longitude | Start and end point |     -1.39950 | Longitude of start and end point must include 6 decimal places, like -1.399500 |
      | Longitude | Point 2             |   -1.3995000 | Longitude of point 2 must include 6 decimal places, like -1.399500             |
      | Longitude | Point 3             |     -1.12345 | Longitude of point 3 must include 6 decimal places, like -1.399500             |

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
