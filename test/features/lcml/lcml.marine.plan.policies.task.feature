@lcml
Feature: LCML: Marine plan policies task on the task list
  As an applicant for a marine licence
  I want to see the Marine plan policies section and its task status
  So that I know when I can complete the marine plan policy considerations

  @issue=ML-1351
  Scenario: The Marine plan policies section is displayed on the task list
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Marine plan policies" section heading is displayed on the task list
    And the Marine plan policies section shows a guidance link that opens in a new tab

  @issue=ML-1351
  Scenario: The policy considerations task cannot be started before the sites are added
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Marine plan policy considerations" task has status "Cannot start yet"
    And the "Marine plan policy considerations" task is not a link

  @wip @issue=ML-1351
  Scenario: The policy considerations task is Not yet started once the sites are completed
    Given an organisation user has completed all site and activity details for a marine licence
    When the user opens the marine licence task list
    Then the "Marine plan policy considerations" task has status "Not yet started"
    And the "Marine plan policy considerations" task link shows the number of policies to complete
    And clicking the "Marine plan policy considerations" task keeps the user on the task list
