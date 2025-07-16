@real-defra-id
Feature: Submits a full exemption notification in environments integrated with real Defra ID

  Scenario: After successfully completing all the tasks on the task list, the user is able to submit their notification
    Given the user has completed all the tasks on the task list and is on the Check your answers page
    When the user clicks Confirm and send
    Then the confirmation page is displayed with an application reference
