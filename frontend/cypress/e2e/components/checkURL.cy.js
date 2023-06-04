describe('template spec & clicking a button after inputting some text', () => {

  const HOST = 'http://localhost:3000' // TODO: put the actual URL after we deploy our app on Heroku

  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(`${HOST}/checkURL`)
  })

  it('Basic rendering tests', () => {
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
  it('Being redirected to checkText', () => {

    cy.get('[data-testid="forward-to-page"]')
      .should('exist')
      .click()

    cy.url()
      .should(
        'be.equal',
        `${HOST}/checkText`)
  })
  it('Redirected using Services feature from Navbar', () => {

    cy.get('#nav-dropdown')
      .should('exist')
      .trigger('mouseover')
      .get('a[href*="/compareURL"]')
      .click()

    cy.url()
      .should(
        'be.equal',
        `${HOST}/compareURLs`)
  })

  it('Redirected using Services feature from Footer', () => {

    cy.scrollTo('bottom')
    cy.get('[data-testid="TextSim')
      .click()


    cy.url()
      .should(
        'be.equal',
        `${HOST}/compareTexts`)

  })

  it('Press About Us from navbar', () => {

    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .get('a[href*="/#ourMission"]')
      .click()

    cy.url()
      .should(
        'be.equal',
        `${HOST}/#ourMission`)

  })

  it('Press Contact Us from navbar', () => {

    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .get('a[href="#footer"]') // "Contact" should scroll you down to the Footer component on the same page
      .contains('Contact')
      .click()
      .wait(1000) // Wait 1s so that Cypress has time to process / execute the scroll

    cy.url()
      .should(
        'be.equal',
        `${HOST}/checkURL#footer`)

    cy.isInViewport('#footer') // Assert that it has scrolled down (if it was not already visible) to Footer component

  })
})

