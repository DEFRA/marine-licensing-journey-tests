@iat @iatoutcome @iatterminal @issue=ML-1185
Feature: IAT: Licence not required outcome pages
  As an applicant using the IAT
  I want a clear "licence not required" outcome page
  So that I know no marine licence is needed and can keep a PDF record of my answers

  Scenario Outline: Anonymous user can view the "<route>" licence-not-required outcome page
    Given an anonymous user navigates directly to the IAT outcome "<route>"
    When the user views the IAT outcome page
    Then the IAT licence-not-required outcome page "<route>" is displayed with heading "<heading>"
    And the page has a body content block
    And the page has a placeholder "Download a PDF record of my answers" button
    And the page has a Back link

    Examples:
      | route                                          | heading                     |
      | /exemption/licence-not-required                | Marine licence not required |
      | /exemption/licence-not-required/sea            | Marine licence not required |
      | /exemption/licence-not-required/Activity-elsewhere | Marine licence not required |

  Scenario: Licence-not-required outcome is reached by selecting "Somewhere else" on the first question
    Given the user starts the IAT
    When the user follows this IAT answer path
      | answer         |
      | Somewhere else |
    Then the IAT licence-not-required outcome page "/exemption/licence-not-required/sea" is displayed with heading "Marine licence not required"
    And the page has a body content block
    And the page has a placeholder "Download a PDF record of my answers" button
    And the Back link points to "/journey/self-service/sea"
