@issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-19 @issue=ML-38 @issue=ML-121 @issue=ML-361 @issue=ML-608
Feature: Site details: The user marks the boundary of a polygon site manually using WGS84 or OSGB36 coordinates
  These scenarios test the user journey for manually entering polygon site coordinates, covering:

  - ML-16: Choosing to manually enter the site details
  - ML-17: Selecting polygon site entry method (multiple coordinate points for boundary)
  - ML-18: Choosing the coordinate system for latitude/longitude (WGS84) or eastings/northings (OSGB36)
  - ML-19: Entering multiple sets of coordinates to mark the boundary of a triangular site
  - ML-38: Adding another set of coordinates to a polygon site (extending beyond 3 points)
  - ML-121: Reviewing polygon site details with enhanced coordinate value validation

  Scenario Outline: Successfully entering triangular site coordinates using WGS84 coordinates with <lat1>, <lng1>, <lat2>, <lng2>, <lat3>, <lng3>
    Given an exemption for a triangular site using WGS84 coordinates with point 1 "<lat1>", "<lng1>", point 2 "<lat2>", "<lng2>" and point 3 "<lat3>", "<lng3>"
    And the site details task is reached
    When the site details task is completed and saved
    Then the "Site details" task status is "Completed"

    Examples: WGS84 coordinate testing: boundary values and realistic marine scenarios
      | lat1      | lng1      | lat2      | lng2      | lat3      | lng3      |
      | 50.000000 | -1.000000 | 50.001000 | -0.999000 | 50.000500 | -0.999500 |

  Scenario Outline: Successfully entering triangular site coordinates using OSGB36 coordinates with <east1>, <north1>, <east2>, <north2>, <east3>, <north3>
    Given an exemption for a triangular site using OSGB36 coordinates with point 1 "<east1>", "<north1>", point 2 "<east2>", "<north2>" and point 3 "<east3>", "<north3>"
    And the site details task is reached
    When the site details task is completed and saved
    Then the "Site details" task status is "Completed"

    Examples: OSGB36 coordinate testing: UK Grid coverage and decimal precision
      | east1  | north1 | east2  | north2 | east3  | north3 |
      | 432675 | 181310 | 433000 | 181500 | 432800 | 181700 |

  Scenario Outline: Successfully adding a fourth point to create a quadrilateral site using WGS84 coordinates
    Given an exemption for a quadrilateral site using WGS84 coordinates with point 1 "<lat1>", "<lng1>", point 2 "<lat2>", "<lng2>", point 3 "<lat3>", "<lng3>" and point 4 "<lat4>", "<lng4>"
    And the site details task is reached
    When the site details task is completed and saved
    Then the "Site details" task status is "Completed"

    Examples: WGS84 quadrilateral testing: rectangular and complex boundary shapes
      | lat1      | lng1      | lat2      | lng2      | lat3      | lng3      | lat4      | lng4      |
      | 50.000000 | -1.000000 | 50.001000 | -1.000000 | 50.001000 | -0.999000 | 50.000000 | -0.999000 |

  Scenario Outline: Successfully adding a fourth point to create a quadrilateral site using OSGB36 coordinates
    Given an exemption for a quadrilateral site using OSGB36 coordinates with point 1 "<east1>", "<north1>", point 2 "<east2>", "<north2>", point 3 "<east3>", "<north3>" and point 4 "<east4>", "<north4>"
    And the site details task is reached
    When the site details task is completed and saved
    Then the "Site details" task status is "Completed"

    Examples: OSGB36 quadrilateral testing: rectangular and complex boundary shapes
      | east1  | north1 | east2  | north2 | east3  | north3 | east4  | north4 |
      | 432675 | 181310 | 433000 | 181310 | 433000 | 181500 | 432675 | 181500 |

  Scenario Outline: Successfully adding multiple additional points to create a complex polygon site using WGS84 coordinates
    Given an exemption for a pentagon site using WGS84 coordinates with point 1 "<lat1>", "<lng1>", point 2 "<lat2>", "<lng2>", point 3 "<lat3>", "<lng3>", point 4 "<lat4>", "<lng4>" and point 5 "<lat5>", "<lng5>"
    And the site details task is reached
    When the site details task is completed and saved
    Then the "Site details" task status is "Completed"

    Examples: WGS84 pentagon testing: complex boundary shapes with multiple additional points
      | lat1      | lng1      | lat2      | lng2      | lat3      | lng3      | lat4      | lng4      | lat5      | lng5      |
      | 50.000000 | -1.000000 | 50.001000 | -1.000000 | 50.001500 | -0.999500 | 50.001000 | -0.999000 | 50.000000 | -0.999000 |

  Scenario Outline: Successfully adding multiple additional points to create a complex polygon site using OSGB36 coordinates
    Given an exemption for a pentagon site using OSGB36 coordinates with point 1 "<east1>", "<north1>", point 2 "<east2>", "<north2>", point 3 "<east3>", "<north3>", point 4 "<east4>", "<north4>" and point 5 "<east5>", "<north5>"
    And the site details task is reached
    When the site details task is completed and saved
    Then the "Site details" task status is "Completed"

    Examples: OSGB36 pentagon testing: complex boundary shapes with multiple additional points
      | east1  | north1 | east2  | north2 | east3  | north3 | east4  | north4 | east5  | north5 |
      | 432675 | 181310 | 433000 | 181310 | 433200 | 181400 | 433000 | 181500 | 432675 | 181500 |

  @wgs84 @complex-polygon
  Scenario: Successfully entering a complex 20-point polygon site using WGS84 coordinates
    Given an exemption for a 20 point polygon site using WGS84 coordinates
    And the site details task is reached
    When the site details task is completed and saved
    Then the "Site details" task status is "Completed"

  @stress-test @local-only @wip
  Scenario Outline: Successfully adding <coordinateCount> random points to test add another point functionality and system capacity
    Given an exemption for a <coordinateCount> point random polygon site using WGS84 coordinates
    And the site details task is reached
    When the <coordinateCount> point random polygon coordinates are entered using add another point
    Then the polygon coordinate entry page is displayed

    Examples:
      | coordinateCount |
      |              10 |
      # |             500 |
      # |            5000 |
