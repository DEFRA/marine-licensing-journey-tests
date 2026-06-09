@iat @iatoutcome @iatintermediate
Feature: IAT: Intermediate outcome pages
  As an applicant using the IAT
  I want intermediate outcome pages to present a choice of options
  So that I can pick what to do next based on my activity

  Scenario: Construction "exemption not available, continue" via the golden path
    Given the user starts the IAT
    When the user follows this IAT answer path:
      | answer                                             |
      | In or over the sea                                 |
      | English waters or Northern Ireland offshore waters |
      | Construction                                       |
      | Build or make something new                        |
      | Moorings or aids to navigation                     |
      | Something else                                     |
    Then the IAT intermediate outcome page "/exemption/construction-exe-not-available-continue" is displayed
    And the IAT outcome options include:
      | option                                                                     |
      | Check to see if the activity is suitable for self-service marine licensing |
      | Apply for a standard marine licence                                        |

  Scenario: Deposit "exemption not available, continue" via the golden path
    Given the user starts the IAT
    When the user follows this IAT answer path:
      | answer                                                        |
      | In or over the sea                                            |
      | English waters or Northern Ireland offshore waters            |
      | Deposit of a substance or object                              |
      | From a vehicle or vessel                                      |
      | Fishing or shellfish propagation and cultivation              |
      | Something else                                                |
    Then the IAT intermediate outcome page "/exemption/deposit-exe-not-available-continue" is displayed
    And the IAT outcome options include:
      | option                                                                     |
      | Check to see if the activity is suitable for self-service marine licensing |
      | Apply for a standard marine licence                                        |

  Scenario: Removal "exemption not available, continue" via the golden path
    Given the user starts the IAT
    When the user follows this IAT answer path:
      | answer                                             |
      | In or over the sea                                 |
      | English waters or Northern Ireland offshore waters |
      | Removal of a substance or object                   |
      | Using a vehicle or vessel                          |
      | Yes                                                |
      | Fishing or shellfish propagation and cultivation   |
      | Something else                                     |
    Then the IAT intermediate outcome page "/exemption/removal-exe-not-available-continue" is displayed
    And the IAT outcome options include:
      | option                                                                     |
      | Check to see if the activity is suitable for self-service marine licensing |
      | Apply for a standard marine licence                                        |

  Scenario: Dredging "exemption not available, continue" via the golden path
    Given the user starts the IAT
    When the user follows this IAT answer path:
      | answer                                             |
      | In or over the sea                                 |
      | English waters or Northern Ireland offshore waters |
      | Dredging                                           |
      | Something else                                     |
    Then the IAT intermediate outcome page "/exemption/dredging-exe-not-available-continue" is displayed
    And the IAT outcome options include:
      | option                                                                     |
      | Check to see if the activity is suitable for self-service marine licensing |
      | Apply for a standard marine licence                                        |

  Scenario Outline: Selecting "<option>" on <route> navigates to <expectedPath>
    Given the user walks the IAT to the outcome "<route>"
    When the user selects the "<option>" outcome option and clicks Continue
    Then the IAT lands on path "<expectedPath>"

    Examples:
      | route                                              | option                                                                     | expectedPath                                |
      | /exemption/construction-exe-not-available-continue | Check to see if the activity is suitable for self-service marine licensing | /journey/self-service/construction/activity |
      | /exemption/deposit-exe-not-available-continue      | Check to see if the activity is suitable for self-service marine licensing | /journey/self-service/deposit/activity      |
      | /exemption/removal-exe-not-available-continue      | Check to see if the activity is suitable for self-service marine licensing | /journey/self-service/removal/activity      |
      | /exemption/dredging-exe-not-available-continue     | Check to see if the activity is suitable for self-service marine licensing | /journey/self-service/dredging/activity     |
