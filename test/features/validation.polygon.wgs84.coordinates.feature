@issue=ML-19
Feature: Validation of polygon coordinates: preventing entry of invalid coordinate values for polygon sites
  As an applicant
  I want to be notified when I have provided invalid coordinate values for polygon sites
  So that I can correct errors before submitting my marine licence application

  @wip
  Scenario: Error when no WGS84 coordinates are entered for polygon
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    When the Continue button is clicked without providing any coordinates
    Then the latitude error "Enter the latitude of the start and end point" is displayed
    And the longitude error "Enter the longitude of the start and end point" is displayed

  @wip
  Scenario Outline: Error when WGS84 latitude fields are missing for different points
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And only the latitude for "<point>" is left blank
    When the Continue button is clicked
    Then the latitude error "Enter the latitude of <point_reference>" is displayed

    Examples:
      | point       | point_reference         |
      | start_point | the start and end point |
      | point_2     | point 2                 |
      | point_3     | point 3                 |

  @wip
  Scenario Outline: Error when WGS84 longitude fields are missing for different points
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And only the longitude for "<point>" is left blank
    When the Continue button is clicked
    Then the longitude error "Enter the longitude of <point_reference>" is displayed

    Examples:
      | point       | point_reference         |
      | start_point | the start and end point |
      | point_2     | point 2                 |
      | point_3     | point 3                 |

  @wip
  Scenario Outline: Error when WGS84 latitude contains non-numeric characters
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And the latitude for "<point>" is set to "<invalid_latitude>"
    When the Continue button is clicked
    Then the latitude error "Latitude of <point_reference> must be a number" is displayed

    Examples:
      | point       | point_reference         | invalid_latitude |
      | start_point | the start and end point | abc              |
      | point_2     | point 2                 | xyz              |
      | point_3     | point 3                 |           123abc |

  @wip
  Scenario Outline: Error when WGS84 longitude contains non-numeric characters
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And the longitude for "<point>" is set to "<invalid_longitude>"
    When the Continue button is clicked
    Then the longitude error "Longitude of <point_reference> must be a number" is displayed

    Examples:
      | point       | point_reference         | invalid_longitude |
      | start_point | the start and end point | def               |
      | point_2     | point 2                 | uvw               |
      | point_3     | point 3                 |            456def |

  @wip
  Scenario Outline: Error when WGS84 latitude is outside valid range
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And the latitude for "<point>" is set to "<invalid_latitude>"
    When the Continue button is clicked
    Then the latitude error "Latitude of <point_reference> must be between -90 and 90" is displayed

    Examples:
      | point       | point_reference         | invalid_latitude |
      | start_point | the start and end point |       -91.000000 |
      | point_2     | point 2                 |        91.000000 |
      | point_3     | point 3                 |       -95.123456 |

  @wip
  Scenario Outline: Error when WGS84 longitude is outside valid range
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And the longitude for "<point>" is set to "<invalid_longitude>"
    When the Continue button is clicked
    Then the longitude error "Longitude of <point_reference> must be between -180 and 180" is displayed

    Examples:
      | point       | point_reference         | invalid_longitude |
      | start_point | the start and end point |       -181.000000 |
      | point_2     | point 2                 |        181.000000 |
      | point_3     | point 3                 |       -185.123456 |

  @wip
  Scenario Outline: Error when WGS84 latitude doesn't have exactly 6 decimal places
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And the latitude for "<point>" is set to "<invalid_latitude>"
    When the Continue button is clicked
    Then the latitude error "Latitude of <point_reference> must include 6 decimal places, like 55.019889" is displayed

    Examples:
      | point       | point_reference         | invalid_latitude |
      | start_point | the start and end point |         55.01988 |
      | point_2     | point 2                 |       55.0198899 |
      | point_3     | point 3                 |         55.12345 |

  @wip
  Scenario Outline: Error when WGS84 longitude doesn't have exactly 6 decimal places
    Given the user wants to apply for an exemption for a polygonal site using WGS84 coordinates
    And the "Enter multiple sets of coordinates to mark the boundary of the site" page is displayed
    And the longitude for "<point>" is set to "<invalid_longitude>"
    When the Continue button is clicked
    Then the longitude error "Longitude of <point_reference> must include 6 decimal places, like -1.399500" is displayed

    Examples:
      | point       | point_reference         | invalid_longitude |
      | start_point | the start and end point |          -1.39950 |
      | point_2     | point 2                 |        -1.3995000 |
      | point_3     | point 3                 |          -1.12345 |
