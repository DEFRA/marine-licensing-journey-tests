@mcms-context-validation
Feature: MCMS context validation: MCMS context is validated and handled correctly when invalid
  As an applicant
  I WANT the system to handle MCMS context validation gracefully
  SO THAT I can complete my notification even when context validation fails

  @issue=ML-919 @bug
  Scenario: Valid MCMS context is displayed on check your answers page when 2 journeys are completed in the same session
    Given a second notification is started with valid MCMS context after completing a first notification
    When all tasks are completed for a circular site using WGS84 coordinates and review and send is clicked
    Then the project summary card is displayed in full on the check your answers page

  @issue=ML-1288
  Scenario: Starting a second exemption via IAT URL mid-draft creates a new notification without renaming the first
    Given a user has a draft exemption on the review site details page with sites and public register completed
    When the user opens the pre-canned IAT URL again in the same session
    And entering and saving a project with a valid name for the second exemption
    Then the dashboard shows both exemption project names
    And the first exemption retains its original project name

  @issue=ML-948 @issue=ML-882
  Scenario: Missing MCMS context prevents notification creation and redirects user to projects dashboard
    Given a notification is started with MCMS context ""
    When the project name page is visited
    Then the user is redirected to the homepage

  @issue=ML-918
  Scenario Outline: <iatQueryString> invalid MCMS context allows notification completion but only project name is displayed
    Given a notification is started with MCMS context "<iatQueryString>"
    When all tasks are completed for a circular site using WGS84 coordinates and review and send is clicked
    Then the project summary card only contains the project name

    Examples:
      | iatQueryString                                                    |
      | INVALID_IAT=123&BAD_PARAM=xyz&ACTIVITY_TYPE=CON |
