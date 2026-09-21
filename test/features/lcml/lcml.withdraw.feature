@lcml
Feature: LCML: Withdrawing a submitted marine licence application
  As an applicant
  I want to withdraw a marine licence application I have submitted
  So that the MMO stops progressing work I no longer need

  @issue=ML-1074
  Scenario: Confirming the withdrawal returns to the dashboard with a Withdrawn status
    Given an organisation user has submitted a marine licence application
    When the user confirms the withdrawal of the submitted application
    Then the user is returned to the projects dashboard
    And the application status is "Withdrawn" on the dashboard
    And the withdrawn application offers View details but not Withdraw

  @issue=ML-1074
  Scenario: The application details card shows the withdrawal status and the date of withdrawal
    Given an organisation user has withdrawn a submitted marine licence application
    When the user opens View details for the submitted marine licence
    Then the application details card shows the Withdrawn status and the date withdrawn

  @real-defra-id @d365 @issue=ML-1495
  Scenario: Withdrawing the application tells Dynamics and closes the case
    Given an organisation user has submitted a marine licence application with a site in a marine plan area
    And the case tasks have been created in D365
    When the user confirms the withdrawal of the submitted application
    Then the case status in D365 becomes "Withdrawn"
    And the case is read-only in D365 with its tasks cancelled
