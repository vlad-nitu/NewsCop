import React from 'react'
import checkURL from '../CheckURL'

describe('<checkURL />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<checkURL />)

    // Verify that the NavbarComponent is rendered with the correct applicationName
    cy.get('#navbar-component')
      .should('exist')
      .should('contain', 'NewsCop')

    // Verify that the BodyCheckGeneric component is rendered with the correct description
    cy.get('#body-check-generic')
      .should('exist')
      .should('contain', 'News overlap checker')

    // Interact with the EnterURL component (e.g., type text in input fields and click buttons)
    cy.get('#enter-url')
      .should('exist')
      .within(() => {
        // Type a URL in the input field
        cy.get('input[type="text"]').type('https://example.com')

        // Click a button to submit the URL
        cy.get('button').click()
      })

    // Verify that the Footer component is rendered
    cy.get('#footer')
      .should('exist')
  })
})
