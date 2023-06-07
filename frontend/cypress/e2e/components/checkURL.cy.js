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
      .should('contain', 'News overlap checker') // First description
      .should('contain', 'Our tool detects overlap in your news article.') // Second Description


    /* Verify that the URL textbox area + the text above it are rendered correctly */
    cy.get('#formUrl')
      .should('exist')
      .should('have.attr', 'placeholder', 'Article\'s URL') // Placeholder value
      .should('have.value', '') // No URL in the box currently
      .type('https://example.com') // Write test URL
      .should('have.value', 'https://example.com') // See the URL in the box changing

    /* The text above the box */
    cy.contains('h2', 'Enter the article\'s URL to check for overlap').should('exist');

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

  it('Buton disabled before inputting URL and enabled afterward', () => {

    /* Button is rendered correctly but is disabled */
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      .and('be.disabled')

    /* Verify that the URL textbox area + the text above it are rendered correctly */
    cy.get('#formUrl')
      .should('exist')
      .should('have.value', '') // No URL in the box currently
      .type('invalid_url') // Write test URL
      .should('have.value', 'invalid_url') // See the URL in the box changing
      .wait(1000) // Wait 1s to make sure button gets enabled

    /* Check that the submit button is rendered and is not disabled*/
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      // The button should not be disabled because there is text already in the box
      .and('not.be.disabled')
      .should('have.text', 'Submit')
      .click()

    /* The error-prompt exists and is visible */
    cy.get('#forErrorPrompt')
      .should('exist')
      .and('be.visible')
      .should('have.text', 'You entered an invalid URL!')

    /* The button is temporarily disabled */
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      .and('be.disabled')
      .wait(10000) // TODO: discuss if we keep using this type of assertion as it slows down this test by 10s
      .should('be.enabled')

    /* The error-prompt is not rendered after timeout anymore*/

    cy.get('#forErrorPrompt')
      .should('not.exist')
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

