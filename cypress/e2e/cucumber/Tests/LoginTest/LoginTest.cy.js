/// <reference types="cypress" />
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import login from "../../../../support/PageObjects/LoginPage";

Given("Open the site in the browser", () => {
login.visitHome()
});

When("user type email and password", () =>{
login.enterUserNamePassword("retoautomationsiigo@yopmail.com","T4b4ck0ff1c3P455w0rd658*")
});

And("user select button Continuar the site allow enter", () =>{
    login.clickSubmitButton();
});

Then("validate the title in the page", () => {
login.verifyPageTitle();
});

Given("The user is on the dashboard", () => {
    login.visitDashboard()
});

When("The user clicks the Crear button", () =>{
    login.selectCrearButton()
});

Then("The form Crear un tercero should be displayed ", () => {
    login.verifyDashborad();
});


    
