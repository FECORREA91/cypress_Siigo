class LoginPage {
  visitHome() {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.intercept("GET", "**/openid-callback/**", { statusCode: 200, body: "" });
    cy.visit("https://qastaging.siigo.com/#/login", { failOnStatusCode: false });
    cy.title().should("eq", "Iniciar Sesión Siigo – Software Contable y Administrativo");
  }

  enterUserNamePassword(username, password) {
    cy.xpath("//input[@id='siigoSignInName']").should("be.visible").type(username);
    cy.xpath("//input[@id='siigoPassword']").should("be.visible").type(password);
    return this;
  }

  clickSubmitButton() {
    cy.xpath("//button[@id='siigoNext']").should('be.visible').click({force: true});
    return this;
  }

  verifyPageTitle() {
    return cy.title({ timeout: 10000 }).should("include", "Siigo");
  }
}

export default new LoginPage();
