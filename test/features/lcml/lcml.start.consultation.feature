@real-defra-id @d365
Feature: LCML: Start consultation task in D365
  As a case worker
  I want to be able to start the consultation once all the pre-requisites have been completed
  So that the consultation can start at the appropriate time

  @issue=ML-1617
  Scenario: Start consultation can only be started once its prerequisite tasks are Done, and starting it moves the case to Consultation
    Given an organisation user has submitted a marine licence application
    And the caseworker completes the Site check in D365
    When the caseworker completes every other task the Start consultation task depends on, with a consultee to ask for advice
    Then the Start consultation task is last in the task list and stayed "Cannot start yet" and read-only until Prepare for consultation was Done
    And the Start consultation task is "To do" with the explanation of what starting consultation does and an unticked confirmation
    And saving the Start consultation task without the confirmation leaves it "To do" and the case "Submitted"
    And saving the Start consultation task with the confirmation marks it "Done" and moves the case to "Consultation"
