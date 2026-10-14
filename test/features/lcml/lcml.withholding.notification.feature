Feature: LCML: Telling the applicant what we decided about withholding their information
  As an applicant
  I want to be informed about how my application will be redacted
  So that I understand what will be shown on the public register and can withdraw if I have any concerns

  @lcml @issue=ML-1524
  Scenario Outline: The withholding notification shows the <decision> decision on <basis>
    Given an organisation user has submitted a marine licence application
    When the caseworker tells the applicant "<decision>" about withholding information on <basis>
    And the applicant opens the withholding notification
    Then the notification gives the "<heading>" decision "<text>" with the caseworker's comments
    And the notification has no "<absent>" section
    And the notification links to the Submissions page to withdraw the application

    Examples:
      | basis                      | decision      | heading                                  | text                                                              | absent                                   |
      | national security          | AGREE_IN_PART | National security                        | We've agreed to withhold some of the information you asked us to. | Commercial or industrial confidentiality |
      | commercial confidentiality | DISAGREE      | Commercial or industrial confidentiality | We've decided not to withhold the information you asked us to.    | National security                        |
      | national security          | AGREE         | National security                        | We've agreed to withhold the information you asked us to.         | Commercial or industrial confidentiality |

  @lcml @issue=ML-1524
  Scenario: Marking the withholding notification as read returns the application to Submitted
    Given an organisation user has submitted a marine licence application
    When the caseworker tells the applicant the outcome of their request to withhold information
    And the applicant opens the withholding notification
    And the applicant marks the notification as read
    Then View details shows the withholding notification task as "Read"
    And the application status is "Submitted" on the dashboard

  @lcml @issue=ML-1524 @issue=ML-1538
  Scenario: The applicant is asked to read the withholding decision and the application needs their action
    Given an organisation user has submitted a marine licence application
    When the caseworker tells the applicant the outcome of their request to withhold information
    Then the dashboard offers View details and Withdraw for the application
    And filtering the dashboard by status "Action required" lists the project
    And View details shows the withholding notification task as "Not yet read"
    And the public view of the application has no "Things that require your attention" section

  @lcml @issue=ML-1524 @issue=ML-1538
  Scenario: An application that needs the applicant's action can be withdrawn and stays withdrawn once the notification is read
    Given an organisation user has submitted a marine licence application
    When the caseworker tells the applicant the outcome of their request to withhold information
    And the user confirms the withdrawal of the submitted application
    And the applicant opens the withholding notification
    And the applicant marks the notification as read
    Then the application status is "Withdrawn" on the dashboard
    And the withdrawn application offers View details but not Withdraw

  @real-defra-id @d365 @issue=ML-1374 @issue=ML-1524
  Scenario: A withholding decision on both bases completed in D365 is shown to the applicant
    Given an organisation user has submitted a marine licence application
    When the caseworker completes the Site check in D365
    And the caseworker completes the Public register task with "Agree - but only withhold some of it" on commercial confidentiality and "Disagree" on national security
    And the applicant opens the withholding notification
    Then the notification gives the "Commercial or industrial confidentiality" decision "We've agreed to withhold some of the information you asked us to." with the caseworker's comments
    And the notification gives the "National security" decision "We've decided not to withhold the information you asked us to." with the caseworker's comments
    And the Public register task links to the redaction page for the application

  @real-defra-id @d365 @issue=ML-1374 @issue=ML-1543
  Scenario Outline: A Public register task <outcome> gives the applicant nothing to read
    Given an organisation user has submitted a marine licence application
    When the caseworker completes the Site check in D365
    And the caseworker saves the Public register task with "<decision>" on commercial confidentiality, <completion> as complete
    Then the Public register task is "<status>" in D365
    And View details still shows the application as "Submitted" with no withholding notification task
    And the Application overview card shows who the marine licence is for

    Examples:
      | outcome                             | decision                             | completion | status      |
      | that withholds everything           | Agree - withhold all of it           | marked     | Done        |
      | saved without being marked complete | Agree - but only withhold some of it | not marked | In Progress |
