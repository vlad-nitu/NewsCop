describe('test template', () => {

  const rootUrl = 'http://localhost:3000'

  beforeEach(() => {

    /* We have to first visit the wanted URL before each test is run */
    cy.visit(`${rootUrl}/checkText`)
  })

  it('components render correctly', () => {

    /* The navbar is rendered and has the right name */
    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .should('contain', 'NewsCop')

    /* Verify that the BodyCheckGeneric component is rendered with the correct description */
    cy.get('[data-testid="body-check-generic"]')
      .should('exist')
      .should('contain', 'News overlap checker') // First description
      .should('contain', 'Our tool detects overlap in your news article.') // Second Description

    /* Verify that the text area + the text above it are rendered correctly */
    cy.get('[data-testid="textAreaCheckOneText"]')
      .should('exist')
      .should('have.attr', 'placeholder', 'Enter your article here') // Placeholder value
      .should('have.value', '') // No text in the box currently
      .type('Example Test') // Write something in the box
      .should('have.value', 'Example Test') // See the text in the box changing

    /* The text above the box */
    cy.contains('h2', 'Enter the article’s content to check for overlap').should('exist');



  })
})

