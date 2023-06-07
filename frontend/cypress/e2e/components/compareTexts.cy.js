describe('tests for several interactions within compare texts', () => {

  const rootUrl = 'http://localhost:3000'

  beforeEach(() => {

    /* We have to first visit the wanted URL before each test is run */
    cy.visit(`${rootUrl}/compareTexts`)
  })

  it('Test components', () => {

    /* The navbar is rendered and has the right name */
    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .should('contain', 'NewsCop')

    /* Verify that the BodyCheckGeneric component is rendered with the correct description */
    cy.get('[data-testid="body-check-generic"]')
      .should('exist')
      .should('contain', 'News overlap checker') // First description
      .should('contain', 'Our similarity checker determines the similarity levels between ' +
          'two text paragraphs.') // Second Description

    /* Button is rendered correctly but is disabled */
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      .and('be.disabled')

    /* Verify that the text area + the text above it are rendered correctly */
    cy.get('[data-testid="textAreaCompareTexts"]').eq(0)
      .should('exist')
      .should('have.attr', 'placeholder', 'Enter your first article here') // Placeholder value
      .should('have.value', '') // No text in the box currently
      .type('This is some text to be checked for overlapping.') // Write something in the box
      .should('have.value', 'This is some text to be checked for overlapping.') // See the text in the box changing

    /* Button is rendered correctly but is disabled when only one text box is filled*/
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      .and('be.disabled')

    /* Verify that the text areas + the text above it are rendered correctly */
    cy.get('[data-testid="textAreaCompareTexts"]').eq(1)
      .should('exist')
      .should('have.attr', 'placeholder', 'Enter your second article here') // Placeholder value
      .should('have.value', '') // No text in the box currently
      .type('This is another text to be checked for overlapping.') // Write something in the box
      .should('have.value', 'This is another text to be checked for overlapping.') // See the text in the box changing

    /* The text above the first box */
    cy.contains('h2', 'Enter the original content').should('exist')
    /* The text above the first box */

    cy.contains('h2', 'Enter the changed content').should('exist')

    /* Check that the submit button is rendered and is not disabled*/
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      // The button should not be disabled because there is text already in the box
      .and('not.be.disabled')
      .should('have.text', 'Submit')
      .click()

    cy.contains('The two given texts have a similarity level of 40%.').should('be.visible');

    /* The button is temporarily disabled */
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      .and('be.disabled')
      .wait(4000)
      .should('be.enabled')

    /* The footer is rendered correctly */
    cy.get('#footer')
      .should('exist')

    /* The forward to page should exist */
    cy.get('[data-testid="forward-to-page"]')
      .should('exist')
      .should('have.text', '... or you may want to check the similarity of two news articles with their URLs')

    /* Check that progress bar is rendered */
    cy.get('[data-testid="progress-line-pointer"]').should('exist')
  })

    it('Redirect to compare URLs page', () => {
    /* The forward to page should exist and small interaction */
    cy.get('[data-testid="forward-to-link"]')
      .should('exist')
      .click()
    cy.url()
      .should('be.equal', `${rootUrl}/compareURLs`)
  })

  it('Redirect to home page', () => {
    /* The forward to page should exist and small interaction */
    cy.get('[data-testid="to-home-page"]') // Go to the home page
      .should('exist')
      .click()
      .wait(100) // Wait a moment until everything is rendered
    cy.url()
      .should('be.equal', `${rootUrl}/#home`) // We should now be in the homepage
  })

  const redirectionOptions = [
    { href: '/checkURL', text: 'URL Similarity Checker' },
    { href: '/checkText', text: 'Text Similarity Checker' },
    { href: '/compareTexts', text: 'Similarity Checker for two Texts' },
    { href: '/compareURLs', text: 'Similarity Checker for two URLs' },
  ]

  redirectionOptions.forEach((option) => {
    it(`Redirection via Navbar to ${option.href}`, () => {
      cy.get('#nav-dropdown')
        .should('exist')
        .trigger('mouseover')
        .get(`a[role="option"][href="${option.href}"]`)
        .as('link')
        .wait(1000)

      cy.get('@link')
        .should('exist')
        .should('contain', option.text)

      cy.get('@link')
        .should('exist')
        .click()

      cy.url().should('be.equal', `${rootUrl}${option.href}`)
    })
  })
1
  /* The information needed for all the footer redirections */
  const footerLinks = [
    { testId: 'URLPlag', text: 'URL similarity checker', url: '/checkURL' },
    { testId: 'TextPlag', text: 'Text similarity checker', url: '/checkText' },
    { testId: 'TextSim', text: 'Similarity checker for two texts', url: '/compareTexts' },
    { testId: 'URLSim', text: 'Similarity checker for two URLs', url: '/compareURLs' },
  ]

  footerLinks.forEach((link) => {
    it(`Redirects to ${link.text} via Footer`, () => {
      cy.get(`[data-testid="${link.testId}"]`)
        .should('exist')
        .should('contain', link.text)
        .click()
        .wait(100)

      cy.url().should('be.equal', `${rootUrl}${link.url}`)
    })
  })

  it('Redirection to main page through About Us', () => {
    /** Retrieve our mission component from the navbar **/
    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .get('a[href*="/#ourMission"]')
      .click()
    cy.url()
      .should(
        'be.equal',
        `${rootUrl}/#ourMission`)
  })

  it('Redirection to main page through Contact Us', () => {
    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .get('a[href="#footer"]')
      .contains('Contact')
      .click()
      .wait(500)
    /* The viewport should now be visible */
    cy.url()
      .should(
        'be.equal',
        `${rootUrl}/compareTexts#footer`)
    cy.isInViewport('#footer')
  })
})