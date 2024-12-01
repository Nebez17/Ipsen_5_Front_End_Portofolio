describe('NotificationComponent', () => {
  let postTitle: string;

  beforeEach(() => {
    cy.visit('/sign-in');
    cy.get('#email').type('mvamstel@mail.com');
    cy.get('#password').type('Test123!');
    cy.get('#submitButton').should('be.visible').click();
    cy.wait(1000);
    cy.reload();
    cy.get('#dropdownAvatarNameButton').click();
  })

  it('should request deletion and check notification', () => {
    cy.get('#profile').click();
    cy.get('#dropdownAvatarNameButton').click();
    cy.get('#postOptions').click();

    cy.get('#postTitle').invoke('text').then((text) => {
      postTitle = text;

      cy.get('#requestDeletionButton').click();

      cy.get('#dropdownAvatarNameButton').click();
      cy.get('#notification').click();

      cy.get('#notifications').first().get('#notificationMessage').should('contain', postTitle);
      cy.get('#notifications').first().get('#markAsReadButton').click();
    });
  });

});
