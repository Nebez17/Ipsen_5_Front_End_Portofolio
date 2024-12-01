
describe('LoginComponent', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
    cy.url().should('include', '');

  });

  it('Should login if credentials are valid', () => {
    cy.get('#email').type('pvdijk@mail.com');
    cy.get('#password').type('Test123!');
    cy.get('#submitButton').should('be.visible').click();
    cy.url().should('include', '/home');
  });

  it('Should not login if email is not valid', () => {
    cy.get('#email').type('pvdijksds@mail.com');
    cy.get('#password').type('Test123!');
    cy.get('#submitButton').should('be.visible').click();
    cy.url().should('not.include', '/home');
  });
})
