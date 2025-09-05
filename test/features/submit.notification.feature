@issue=ML-1 @issue=ML-9 @issue=ML-10 @issue=ML-11 @issue=ML-12 @issue=ML-16 @issue=ML-17 @issue=ML-18 @issue=ML-21 @issue=ML-35 @issue=ML-36 @issue=ML-37 @issue=ML-82 @issue=ML-84
Feature: Submit exemption notification: A unique reference number is generated for the notification and the notification is submitted.
  
  - ML-1: Provide project name
  - ML-9: View the task list
  - ML-10: Provide activity dates
  - ML-11: Provide activity description
  - ML-12: Consent or withhold from public register
  - ML-16: Choose to manually provide coordinates
  - ML-17: Selecting circular site entry method (single coordinate point + width)
  - ML-18: Choosing the coordinate system for latitude/longitude (WGS84) or eastings/northings (OSGB36)
  - ML-21: Generate application reference
  - ML-35: Entering a single set of coordinates representing the centre point of the site
  - ML-36: Entering the width of the circular site in metres
  - ML-37: Reviewing the circular site details before saving
  - ML-82: The user is able to access the "Check your answers" page after completing all the tasks on the task list
  - ML-84: The user is able to submit their notification

  @smoke @run-only
  Scenario: After successfully completing all the tasks on the task list, the user is able to submit their notification
    Given the user has completed all the tasks on the task list and is on the Check your answers page
    When the user clicks Confirm and send
    Then the confirmation page is displayed with an application reference  

  @bug @wip
  Scenario: Site details completion fails after switching from file upload to manual entry
    Given the user has explored file upload options during site details entry
    When the user completes site details using manual coordinate entry instead  
    Then the site details task should be marked as completed
