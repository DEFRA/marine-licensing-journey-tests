@real-defra-id
Feature: Submits a full exemption notification in environments integrated with real Defra ID and checks other Defra ID related functionality

  Scenario: After successfully completing all the tasks on the task list, the user is able to submit their notification
    Given the user has completed all the tasks on the task list and is on the Check your answers page
    When the user clicks Confirm and send
    Then the confirmation page is displayed with an application reference and survey link

  @issue=ML-277
  Scenario: User can access their Defra account from the service header
    Given the user is on any page within the service apart from the project name page
    When the user clicks the Defra account link in the header
    Then the user is taken to the Defra account management page

  @issue=ML-277
  Scenario: User can return to marine licensing service from Defra account page
    Given the user is on the Defra account management page
    When the user clicks "Get Permission For Marine Work" in the "Your services" section
    Then the user is returned to the marine licensing service dashboard
