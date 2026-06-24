@lcml
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

  @issue=ML-1326
  Scenario: Selecting "No" on the One nautical mile page completes the WFD assessment task
    Given an organisation user is on the One nautical mile WFD page
    When the user selects "No" and continues on the One nautical mile page
    Then the user is returned to the marine licence task list
    And the "Water Framework Directive assessment" task is displayed with status "Completed"

  @issue=ML-1327 @issue=ML-1341
  Scenario: Answering "Yes" to excluded activities shows the answers on the Review WFD answers page
    Given an organisation user is on the Excluded activities WFD page
    When the user selects "Yes" and continues on the Excluded activities page
    Then the Review WFD answers page is displayed
    And the Review WFD answers page shows "Project located within one nautical mile (1.85km) of the coast" as "Yes"
    And the Review WFD answers page shows "Project limited to one of the excluded activities" as "Yes"

  @issue=ML-1340 @issue=ML-1341 @issue=ML-1386
  Scenario: Answering "No" to excluded activities and uploading an assessment shows the file on the Review WFD answers page
    Given an organisation user is on the Excluded activities WFD page
    When the user selects "No" and uploads a Water Framework Directive assessment
    Then the Review WFD answers page is displayed
    And the Review WFD answers page shows "Project located within one nautical mile (1.85km) of the coast" as "Yes"
    And the Review WFD answers page shows "Project limited to one of the excluded activities" as "No"
    And the Review WFD answers page shows the uploaded file "WFD.docx"

  @issue=ML-1348
  Scenario: The Review WFD answers page provides a change link for each answer
    Given an organisation user is on the Excluded activities WFD page
    When the user selects "Yes" and continues on the Excluded activities page
    Then the Review WFD answers page is displayed
    And the Review WFD answers page has a change link for "Project located within one nautical mile (1.85km) of the coast"
    And the Review WFD answers page has a change link for "Project limited to one of the excluded activities"

  @issue=ML-1345 @issue=ML-1348
  Scenario: The WFD assessment card and its Change link are shown on Check your answers (nautical mile "Yes")
    Given an organisation user has completed a marine licence with a WFD assessment upload
    When the user opens the Check your answers page
    Then the Water Framework Directive assessment card shows "Project located within one nautical mile (1.85km) of the coast" as "Yes"
    And the Water Framework Directive assessment card shows "Project limited to one of the excluded activities" as "No"
    And the Water Framework Directive assessment card shows the uploaded file "WFD.docx"
    And the Water Framework Directive assessment card Change link points to the Review WFD answers page

  @issue=ML-1348
  Scenario: The WFD assessment card Change link points to the One nautical mile page (nautical mile "No")
    Given an organisation user has completed a marine licence with the WFD nautical mile answer "No"
    When the user opens the Check your answers page
    Then the Water Framework Directive assessment card shows "Project located within one nautical mile (1.85km) of the coast" as "No"
    And the Water Framework Directive assessment card Change link points to the One nautical mile page

  @issue=ML-1345
  Scenario: The WFD assessment card is shown read-only on the View details page
    Given an organisation user has submitted a marine licence with a WFD assessment upload
    When the user opens View details for the submitted marine licence
    Then the Water Framework Directive assessment card shows "Project located within one nautical mile (1.85km) of the coast" as "Yes"
    And the Water Framework Directive assessment card shows "Project limited to one of the excluded activities" as "No"
    And the Water Framework Directive assessment card shows the uploaded file "WFD.docx"
    And the Water Framework Directive assessment card is read-only
