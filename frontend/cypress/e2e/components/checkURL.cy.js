describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000/checkURL')

    // Verify that the NavbarComponent is rendered with the correct applicationName
    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .should('contain', 'NewsCop')

    // Verify that the BodyCheckGeneric component is rendered with the correct description
    cy.get('[data-testid="body-check-generic"]')
      .should('exist')
      .should('contain', 'News overlap checker')

    // Interact with the EnterURL component (e.g., type text in input fields and click buttons)
    cy.get('[data-testid="enter-url"]')
      .should('exist')
      .within(() => {
        // Type a URL in the input field
        cy.get('#formUrl').type('https://example.com')

        // Click a button to submit the URL
        cy.get('button').click()
      })

    // Verify that the Footer component is rendered
    cy.get('#footer') // This one already had an `id` that I decided to use
      .should('exist')
  })
})
