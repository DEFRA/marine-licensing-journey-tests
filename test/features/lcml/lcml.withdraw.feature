@lcml
Feature: LCML: Withdrawing a submitted marine licence application
  As an applicant
  I want to withdraw a marine licence application I have submitted
  So that the MMO stops progressing work I no longer need

  @issue=ML-1074
  Scenario: A submitted application offers the Withdraw option on the dashboard
    Given an organisation user has submitted a marine licence application
    When the user views the projects dashboard
    Then the submitted application offers both View details and Withdraw

  @issue=ML-1074
  Scenario: The withdraw confirmation page names the project and links to the terms and conditions
    Given an organisation user has submitted a marine licence application
    When the user selects Withdraw for the submitted application
    Then the withdraw confirmation page names the marine licence application and project
    And the withdraw confirmation page links to the marine licensing terms and conditions

  @issue=ML-1074
  Scenario: Confirming the withdrawal returns to the dashboard with a Withdrawn status
    Given an organisation user has submitted a marine licence application
    When the user confirms the withdrawal of the submitted application
    Then the user is returned to the projects dashboard
    And the application status is "Withdrawn" on the dashboard
    And the withdrawn application offers View details but not Withdraw

  @issue=ML-1074
  Scenario: A withdrawn application can still be opened with View details from the dashboard
    Given an organisation user has withdrawn a submitted marine licence application
    When the user opens View details for the submitted marine licence
    Then the View details page shows the site location and site card for that site type

  @issue=ML-1074
  Scenario: The application details card shows the withdrawal status and the date of withdrawal
    Given an organisation user has withdrawn a submitted marine licence application
    When the user opens View details for the submitted marine licence
    Then the application details card shows the Withdrawn status and the date withdrawn
