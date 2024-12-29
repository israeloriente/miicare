/// <reference types="Cypress" />

Cypress.Commands.add('getAuth', (url) => {
  cy.window().then((window) => {
    cy.readFile(Cypress.env('AUTH_PATH')).then(({ isLoggedIn }) => {
      if (isLoggedIn) window.localStorage.setItem(Cypress.env('STORAGE_AUTH_TOKEN'), isLoggedIn);
    });
  });
  cy.visit(Cypress.env('BASE_URL') + url);
  cy.location('pathname').then((pathname) => {
    if (pathname === '/login') {
      cy.login(Cypress.env('AUTH_USER'), Cypress.env('AUTH_PASS'), true);
      cy.visit(Cypress.env('BASE_URL') + url);
    }
  });
});

Cypress.Commands.add('saveAuth', () => {
  cy.window().then(() => {
    let data: any = window.localStorage.getItem(Cypress.env('STORAGE_AUTH_TOKEN'));
    if (data)
      cy.writeFile(Cypress.env('AUTH_PATH'), {
        isLoggedIn: data,
      });
  });
});

Cypress.Commands.add('login', (username: string, password: string, willPass) => {
  cy.get('[data-cy="username"]').type(username);
  cy.get('[data-cy="password"]').type(password, { log: false });
  cy.get('[data-cy="submit-button"]').click();
  if (willPass) {
    cy.url({ timeout: 10000 }).should('eq', `${Cypress.env('BASE_URL')}tabs/home`);
    cy.saveAuth();
  }
});
