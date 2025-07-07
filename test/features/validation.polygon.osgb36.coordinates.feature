Feature: Validation of polygon coordinates: preventing entry of invalid coordinate values for polygon sites
  As an applicant
  I want to be notified when I have provided invalid coordinate values for polygon sites
  So that I can correct errors before submitting my marine licence application

  @run-only
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

  @wip
  Scenario Outline: Error when OSGB36 eastings fields are missing for different points
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    When only the eastings for "<point>" is left blank
    And the Continue button is clicked
    Then the eastings error "Enter the eastings of <point_reference>" is displayed

    Examples:
      | point       | point_reference         |
      | start_point | the start and end point |
      | point_2     | point 2                 |
      | point_3     | point 3                 |

  @wip
  Scenario Outline: Error when OSGB36 northings fields are missing for different points
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" for OSGB36 coordinates page is displayed
    When only the northings for "<point>" is left blank
    And the Continue button is clicked
    Then the northings error "Enter the northings of <point_reference>" is displayed

    Examples:
      | point       | point_reference         |
      | start_point | the start and end point |
      | point_2     | point 2                 |
      | point_3     | point 3                 |

  @wip
  Scenario Outline: Error when OSGB36 eastings contains non-numeric characters
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" for OSGB36 coordinates page is displayed
    When the eastings for "<point>" is set to "<invalid_eastings>"
    And the Continue button is clicked
    Then the eastings error "Eastings of <point_reference> must be a number" is displayed

    Examples:
      | point       | point_reference         | invalid_eastings |
      | start_point | the start and end point | abc123           |
      | point_2     | point 2                 |           123xyz |
      | point_3     | point 3                 | def456           |

  @wip
  Scenario Outline: Error when OSGB36 northings contains non-numeric characters
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" for OSGB36 coordinates page is displayed
    When the northings for "<point>" is set to "<invalid_northings>"
    And the Continue button is clicked
    Then the northings error "Northings of <point_reference> must be a number" is displayed

    Examples:
      | point       | point_reference         | invalid_northings |
      | start_point | the start and end point | abc789            |
      | point_2     | point 2                 |            789xyz |
      | point_3     | point 3                 | ghi012            |

  @wip
  Scenario Outline: Error when OSGB36 eastings is negative
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" for OSGB36 coordinates page is displayed
    When the eastings for "<point>" is set to "<negative_eastings>"
    And the Continue button is clicked
    Then the eastings error "Eastings of <point_reference> must be a positive 6-digit number, like 123456" is displayed

    Examples:
      | point       | point_reference         | negative_eastings |
      | start_point | the start and end point |           -123456 |
      | point_2     | point 2                 |           -654321 |
      | point_3     | point 3                 |           -999999 |

  @wip
  Scenario Outline: Error when OSGB36 northings is negative
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" for OSGB36 coordinates page is displayed
    When the northings for "<point>" is set to "<negative_northings>"
    And the Continue button is clicked
    Then the northings error "Northings of <point_reference> must be a positive 6 or 7-digit number, like 123456" is displayed

    Examples:
      | point       | point_reference         | negative_northings |
      | start_point | the start and end point |            -123456 |
      | point_2     | point 2                 |            -654321 |
      | point_3     | point 3                 |           -1234567 |

  @wip
  Scenario Outline: Error when OSGB36 eastings doesn't have exactly 6 digits
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" for OSGB36 coordinates page is displayed
    When the eastings for "<point>" is set to "<invalid_eastings>"
    And the Continue button is clicked
    Then the eastings error "Eastings of <point_reference> must be 6 digits" is displayed

    Examples:
      | point       | point_reference         | invalid_eastings |
      | start_point | the start and end point |            12345 |
      | point_2     | point 2                 |          1234567 |
      | point_3     | point 3                 |              123 |

  @wip
  Scenario Outline: Error when OSGB36 northings doesn't have 6 or 7 digits
    Given the "Enter multiple sets of coordinates to mark the boundary of the site" for OSGB36 coordinates page is displayed
    When the northings for "<point>" is set to "<invalid_northings>"
    And the Continue button is clicked
    Then the northings error "Northings of <point_reference> must be 6 or 7 digits" is displayed

    Examples:
      | point       | point_reference         | invalid_northings |
      | start_point | the start and end point |             12345 |
      | point_2     | point 2                 |          12345678 |
      | point_3     | point 3                 |               123 |
