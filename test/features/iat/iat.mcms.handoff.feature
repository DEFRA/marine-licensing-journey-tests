@iat
Feature: IAT: passing context into the MCMS handoff
  As an applicant who reaches a marine licence terminal outcome in the IAT
  I want the handoff button to carry my IAT context into the MCMS service
  So that my MCMS application is pre-populated from my IAT answers

  @issue=ML-1167
  Scenario: The handoff button passes the IAT context to the configured MCMS service
    Given the user walks the IAT to the outcome "/fast-track-mla"
    When the user follows the MCMS handoff button
    Then the MCMS handoff URL points at the configured MCMS service
    And the MCMS handoff URL carries the journey id and the view answers link
    And the MCMS handoff URL includes mapped answers for
      | mapping                  |
      | ACTIVITY_TYPE            |
      | ACTIVITY_SUBTYPE_DEPOSIT |
    And the MCMS handoff URL contains the outcome parameters
      | parameter  | value |
      | FAST_TRACK | true  |
    And the MCMS handoff URL responds with status 200
