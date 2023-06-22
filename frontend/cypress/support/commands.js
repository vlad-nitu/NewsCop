// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const epsilon = 1 // Allow for a small error
const bottom_upper_bound = Cypress.$(cy.state('window')).height() + epsilon
const bottom_lower_bound = Cypress.$(cy.state('window')).height() - epsilon

// Add custom assertion `isInViewport` and `isNotInViewport` -> see this GitHub thread: https://github.com/cypress-io/cypress/issues/877#issuecomment-490504922
Cypress.Commands.add('isNotInViewport', element => {
  cy.get(element).then($el => {
    const rect = $el[0].getBoundingClientRect()

    expect(rect.top).to.be.greaterThan(bottom_lower_bound)
    expect(rect.bottom).to.be.greaterThan(bottom_lower_bound)
  })
})

Cypress.Commands.add('isInViewport', element => {
  cy.get(element).then($el => {
    const bottom = Cypress.$(cy.state('window')).height()
    const rect = $el[0].getBoundingClientRect()

    // The head should be visible
    expect(rect.top).not.to.be.greaterThan(bottom_upper_bound)
    expect(rect.bottom).not.to.be.greaterThan(bottom_upper_bound)
  })
})

Cypress.Commands.add('redirectionStatistics', () => {
  /** Retrieve statistics section from the navbar **/
  cy.get('[data-testid="navbar-component"]')
    .should('exist')
    .get('a[href="/#statistics"]').contains('Statistics')
    .click()
  cy.url()
    .should(
      'be.equal',
      `http://frntnd-01d860a10e63.herokuapp.com/#statistics`)
})
