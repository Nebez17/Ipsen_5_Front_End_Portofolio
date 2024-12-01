describe('signUp', () => {
  beforeEach(() => {
    cy.visit('/sign-in');
    cy.url().should('include', '');
    cy.get('#switchButton').click();
  });

  it('should sign-up user', () => {
    const usernameData:string = "testPerson"
    cy.intercept("POST", 'http://localhost:8080/auth/register',{fixture: 'loginSucces.json'})
    cy.intercept("POST", `http://localhost:8080/users/username/${usernameData}`,{fixture: 'personNotFound.json'})

    cy.get('#username').type(usernameData);
    cy.get('#email').type('testmail@mail.com');
    cy.get('#first_name').type('voornaam');
    cy.get('#last_name').type('achternaam');
    cy.get('#password').type('Testmail123!');
    cy.get('#password_confirm').type('Testmail123!');
    cy.get('#submitButton').should('be.enabled').click();
    cy.url().should('include', '/home');
  });

  it('not same password, so should not sign-up user', () => {
    const usernameData:string = "testPerson"
    cy.intercept("POST", 'http://localhost:8080/auth/register',{fixture: 'loginSucces.json'})
    cy.intercept("POST", `http://localhost:8080/users/username/${usernameData}`,{fixture: 'personNotFound.json'})

    cy.get('#username').type(usernameData);
    cy.get('#email').type('testmail@mail.com');
    cy.get('#first_name').type('voornaam');
    cy.get('#last_name').type('achternaam');
    cy.get('#password').type('Testmail1234567!');
    cy.get('#password_confirm').type('Testmail123!');
    cy.get('#submitButton').should('be.disabled');
    cy.url().should('not.include', '/home');
  });

  it('wrong type email, so should not sign-up user', () => {
    const usernameData:string = "testPerson"
    cy.intercept("POST", 'http://localhost:8080/auth/register',{fixture: 'loginSucces.json'})
    cy.intercept("POST", `http://localhost:8080/users/username/${usernameData}`,{fixture: 'personNotFound.json'})

    cy.get('#username').type(usernameData);
    cy.get('#email').type('testmailmail.com');
    cy.get('#first_name').type('voornaam');
    cy.get('#last_name').type('achternaam');
    cy.get('#password').type('Testmail123!');
    cy.get('#password_confirm').type('Testmail123!');
    cy.get('#submitButton').should('be.disabled');
    cy.url().should('not.include', '/home');
  });
});
