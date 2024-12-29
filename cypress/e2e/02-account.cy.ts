/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';

describe('Account', () => {
  beforeEach(() => {
    cy.getAuth('tabs/home');
  });

  it('Should show account details', () => {
    const account = {
      fullName: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.number.int({ min: 100000000, max: 999999999 }),
      dob: faker.date.past().toISOString().split('T')[0],
    };
    cy.window().then((win) => {
      window.localStorage.setItem('account', JSON.stringify(account));
    });
    cy.get('#tab-button-account').click();
    cy.get('[data-cy="account-full-name"] > ion-text.md').should('contain', account.fullName);
    cy.get('[data-cy="account-email"] > ion-text.md').should('contain', account.email);
    cy.get('[data-cy="account-phone"] > ion-text.md').should('contain', account.phone);
    cy.get('[data-cy="account-dob"] > ion-text.md').should('contain', account.dob);
  });
});
