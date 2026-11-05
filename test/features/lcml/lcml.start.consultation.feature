@real-defra-id @d365
Feature: LCML: Prepare for and start a consultation in D365, and the consultee responds
  As a case worker
  I want to choose the consultees for a case and start the consultation once all the pre-requisites have been completed
  So that the consultees are informed correctly and can respond at the appropriate time

  @issue=ML-1611 @issue=ML-1617 @issue=ML-1599 @issue=ML-1600
  Scenario: A caseworker prepares for and starts a consultation in D365, and the consultee responds to the request for advice
    Given an organisation user has submitted a marine licence application
    When the caseworker starts a consultation in D365 and the consultee responds to the request for advice
    Then Prepare for consultation could only be started once the Site check was Done
    And Add consultee offered only consultee organisations, and asked for notes only for a request for advice
    And Prepare for consultation was "In Progress" when saved unticked and "Done" when saved ticked
    And Start consultation could only be started once Prepare for consultation was Done, and starting it moved the case from "Submitted" to "Consultation"
    And the consultee's Consultations dashboard showed the request for advice as "Response needed", and as "Responded" with their response once they had responded
