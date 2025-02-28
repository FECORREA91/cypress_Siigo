const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  reporter: "spec", // Cambia temporalmente a "spec"
  e2e: {
    specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
  },
});
