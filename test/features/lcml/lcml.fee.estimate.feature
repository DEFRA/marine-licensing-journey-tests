@lcml
Feature: LCML: Fee estimate
  As an applicant for a marine licence
  I want to view and respond to the fee estimate
  So that I accept the fee before submitting, or record that I do not accept it

  @issue=ML-1352
  Scenario: The Fee estimate task is shown on the task list
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Fee estimate and invoicing details" section heading is displayed on the task list
    And the "Fee estimate" task is displayed with status "Not yet started"

  @issue=ML-1352
  Scenario: Validation errors are shown when the fee estimate is saved with nothing selected
    Given an organisation user is on the Fee estimate page
    When the user saves the fee estimate without selecting anything
    Then the fee estimate error "You need to agree to the terms and conditions" is displayed
    And the fee estimate error "Select if you accept the fee estimate" is displayed

  @issue=ML-1352
  Scenario: Accepting the fee estimate completes the task
    Given an organisation user is on the Fee estimate page
    When the user agrees to the terms and accepts the fee estimate
    Then the user is returned to the marine licence task list
    And the "Fee estimate" task is displayed with status "Completed"

  @issue=ML-1352
  Scenario: Not accepting the fee estimate goes to the confirmation page
    Given an organisation user is on the Fee estimate page
    When the user agrees to the terms and does not accept the fee estimate
    Then the confirm fee estimate rejection page is displayed

  @issue=ML-1352
  Scenario: Finishing a rejected fee estimate returns to the dashboard and marks the task Not accepted
    Given an organisation user has rejected the fee estimate on the confirmation page
    When the user selects Finish on the confirm fee estimate rejection page
    Then the user is returned to the projects dashboard
    And the Fee estimate task is Not accepted back on the task list

  @issue=ML-1352
  Scenario: A not accepted fee estimate can be changed to accepted and the application submitted
    Given an organisation user has completed all tasks but not accepted the fee estimate
    When the user reopens the fee estimate and accepts it
    And the user submits the marine licence application from the task list
    Then the confirmation page is displayed with a marine licence reference
