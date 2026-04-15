@issue=ML-620
Feature: Applicants need to see exemption details afterwards. They will need to be able to access them from their confirmation email.
AS an applicant who is logged out
I WANT to see my exception notification details if I click the link in my confirmation email
SO THAT I can see my exception notification details afterwards

AS an applicant who is logged out
I WANT to see the dashboard if I bookmark it
SO THAT I can see my list of exceptions easily

NOTE: THE WIP SCENARIO IS IGNORED DUE TO THE TRANSITION TOWARDS SITE DETAILS ACTIVITY DATES AND DESCRIPTIONS

  @wip
  Scenario: Click on the link to the View Details page when logged out redirect to login and then to View Details
    Given the user has submitted an exemption notification
    And the user is logged out
    When the user clicks on the link to View Details page and logs in
    Then subsequently redirected to the View Details page

  Scenario: Open a link to the Dashboard when logged out redirect to login and then to Dashboard
    Given the user has submitted an exemption notification
    And the user is logged out
    When the user clicks on the link to the Dashboard and logs in
    Then subsequently redirected to the Dashboard
