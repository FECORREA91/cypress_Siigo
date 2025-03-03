const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome, spec",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
    },
  },
  e2e: {
    baseUrl: "https://qaaccount.siigo.com",
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      
      // Captura de pantalla en caso de fallo
      on("task", {
        failed(details) {
          console.log(`🔴 Prueba fallida: ${details}`);
          return null;
        },
      });

      return config;
    },
  },
});
