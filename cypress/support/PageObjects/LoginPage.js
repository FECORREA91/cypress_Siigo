describe('Test pagina Siigo', () => {
  Cypress.on('uncaught:exception', () => false);
});

class LoginPage {

// 🔹 Método para limpiar sesión
clearSession() {
  cy.clearCookies();
}

// 🔹 Método para visitar la página de autenticación 
visitHome() {
  cy.getCookie("auth_token").then((cookie) => {
    if (!cookie) {
      const randomState = Math.random().toString(36).substring(7);
      cy.visit("https://qastaging.siigo.com/#/login");
      this.verifyPageTitle("Siigo");
    }
  });
}

// 🔹 Ingresar usuario y contraseña
enterUserNamePassword(username, password) {
  cy.get("#siigoSignInName").should("be.visible").type(username);
  cy.get("#siigoPassword").should("be.visible").type(password);
}

// 🔹 Hacer clic en botón de inicio de sesión
clickSubmitButton() {
  cy.get("#siigoNext").should("be.visible").click({ force: true });
}

// 🔹 Verificar título de la página
verifyPageTitle(expectedTitle = "Siigo") {
  cy.title({ timeout: 10000 }).should("eq", expectedTitle);
}

// 🔹 Método para iniciar sesión
login(username, password) {
  this.visitHome(); 
  this.enterUserNamePassword(username, password); 
  this.clickSubmitButton(); 
  cy.wait(5000); 
  this.visitDashboard();
}

// 🔹 Visitar dashboard sin cerrar sesión
visitDashboard() {
  cy.getCookie("auth_token").then((cookie) => {
    if (!cookie) {
      cy.log("⚠️ No hay sesión activa, autenticando...");
      this.login("retoautomationsiigo@yopmail.com", "T4b4ck0ff1c3P455w0rd658*");
    }

    // Visitar la página después de verificar la sesión
    cy.visit("https://qastaging.siigo.com/#/dashboard/1055", { failOnStatusCode: false });

    // Esperar a que el loader desaparezca antes de continuar
    cy.get('.loader-selector', { timeout: 15000 }).should('not.exist'); // Reemplaza con el selector real del loader

    // Verificar que el dashboard ha cargado correctamente
    cy.get("#main > div > div", { timeout: 15000 }).should("be.visible");
  });
}

// 🔹 Seleccionar botón "Crear"
selectCrearButton() {
  cy.get("#wc-s08af42d-1f7c-4dd0-bbfb-250bdc43adf4 > div > button", { timeout: 15000 })
  .should("be.visible")
  .click({ force: true });
}

// 🔹 Verificar dashboard
verifyDashboard() {
  cy.xpath("//h3[contains(.,'Tipo de tercero')]").should("be.visible");
}
}

export default new LoginPage();
