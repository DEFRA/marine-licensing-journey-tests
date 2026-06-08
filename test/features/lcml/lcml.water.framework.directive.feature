@lcml @issue=ML-1312 @issue=ML-1326
Feature: LCML: Water Framework Directive
  As an applicant for a marine licence
  I want to read about and complete the Water Framework Directive assessment
  So that I understand whether my project needs a WFD assessment

  @issue=ML-1312
  Scenario: Water Framework Directive assessment task is displayed with "Not yet started"
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the "Water Framework Directive" section heading is displayed on the task list
    And the "Water Framework Directive assessment" task is displayed with status "Not yet started"

  @issue=ML-1312
  Scenario: Selecting the task displays the Before you start WFD page
    Given an organisation user has started a marine licence application
    When the user opens the Water Framework Directive assessment task
    Then the Before you start WFD page is displayed with the project name in the caption
    And the "Help with excluded activities" section is initially collapsed
    And the guidance link opens the Water Framework Directive guidance on gov.uk in a new tab

  @issue=ML-1326
  Scenario: Selecting "No" on the One nautical mile page completes the WFD assessment task
    Given an organisation user is on the One nautical mile WFD page
    When the user selects "No" and continues on the One nautical mile page
    Then the user is returned to the marine licence task list
    And the "Water Framework Directive assessment" task is displayed with status "Completed"
