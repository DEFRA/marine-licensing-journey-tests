@issue=ML-644
Feature: Privacy policy can be accessed from the link in the footer
  AS an applicant
  I WANT to see the privacy policy of MMO in the footer of every page
  SO THAT I can be sure my data is being used legally

  @run-only
  Scenario: The privacy policy can be accessed from the footer link
    Given the project name page is displayed
    When entering and saving a project with a valid name
    And the privacy policy link is clicked
    Then the privacy policy page is displayed
