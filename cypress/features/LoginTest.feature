Feature: I want to login into the site with valid data

    Scenario: Login in the app web

    Given Open the site in the browser
    When user type email and password
    And user select button Continuar the site allow enter
    Then validate the title in the page

    Scenario: User on the dash
    Given The user is on the dashboard
    When The user clicks the Crear button
    Then The form Crear un tercero should be displayed



  