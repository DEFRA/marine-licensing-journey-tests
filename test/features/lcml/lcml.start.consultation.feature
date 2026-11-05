@real-defra-id @d365
Feature: LCML: Prepare for and start a consultation in D365
  As a case worker
  I want to choose the consultees for a case and start the consultation once all the pre-requisites have been completed
  So that the consultees are informed correctly and the consultation starts at the appropriate time

  @issue=ML-1611 @issue=ML-1617
  Scenario: A caseworker prepares for and starts a consultation in D365
    Given an organisation user has submitted a marine licence application
    When the caseworker prepares the case for consultation and starts the consultation in D365
    Then Prepare for consultation could only be started once the Site check was Done
    And Add consultee offered only consultee organisations, and asked for notes only for a request for advice
    And Prepare for consultation was "In Progress" when saved unticked and "Done" when saved ticked
    And Start consultation could only be started once Prepare for consultation was Done
    And starting the consultation moved the case from "Submitted" to "Consultation"
