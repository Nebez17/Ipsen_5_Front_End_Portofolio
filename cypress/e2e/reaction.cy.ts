
describe('ReactionComponent', () => {
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

  it('Should place a reaction', () => {
    const reactionText:string = 'Dit is een comment onder de post!';
    cy.intercept("POST", 'http://localhost:8080/reaction',{fixture: 'loginSucces.json'})

    cy.get('#inputComment').type(reactionText);
    cy.get('#postComment').should('be.enabled').click();

    cy.get('#reaction-list').contains(reactionText).should('be.visible');
  });

})
