Feature: I want to login into the site with valid data
  Background: Navigate to the Website
    Given I navigate to the Website
  Scenario: Login as new sign up user with valid data
    When I entered valid credential
      | email                  | validpassword |
      | retoautomationsiigo@yopmail.com  | T4b4ck0ff1c3P455w0rd658    |
    And User click on sign in button
    Then Validate the title after login