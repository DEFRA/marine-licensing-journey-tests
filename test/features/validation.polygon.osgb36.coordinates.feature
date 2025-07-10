@issue=ML-19
Feature: Validation of polygon coordinates: preventing entry of invalid coordinate values for polygon sites using OSGB36 coordinates
  As an applicant
  I want to be notified when I have provided invalid coordinate values for polygon sites
  So that I can correct errors before submitting my marine licence application

  Scenario: Error when no OSGB36 coordinates are entered for polygon
    Given the Enter multiple sets of coordinates to mark the boundary of the site for OSGB36 coordinates page is displayed
    When the Continue button is clicked without providing any coordinates
    Then the following validation errors are displayed:
      | Field                         | Error Message                              |
      | Start and end point eastings  | Enter the eastings of start and end point  |
      | Start and end point northings | Enter the northings of start and end point |
      | Point 2 eastings              | Enter the eastings of point 2              |
      | Point 2 northings             | Enter the northings of point 2             |
      | Point 3 eastings              | Enter the eastings of point 3              |
      | Point 3 northings             | Enter the northings of point 3             |

  Scenario Outline: Error when OSGB36 coordinate field contains invalid data for field type <fieldType> for point <point> with value <invalidValue>
    Given the Enter multiple sets of coordinates to mark the boundary of the site for OSGB36 coordinates page is displayed
    When the "<fieldType>" input for "<point>" is set to "<invalidValue>"
    And the Continue button is clicked
    Then the "<fieldType>" error for "<point>" is "<expectedError>"

    Examples:
      | fieldType | point               | invalidValue | expectedError                                                                        |
      | Eastings  | Start and end point | abc123       | Eastings of start and end point must be a number                                     |
      | Eastings  | Point 2             | def456       | Eastings of point 2 must be a number                                                 |
      | Eastings  | Point 3             | ghi789       | Eastings of point 3 must be a number                                                 |
      | Northings | Start and end point | xyz123       | Northings of start and end point must be a number                                    |
      | Northings | Point 2             | abc456       | Northings of point 2 must be a number                                                |
      | Northings | Point 3             | def789       | Northings of point 3 must be a number                                                |
      | Eastings  | Start and end point |      -123456 | Eastings of start and end point must be a positive 6-digit number, like 123456       |
      | Eastings  | Point 2             |      -654321 | Eastings of point 2 must be a positive 6-digit number, like 123456                   |
      | Eastings  | Point 3             |      -999999 | Eastings of point 3 must be a positive 6-digit number, like 123456                   |
      | Northings | Start and end point |      -123456 | Northings of start and end point must be a positive 6 or 7-digit number, like 123456 |
      | Northings | Point 2             |      -654321 | Northings of point 2 must be a positive 6 or 7-digit number, like 123456             |
      | Northings | Point 3             |     -1234567 | Northings of point 3 must be a positive 6 or 7-digit number, like 123456             |
      | Eastings  | Start and end point |        12345 | Eastings of start and end point must be 6 digits                                     |
      | Eastings  | Point 2             |          123 | Eastings of point 2 must be 6 digits                                                 |
      | Eastings  | Point 3             |         1234 | Eastings of point 3 must be 6 digits                                                 |
      | Northings | Start and end point |        12345 | Northings of start and end point must be 6 or 7 digits                               |
      | Northings | Point 2             |          123 | Northings of point 2 must be 6 or 7 digits                                           |
      | Northings | Point 3             |         1234 | Northings of point 3 must be 6 or 7 digits                                           |
      | Eastings  | Start and end point |      1234567 | Eastings of start and end point must be 6 digits                                     |
      | Eastings  | Point 2             |     12345678 | Eastings of point 2 must be 6 digits                                                 |
      | Eastings  | Point 3             |    123456789 | Eastings of point 3 must be 6 digits                                                 |
      | Northings | Start and end point |     12345678 | Northings of start and end point must be 6 or 7 digits                               |
      | Northings | Point 2             |    123456789 | Northings of point 2 must be 6 or 7 digits                                           |
      | Northings | Point 3             |   1234567890 | Northings of point 3 must be 6 or 7 digits                                           |
