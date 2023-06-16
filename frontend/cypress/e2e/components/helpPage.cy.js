import "../../support/commands";

describe('HelpPage', () => {

  const rootUrl = 'http://localhost:3000'

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

  it('scrolls to the top when the component mounts', () => {
    // Scroll to the bottom of the page first
    cy.scrollTo('bottom')

    // Reload the page
    cy.reload()

    // Assert that the page is scrolled to the top
    cy.window().then((window) => {
      expect(window.scrollY).to.equal(0)
    })
  })

  it('displays the navbar and footer components', () => {
    cy.get('nav').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('Redirection to statistics through navbar', () => {
     /** Retrieve statistics section from the navbar **/
    cy.redirectionStatistics()
  })
})
