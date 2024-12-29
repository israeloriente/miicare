/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
