@issue=ML-764
Feature: Validate for missing files when uploading Shapefile
  As an applicant
  I want to see meaningful content and error messages when I provide an invalid shapefile
  So that I can understand how to provide a valid shapefile

  NOTE: The .prj file greater than 50KB is not covered as it is difficult to recreate - may implement later.

  @shapefile
  Scenario Outline: Uploading shapefile with <file_description> fails with appropriate error
    Given the user has a shapefile with "<file_description>"
    When completing the site details task
    Then the file upload error "<error_message>" is displayed

    Examples:
      | file_description                 | error_message                                           |
      | missing .shp file                | The selected file must include .shp .shx and .dbf files |
      | missing .shx file                | The selected file must include .shp .shx and .dbf files |
      | missing .dbf file                | The selected file must include .shp .shx and .dbf files |
      | missing .shp .shx and .dbf files | The selected file must include .shp .shx and .dbf files |
      | missing .prj file                | The selected file must include a .prj file              |
    #   | .prj file greater than 50KB      | The selected file's .prj file must be smaller than 50KB |
