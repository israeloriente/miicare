/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';

describe('Testing Login Auth', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL'));
  });

  it('Login ok', () => {
    cy.login(Cypress.env('AUTH_USER'), Cypress.env('AUTH_PASS'), true);
  });

  it('Login Fails', () => {
    cy.login(faker.internet.email(), faker.internet.password(), false);
    cy.get('[data-cy="invalid-login"]').should('be.visible').should('contain', 'Invalid username or password.');
  });
});
