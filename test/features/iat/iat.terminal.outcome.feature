@iat @iatoutcome @iatterminal
Feature: IAT: Terminal outcome pages
  As an applicant using the IAT
  I want terminal outcome pages to give me a final result
  So that I can read the outcome and continue into the relevant service

  @issue=ML-1167
  Scenario Outline: Terminal outcome page "<route>" renders heading, body and an MCMS handoff button
    Given the user walks the IAT to the outcome "<route>"
    When the user views the IAT outcome page
    Then the IAT terminal outcome page "<route>" is displayed with heading "<heading>"
    And the page has a body content block
    And the page has an MCMS handoff button labelled "<button>"

    Examples:
      | route           | heading                              | button                                  |
      | /fast-track-mla | Self-service marine licensing        | Apply for a self-service marine licence |
      | /mod-permission | MOD permission not sought or granted | Apply for a standard marine licence     |

  @issue=ML-1350
  Scenario Outline: Download outcome "<route>" renders the download as a text link opening in a new tab
    Given the user walks the IAT to the outcome "<route>"
    When the user views the IAT outcome page
    Then the IAT outcome page "<route>" has a download link "<link>" to "<href>" opening in a new tab

    Examples:
      | route                         | link                                                                       | href                                                                                              |
      | /scaffolding-impede-navigation | Download HA self-service marine licensing agreed method template           | https://marinelicensing.marinemanagement.org.uk/docs/HA_MCA_TH_Self_Service_Agreed_Method_Template.docx |
      | /scaffolding-mca-th-agreed     | Download MCA/TH self-service marine licensing agreed method template        | https://marinelicensing.marinemanagement.org.uk/docs/HA_MCA_TH_Self_Service_Agreed_Method_Template.docx |
      | /markers/ha-not-agreed         | Download HA (Markers) self-service marine licensing agreed method template  | https://marinelicensing.marinemanagement.org.uk/docs/HA_TH_Self_Service_Agreed_Method_Template.docx     |
      | /markers/th-not-agreed         | Download TH (Markers) self-service marine licensing agreed method template  | https://marinelicensing.marinemanagement.org.uk/docs/HA_TH_Self_Service_Agreed_Method_Template.docx     |
      | /historic-england/not-agreed   | Download HE self-service marine licensing agreed method template            | https://marinelicensing.marinemanagement.org.uk/docs/HE_Self_Service_Agreed_Method_Template.docx        |
      | /natural-england/not-agreed    | Download NE self-service marine licensing agreed method template            | https://marinelicensing.marinemanagement.org.uk/docs/NE_Self_Service_Agreed_Method_Template.docx        |
