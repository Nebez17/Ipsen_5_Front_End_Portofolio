describe('Rating', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
    cy.get('#email').type('pvdijk@mail.com');
    cy.get('#password').type('Test123!');
    cy.get('#submitButton').should('be.visible').click();
    cy.wait(1000);
    cy.url().should('include', '/home');

    cy.visit('/official_selection');
    cy.wait(500);
    cy.get('#bigPost').click({ force: true });
    cy.url().should('include', '/article');
  });

  it('Should place a rating of 1', () => {
    cy.intercept("POST", 'http://localhost:8080/rating').as('postRating')
    cy.get('.star').first().click();
    cy.wait('@postRating').then((interception) => {
      expect(interception.request.body.grade).to.equal(1);
    });
    cy.get('.star').first().find('img').should('have.attr', 'src').and('include', 'Full_Star.png');
  });

})
