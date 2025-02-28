class LoginPage {
  enterURL() {
   cy.visit(
     "https://qastaging.siigo.com/#/login"
   );
 }
  enterUserNamePassword(username, password) {
   cy.xpath("//input[@id='siigoSignInName']").should('be.visible').type(username);
   cy.wait(4000)
   cy.xpath("//input[@id='siigoSignInName']").should('be.visible').type(password);
   cy.wait(4000)
   return this;
 }
  clickSubmitButton() {
   cy.xpath("//button[@id='siigoNext']").eq(0).click();
   return this;
 }
  verifyPageTitle() {
   return cy.title().should("eq", "Search -");
 }
}
const login = new LoginPage();
export default login;