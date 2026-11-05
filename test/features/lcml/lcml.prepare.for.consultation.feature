Feature: LCML: Prepare for consultation task in D365
  As a caseworker
  I need to define who the consultees for a case are, and what I want to know from each of them
  So that the consultees can be informed correctly

  @real-defra-id @d365 @issue=ML-1611
  Scenario: Prepare for consultation unlocks after the Site check, offers only consultee organisations and can be completed
    Given an organisation user has submitted a marine licence application
    When the caseworker opens Prepare for consultation before and after completing the Site check in D365
    Then Prepare for consultation was "Cannot start yet" and read-only until the Site check was Done
    And Prepare for consultation is then "To do" with an empty Consultees table of organisation and consultation type
    And the Add consultee organisation search offers only organisations flagged as consultees
    And Add consultee asks for notes for the organisation only for a request for advice
    And adding a consultee and saving the task marks it "In Progress" unticked and "Done" ticked
