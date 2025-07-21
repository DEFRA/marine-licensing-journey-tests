@issue=ML-1 @issue=ML-9 @issue=ML-10 @issue=ML-11 @issue=ML-12 @issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-35 @issue=ML-36 @issue=ML-37 @issue=ML-82
Feature: Check your answers: Once the user has completed all the tasks on the task list, they will be able to access the "Check your answers" page,
which will play back all their answers and allow them to verify that the answers are OK, ready for submission of their notification.
  
  - ML-1: Provide project name
  - ML-9: View the task list
  - ML-10: Provide activity dates
  - ML-11: Provide activity description
  - ML-12: Consent or withhold from public register
  - ML-16: Choose to manually provide coordinates
  - ML-17: Selecting circular site entry method (single coordinate point + width)
  - ML-18: Choosing the coordinate system for latitude/longitude (WGS84) or eastings/northings (OSGB36)
  - ML-35: Entering a single set of coordinates representing the centre point of the site
  - ML-36: Entering the width of the circular site in metres
  - ML-37: Reviewing the circular site details before saving
  - ML-82: The user is able to access the "Check your answers" page after completing all the tasks on the task list

  @smoke
  Scenario: After successfully completing all the tasks on the task list, with WGS84 coordinates, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list for a circular site using WGS84 coordinates
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format

  @smoke
  Scenario: After successfully completing all the tasks on the task list, with OSGB36 coordinates, the user is able to access the "Check your answers" page
    Given the user has completed all the tasks on the task list for a circular site using OSGB36 coordinates
    When the user clicks Review and send
    Then the user is able to see all their answers in a summary format
