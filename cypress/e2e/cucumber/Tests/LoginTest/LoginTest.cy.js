/// <reference types="cypress" />
import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps"
import login from "../../../../support/PageObjects/LoginPage";

describe('Test pagina Siigo', () =>{
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
})

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