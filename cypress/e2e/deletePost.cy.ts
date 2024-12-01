describe('Delete Post', () => {
  let deletedPostTitle: string;

  beforeEach(() => {
    cy.visit('/sign-in');
    cy.get('#email').type('mvamstel@mail.com');
    cy.get('#password').type('Test123!');
    cy.get('#submitButton').should('be.visible').click();
    cy.wait(1000);
    cy.reload();
  })

  it('should delete a post', () => {
    cy.visit('/official_selection');
    cy.get('#bigPost').click({ force: true });
    cy.get('#title').invoke('text').then((text) => {
      deletedPostTitle = text;

      if (deletedPostTitle) {
        cy.get('button').contains('Delete post').click();

        cy.get('button').contains('Yes').click();
        cy.wait(1000);
        cy.visit('/official_selection');

        cy.contains(deletedPostTitle).should('not.exist');
      } else {
        throw new Error('deletedPostTitle is undefined');
      }
    });
  });

});
