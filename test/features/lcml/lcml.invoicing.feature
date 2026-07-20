@lcml
Feature: LCML: Invoicing details
  As an applicant
  I want to provide invoicing details for my marine licence
  So that the MMO can send the fee invoice to the correct contact

  @issue=ML-1393
  Scenario: Invoicing details task is displayed in the Fee estimate and invoicing details section
    Given an organisation user has started a marine licence application
    When the user views the marine licence task list
    Then the invoicing details task is shown in the "Fee estimate and invoicing details" section with status "Not yet started"

  @issue=ML-1393
  Scenario: Opening the invoicing details task shows the UK or international address page with no default selection
    Given an organisation user has started a marine licence application
    When the user opens the invoicing details task
    Then the UK or international invoice address page is shown with neither option selected

  @issue=ML-1394
  Scenario: The UK invoice address page is displayed after choosing UK
    Given an organisation user has opened the invoicing details task
    When the user selects "UK" as the invoice address type and continues
    Then the UK invoice address page shows the address fields with the project name caption

  @issue=ML-1394
  Scenario: A valid UK address with the optional fields blank is accepted
    Given an organisation user has opened the UK invoice address page
    When the user submits a valid UK invoice address without the optional fields
    Then no validation error is shown on the UK invoice address page

  @issue=ML-1395
  Scenario: The international invoice address page is displayed after choosing International
    Given an organisation user has opened the invoicing details task
    When the user selects "International" as the invoice address type and continues
    Then the international invoice address page shows the country and address fields with the project name caption
    And the country field lists all countries in alphabetical order

  @issue=ML-1395
  Scenario: A valid international address is accepted
    Given an organisation user has opened the international invoice address page
    When the user submits a valid international invoice address
    Then no validation error is shown on the international invoice address page
