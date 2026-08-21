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
    And the country field can be searched by name

  @issue=ML-1395
  Scenario: A valid international address is accepted
    Given an organisation user has opened the international invoice address page
    When the user submits a valid international invoice address
    Then no validation error is shown on the international invoice address page

  @issue=ML-1419
  Scenario: The invoice contact details page is displayed after entering an address
    Given an organisation user has opened the UK invoice address page
    When the user submits a valid UK invoice address without the optional fields
    Then the invoice contact details page shows the contact fields with the project name caption

  @issue=ML-1419 @issue=ML-1420
  Scenario: Valid contact details are accepted and lead to the purchase order details page
    Given an organisation user has opened the invoice contact details page
    When the user submits valid invoice contact details
    Then the purchase order details page shows the question with the project name caption

  @issue=ML-1419
  Scenario: The organisation name field is hidden and the button relabelled for an individual user
    Given an individual user has opened the UK invoice address page
    When the user submits a valid UK invoice address without the optional fields
    Then the invoice contact details page hides the organisation name field and labels the button "Save and continue"

  @issue=ML-1396
  Scenario: The check invoicing details page shows the details entered by an organisation user
    Given an organisation user has opened the purchase order details page
    When the user confirms no purchase order is required
    Then the check invoicing details page shows the invoicing details entered

  @issue=ML-1396 @issue=ML-1420
  Scenario: An individual user skips the purchase order page and reaches a reduced check page
    Given an individual user has opened the invoice contact details page
    When the user submits valid invoice contact details
    Then the check invoicing details page is displayed
    And the check invoicing details page hides the organisation name and purchase order rows

  @issue=ML-1396
  Scenario: Selecting Continue on the check page completes the invoicing details task
    Given an organisation user has opened the check invoicing details page
    When the user selects Continue on the check invoicing details page
    Then the invoicing details task is shown in the "Fee estimate and invoicing details" section with status "Completed"

  @issue=ML-1396
  Scenario: Opening a completed invoicing details task reopens the check page
    Given an organisation user has completed the invoicing details task
    When the user opens the invoicing details task
    Then the check invoicing details page is displayed

  @issue=ML-1420
  Scenario: A purchase order number is accepted when one is required
    Given an organisation user has opened the purchase order details page
    When the user requires a purchase order number and enters one
    Then the check invoicing details page shows the purchase order number entered
  @issue=ML-1397
  Scenario: The address type Change link opens the address type page pre-selected
    Given an organisation user has opened the check invoicing details page
    When the user selects Change for the address type
    Then the UK or international invoice address page is shown with "UK" selected
    And the invoicing page has a "Save and continue" button and no Cancel link

  @issue=ML-1397
  Scenario Outline: Saving the address type change routes to the correct page
    Given an organisation user has selected Change for the address type
    When the user selects "<type>" as the address type and saves
    Then the "<heading>" page is displayed

    Examples:
      | type          | heading                      |
      | UK            | Check your invoicing details |
      | International | International invoice address |

  @issue=ML-1397
  Scenario Outline: The <row> Change link updates the value and returns to the check page
    Given an organisation user has opened the check invoicing details page
    When the user updates the "<row>" via its Change link
    Then the check invoicing details page shows the updated "<row>"

    Examples:
      | row             |
      | address         |
      | contact details |
      | purchase order  |

  @issue=ML-1397
  Scenario: Navigating Back from a Change page returns to the check invoicing details page
    Given an organisation user has opened the check invoicing details page
    When the user opens the address Change link and selects Back
    Then the check invoicing details page is displayed
