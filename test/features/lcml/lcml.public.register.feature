@lcml @issue=ML-1509 @issue=ML-1631
Feature: LCML: Information published on the public register task
  As an applicant
  I want to be clear about what I am consenting to, and the reasons why I can withhold consent
  So that my application can be handled appropriately

  Scenario: The page asks whether information should be withheld and hides the reasons until asked
    Given an organisation user has started a marine licence application
    When the user opens the Information published on the public register task
    Then the page asks "Do you want to ask us to withhold any information from the public register?"
    And the withholding reasons are hidden
    And selecting "Yes" reveals the withholding reasons "National security reasons" and "Commercial or industrial confidentiality reasons"
    And selecting "No" hides the withholding reasons

  @issue=ML-1667 @issue=ML-1668 @issue=ML-1673
  Scenario Outline: Withholding information for <reason> goes through its page and the review page, and completes the task
    Given an organisation user has started a marine licence application
    When the user asks to withhold information for "<reason>" with approval "<approval>", and continues from the review page
    Then the "<follow-up page>" page was shown after the withholding question
    And the review page showed "<withhold answer>", the approval "<approval answer>" and the details row "<details row>"
    And the "Information published on the public register" task status is "Completed"
    And selecting the task again shows the review page with the same answers

    Examples:
      | reason                                           | approval | follow-up page                                                               | withhold answer                                        | approval answer                                                                                         | details row                    |
      | Commercial or industrial confidentiality reasons | n/a      | Withholding information for commercial or industrial confidentiality reasons | Yes – Commercial or industrial confidentiality reasons | not shown                                                                                               | What you want withheld and why |
      | National security reasons                        | Yes      | Withholding information for national security reasons                        | Yes – National security reasons                        | Yes                                                                                                     | What you want withheld         |
      | National security reasons                        | No       | Withholding information for national security reasons                        | Yes – National security reasons                        | No – If you get approval later, you can come back and change your answer before you submit your application. | not shown                      |

  Scenario: The saved withholding request is shown on Check your answers
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "Yes"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    And the user saves "Yes" with reason "Commercial or industrial confidentiality reasons" on the public register page
    When the user opens the check your answers page from the task list
    Then "Do you want to ask us to withhold any information from the public register?" on the public register card is "Yes – Commercial or industrial confidentiality reasons"
    And "What you want withheld and why" on the public register card is "Journey test: the mooring layout and pricing are commercially confidential."

  Scenario: The public register answers are read-only on the View details page
    Given an organisation user has completed all tasks with special legal powers "No", other authorities "No" and sharing consent "No"
    And the activity has type of activity, activity description, maximum duration, completion date, specific months and proposed working hours saved
    When the user submits the marine licence application from the task list
    And the user views the submitted application on the projects page
    Then the public register card shows "Yes" with no Change link
