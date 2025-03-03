import 'cypress-iframe'; // Asegurar que cypress-iframe está importado

class LoginPage {
  
  // 🔹 Método para limpiar sesión
  clearSession() {
    cy.clearCookies();
  }

  // 🔹 Método para autenticar al usuario solo si no está autenticado
  loginIfNeeded(username, password) {
    cy.session("login-session", () => {
      cy.visit("https://qaaccount.siigo.com/");
      
      cy.get("#siigoSignInName").should("be.visible").type(username);
      cy.get("#siigoPassword").should("be.visible").type(password);
      cy.get("#siigoNext").should("be.visible").click();

      // 🔹 Esperar que redireccione correctamente al dashboard
      cy.url({ timeout: 15000 }).should("include", "dashboard");

      // 🔹 Validar que la sesión se mantiene
      cy.getCookie("auth_token").should("exist");
    }, {
      validate: () => {
        cy.getCookie("auth_token").should("exist");
      }
    });
  }

  // 🔹 Método para visitar la página de autenticación si es necesario
  visitHome() {
    cy.getCookie("auth_token").then((cookie) => {
      if (!cookie) {
        const randomState = Math.random().toString(36).substring(7);
        cy.visit(`https://qaaccount.siigo.com/siigob2cqa.onmicrosoft.com/b2c_1a_ssosiigo_v3/oauth2/v2.0/authorize?client_id=d0e0d0c1-7297-4379-8237-bb90b5573616&redirect_uri=https%3A%2F%2Fqastaging.siigo.com%2Fopenid-callback%2F&response_type=code&scope=openid+profile+https%3A%2F%2Fsiigob2cqa.onmicrosoft.com%2Fbusiness%2Fuser_impersonation+offline_access&state=${randomState}&code_challenge=_UZFsVmF-np39Ve0HWjLfDcDwXu1zBbg5--LWW7peuw&code_challenge_method=S256&response_mode=fragment`);
        cy.title().should("eq", "Siigo");
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

  // 🔹 Verificar que la página cargó correctamente
  verifyPageTitle(expectedTitle = "Siigo") {
    cy.title({ timeout: 10000 }).should("eq", expectedTitle);
  }

  // 🔹 Visitar dashboard sin cerrar sesión
  visitDashboard() {
    cy.getCookie("auth_token").then((cookie) => {
      if (!cookie) {
        cy.log("⚠️ No hay sesión activa, autenticando...");
      }
    });

    cy.visit("https://qastaging.siigo.com/#/dashboard/1055");
    cy.url().should("include", "/dashboard/1055");

    // 🔹 Mejor manejo del iframe
    cy.get("iframe", { timeout: 15000 }).should("exist").then(($iframe) => {
      cy.wrap($iframe).should("be.visible");
    });

    // 🔹 Uso mejorado de cypress-iframe
    cy.frameLoaded("iframe", { timeout: 15000 });
    cy.iframe().find("selector-dentro-del-iframe").should("be.visible");

    this.verifyPageTitle("Siigo Nube");
  }

  // 🔹 Seleccionar botón "Crear"
  selectCrearButton() {
    cy.xpath("//siigo-header-molecule[@class='data-siigo-five9 hydrated']")
      .should("be.visible")
      .click({ force: true });

    this.verifyPageTitle("Siigo Nube");
  }

  // 🔹 Verificar dashboard
  verifyDashboard() {
    cy.xpath("//h3[contains(.,'Tipo de tercero')]").should("be.visible");
  }
}

export default new LoginPage();
