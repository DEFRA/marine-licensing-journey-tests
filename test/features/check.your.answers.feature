@issue=ML-82 @issue=ML-139 @issue=ML-140 @issue=ML-142 @issue=ML-810
Feature: Check your answers: Once the user has completed all the tasks on the task list, they will be able to access the "Check your answers" page,
which will play back all their answers and allow them to verify that the answers are OK, ready for submission of their notification.

  - ML-82: The user is able to access the "Check your answers" page after completing all the tasks on the task list
  - ML-139: Check your answers page displays the correct site details for a polygon site
  - ML-140: Check your answers page displays uploaded file details
  - ML-142: Check your answers page displays project summary with IAT context
  - ML-810: Check your answers page displays multiple sites details

  @smoke @circle @wgs84
  Scenario: After successfully completing all the tasks on the task list, with a circle using WGS84 coordinates, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list for a circular site using WGS84 coordinates
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @smoke @boundary @wgs84
  Scenario: After successfully completing all the tasks on the task list, with a boundary using WGS84 coordinates, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list for a boundary using WGS84 coordinates
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @smoke @circle @osgb36
  Scenario: After successfully completing all the tasks on the task list, with a circle using OSGB36 coordinates, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list for a circular site using OSGB36 coordinates
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @smoke @boundary @osgb36
  Scenario: After successfully completing all the tasks on the task list, with a boundary using OSGB36 coordinates, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list for a boundary using OSGB36 coordinates
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @kml
  Scenario: After successfully completing all the tasks on the task list, with KML file upload, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list using a KML file upload
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @shapefile
  Scenario: After successfully completing all the tasks on the task list, with Shapefile upload, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list using a Shapefile upload
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @kml @multi-site
  Scenario: After successfully uploading a KML file with multiple sites, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list using a multi site KML upload
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @shapefile @multi-site
  Scenario: After successfully uploading a Shapefile file with multiple sites, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list using a multi site Shapefile upload
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @manual @multi-site
  Scenario: After successfully manually entering multiple sites, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list using a multi site manual entry
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format
