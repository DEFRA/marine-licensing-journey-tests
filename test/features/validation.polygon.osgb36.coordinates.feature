@issue=ML-19 @issue=ML-38
Feature: Validation of polygon coordinates: preventing entry of invalid coordinate values for polygon sites using OSGB36 coordinates
  As an applicant
  I want to be notified when I have provided invalid coordinate values for polygon sites
  So that I can correct errors before submitting my marine licence application

  Scenario: Error when no OSGB36 coordinates are entered for polygon
    Given the Enter multiple sets of coordinates to mark the boundary of the site for OSGB36 coordinates page is displayed
    When the Save and continue button is clicked without providing any coordinates
    Then the following validation errors are displayed:
      | Field                         | Error Message                              |
      | Start and end point eastings  | Enter the eastings of start and end point  |
      | Start and end point northings | Enter the northings of start and end point |
      | Point 2 eastings              | Enter the eastings of point 2              |
      | Point 2 northings             | Enter the northings of point 2             |
      | Point 3 eastings              | Enter the eastings of point 3              |
      | Point 3 northings             | Enter the northings of point 3             |

  Scenario: Adding coordinate point after validation failure shows correct validation state
    Given errors have been generated for the first 3 coordinate points
    When the Add another point button is clicked
    Then the point 4 eastings error should not exist
    And the point 4 northings error should not exist

  Scenario: Removing coordinate point with validation errors clears errors correctly
    Given errors have been generated for the first 4 coordinate points
    When the Remove button for Point 4 is clicked
    Then the point 4 eastings error should not exist
    And the point 4 northings error should not exist
