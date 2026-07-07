@lcml @issue=ML-1407
Feature: LCML: Marine licence cases workbasket in D365
  As an internal MMO user
  I want a "Marine licence cases" workbasket in Dynamics 365
  So that I can see all submitted marine licence cases and open a case summary

  @real-defra-id @d365
  Scenario: The Marine licence cases workbasket displays the expected columns
    Given an organisation user has submitted a marine licence application with uploaded sites
    When the internal user opens the Marine licence cases workbasket in D365
    Then the Marine licence cases workbasket displays the following columns
      | Reference       |
      | Project name    |
      | Assigned to     |
      | Status          |
      | Case age (days) |

  @real-defra-id @d365
  Scenario: A submitted marine licence case appears in the workbasket
    Given an organisation user has submitted a marine licence application with uploaded sites
    When the internal user finds the submitted case in the Marine licence cases workbasket
    Then the workbasket row shows the submitted case reference, project name and status "Submitted"

  @real-defra-id @d365
  Scenario: The Case summary tab displays the submitted marine licence case details
    Given an organisation user has submitted a marine licence application with uploaded sites
    When the internal user opens the submitted case summary in D365
    Then the case summary displays the marine licence case details
