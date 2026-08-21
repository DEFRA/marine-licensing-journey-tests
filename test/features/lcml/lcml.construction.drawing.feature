@lcml @issue=ML-1469 @issue=ML-1475
Feature: LCML: Construction drawing upload sub-journey
  As an applicant undertaking a construction activity
  I want to provide a drawing or plan
  So it can be reviewed and attached to my licence schedule if consented

  Scenario: Selecting Construction reveals the Maintenance hint text
    Given an organisation user is on the Type of activity page
    When the user selects the Construction activity type
    Then the Maintenance construction option shows the hint text

  Scenario Outline: A construction sub-activity determines whether a drawing card is required
    Given an organisation user is on the Type of activity page
    When the user completes the "<sub-activity>" construction sub-activity
    Then the construction drawing card is "<visibility>" on the review site details page

    Examples:
      | sub-activity | visibility |
      | new works    | shown      |
      | alteration   | shown      |
      | maintenance  | hidden     |

  Scenario: Uploading a construction drawing shows the file on the review page
    Given an organisation user has a construction activity requiring a drawing
    When the user uploads a construction drawing
    Then the "Site 1 - Construction drawing 1" card shows the uploaded file

  Scenario: Changing the activity type away from construction warns that drawings will be deleted
    Given an organisation user has a construction activity requiring a drawing
    When the user changes the Type of activity to a non-construction option
    Then the change activity confirmation warns that construction drawings will be deleted
    And cancelling the change returns to the Type of activity page

  Scenario: Uploading the wrong file type shows a construction drawing error
    Given an organisation user is on the Upload construction drawing page
    When the user uploads the "EXE_2025_00009-LOCATIONS-without-site-name.kml" construction drawing
    Then the construction drawing upload error "The selected file must be a PDF or image (.bmp, .gif, .jpg, .jpeg, .png, .tif) file" is displayed

  Scenario: Adding and uploading a second construction drawing for a site
    Given an organisation user has uploaded a construction drawing for site 1
    When the user adds and uploads another construction drawing
    Then the "Site 1 - Construction drawing 2" card shows the uploaded file

  Scenario Outline: Deleting a construction drawing can be cancelled or confirmed
    Given an organisation user has two construction drawings for site 1
    When the user <action> deleting the second construction drawing
    Then the "Site 1 - Construction drawing 2" card is "<visibility>"

    Examples:
      | action   | visibility      |
      | cancels  | still shown     |
      | confirms | no longer shown |

  Scenario: Changing an uploaded construction drawing returns to its upload page
    Given an organisation user has uploaded a construction drawing for site 1
    When the user selects Change on the first construction drawing
    Then the "Site 1: Upload construction drawing 1" page is shown
