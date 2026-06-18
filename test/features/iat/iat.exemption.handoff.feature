@iat
Feature: IAT: passing context into the exemption journey
  As an applicant who reaches an exemption terminal outcome in the IAT
  I want the Continue button to carry my IAT context into the exemption journey
  So that my exemption notification is pre-populated from my IAT answers

  @issue=ML-1166
  Scenario Outline: Continue from a <activityType> exemption outcome carries the IAT context in the query string
    Given the user walks the IAT to an exemption handoff outcome for "<activityType>"
    When the user follows the exemption Continue button
    Then the exemption journey URL contains the IAT context parameters
      | parameter      | value          |
      | ACTIVITY_TYPE  | <activityType> |
      | <subtypeParam> | <subtype>      |
      | ADV_TYPE       | EXE            |
      | ARTICLE        | <article>      |

    Examples:
      | activityType | subtypeParam                      | subtype                           | article |
      | CON          | EXE_ACTIVITY_SUBTYPE_CONSTRUCTION | new                               | 20      |
      | DEPOSIT      | EXE_ACTIVITY_SUBTYPE_DEPOSIT      | emergency                         | 20      |
      | REMOVAL      | EXE_ACTIVITY_SUBTYPE_REMOVAL      | markersMooringsAndAidToNavigation | 26A     |
      | DREDGE       | EXE_ACTIVITY_SUBTYPE_DREDGING     | shellfish                         | 13      |

  @issue=ML-1166 @issue=ML-1299
  Scenario Outline: The <activityType> check your answers page links to the IAT answers
    Given the user walks the IAT to an exemption handoff outcome for "<activityType>"
    And the user follows the exemption Continue button
    And the user signs in and completes the exemption journey
    When the user opens the View answers link on the check your answers page
    Then the answers page shows the "<activity>" activity

    Examples:
      | activityType | activity                         |
      | CON          | Construction                     |
      | DEPOSIT      | Deposit of a substance or object |
      | REMOVAL      | Removal of a substance or object |
      | DREDGE       | Dredging                         |

  @issue=ML-1299
  Scenario: View details opens the IAT answers page with print and save as PDF options
    Given the user walks the IAT to an exemption handoff outcome for "DREDGE"
    And the user follows the exemption Continue button
    And the user signs in and submits the exemption
    And the user clicks view details for the submitted notification on the dashboard
    When the user opens the View answers link from the View details page
    Then the IAT answers page provides print and save as PDF options

  @fivium @real-defra-id @issue=ML-1299
  Scenario: A Fivium-sourced exemption offers a downloadable PDF of the answers
    Given the user walks the Fivium IAT to an exemption handoff outcome
    And the user follows the exemption Continue button
    And the user signs in and completes the exemption journey
    And the check your answers page offers a downloadable PDF copy
    And the user submits the exemption
    When the user clicks view details for the submitted notification on the dashboard
    Then the answers link offers a downloadable PDF copy
