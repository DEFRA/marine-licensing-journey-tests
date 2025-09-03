@issue=ML-111 @fivium
Feature: I can launch the IAT from the CDP platform
AS an applicant
I WANT information from my journey through the interactive assistance tool to be available in my notification
SO THAT I can see information about the journey and the terms of the exemption I am undertaking

  Scenario: Can launch IAT
    Given an applicant is unsure of what to do next
    When they launch the interactive assistance tool
    Then the welcome page is displayed
