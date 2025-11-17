@mcms-context-validation
Feature: MCMS context validation: MCMS context is validated and handled correctly when invalid
  As an applicant
  I WANT the system to handle MCMS context validation gracefully
  SO THAT I can complete my notification even when context validation fails

  @issue=ML-919 @circle @wgs84 @bug
  Scenario: Valid MCMS context is displayed on check your answers page when 2 journeys are completed in the same session
    Given a second notification is started with valid MCMS context after completing a first notification
    When all tasks are completed for a circular site using WGS84 coordinates and review and send is clicked
    Then the check your answers page displays the MCMS context

  @issue=ML-918 @circle @wgs84
  Scenario Outline: <iatQueryString> MCMS context allows notification completion but context is not displayed
    Given a notification is started with MCMS context "<iatQueryString>"
    When all tasks are completed for a circular site using WGS84 coordinates and review and send is clicked
    Then the check your answers page is displayed without the MCMS context card

    Examples:
      | iatQueryString                                                    |
      |                                                                   |
      | INVALID_IAT=123&BAD_PARAM=xyz&EXE_ACTIVITY_SUBTYPE_DEPOSIT=ignore |
