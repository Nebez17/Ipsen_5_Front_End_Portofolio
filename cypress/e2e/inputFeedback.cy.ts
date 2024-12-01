describe('SubmitContentComponent', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
    cy.get('#email').type('pvdijk@mail.com');
    cy.get('#password').type('Test123!');
    cy.get('#submitButton').should('be.visible').click();
    cy.wait(1000);
    cy.url().should('include', '/home');

    cy.visit('/submit_content');
  });

  it('Should display error if input is not valid', () => {
    cy.get('input').eq(1).type('invalidName@');
    cy.contains('Name not valid. It can not contain special characters').should('be.visible');
    cy.get('input').eq(2).type('invalidEmail@');
    cy.contains('Email not valid. The format should be: example@mail.abc').should('be.visible');
    cy.get('input').eq(3).type('invalidProfile@');
    cy.contains('Online profiles not valid. It can not contain special characters').should('be.visible');
  });
});
