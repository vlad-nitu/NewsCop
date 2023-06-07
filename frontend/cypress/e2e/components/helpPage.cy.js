describe('HelpPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/help') // Assuming the HelpPage component is rendered at '/help' route
  })

  it('displays the FAQ section', () => {
    cy.get('#titles').should('be.visible')
    cy.contains('h5', 'FAQs').should('be.visible')
    cy.contains('h1', 'Frequently asked questions').should('be.visible')
    cy.contains('h4', 'Have questions? We’re here to help.').should('be.visible')
  })

  it('fetches and displays the questions and answers', () => {
    cy.get('#body').should('be.visible')
    cy.get('#body').find('.rounded').should('have.length', 5) // Assuming there are 3 questions in the 'questionsFile'

    cy.get('#body')
      .find('.rounded')
      .each(($question, index) => {
        // Assert the question is visible and clickable
        cy.get($question).should('be.visible')
        cy.get($question).find('.d-flex.align-items-center').should('have.attr', 'data-bs-toggle', 'collapse')
        cy.get($question).find('.d-flex.align-items-center').should('have.attr', 'aria-controls', `collapseExample${index}`)

        // Click on the question to expand/collapse the answer
        cy.get($question).find('.d-flex.align-items-center').click()

        // Wait .35s, the animation time
        cy.wait(350)

        // Assert the answer is visible
        cy.get(`#collapseExample${index}`).should('be.visible')

        // Click on the question again to collapse the answer
        cy.get($question).find('.d-flex.align-items-center').click()

        // Wait .35s, the animation time
        cy.wait(350)

        // Assert the answer is collapsed
        cy.get(`#collapseExample${index}`).should('not.be.visible')
      })
  })

  // Add more tests as needed...
})
