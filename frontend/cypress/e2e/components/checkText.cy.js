import "../../support/commands";

describe('tests for several interactions within check text', () => {

  const rootUrl = 'http://localhost:3000'

  beforeEach(() => {

    /* We have to first visit the wanted URL before each test is run */
    cy.visit(`${rootUrl}/checkText`)
  })

  it('Components rendered correctly and small interactions', () => {

    /* The navbar is rendered and has the right name */
    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .should('contain', 'NewsCop')

    /* Verify that the BodyCheckGeneric component is rendered with the correct description */
    cy.get('[data-testid="body-check-generic"]')
      .should('exist')
      .should('contain', 'News overlap checker') // First description
      .should('contain', 'Our tool detects overlap in your news article.') // Second Description

    /* Button is rendered correctly but is disabled */
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      .and('be.disabled')

    /* Verify that the text area + the text above it are rendered correctly */
    cy.get('[data-testid="textAreaCheckOneText"]')
      .should('exist')
      .should('have.attr', 'placeholder', 'Enter your article here') // Placeholder value
      .should('have.value', '') // No text in the box currently
      .type('藝文類聚卷五文字更正在梁思成先生作品提到的古建筑的「角叶」的含义及其图片') // Write something in the box
      .should('have.value', '藝文類聚卷五文字更正在梁思成先生作品提到的古建筑的「角叶」的含义及其图片') // See the text in the box changing

    /* The text above the box */
    cy.contains('h2', 'Enter the article’s content to check for overlap').should('exist')

    /* The error-prompt does not exist */
    cy.get('[data-testid="error-prompt"]')
      .should('not.exist')

    /* Check that the submit button is rendered and is not disabled*/
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      // The button should not be disabled because there is text already in the box
      .and('not.be.disabled')
      .should('have.text', 'Submit')
      .click()
        .wait(10000)

    /* The error-prompt exists and is visible */
    cy.get('[data-testid="error-prompt"]')
      .should('exist')
      .and('be.visible')
      .should('have.text', 'Our system has not found no match for the news content you provided!')

    /* The button is temporarily disabled */
    cy.get('[data-testid="submit_button"]')
      .should('exist')
      .and('be.disabled')
      .wait(10000)
      .should('be.enabled')

    /* The error-prompt does not exist after timeout */
    cy.get('[data-testid="error-prompt"]')
      .should('not.exist')

    /* The footer is rendered correctly */
    cy.get('#footer')
      .should('exist')

    /* The loading circle should not exist */
    cy.get('[data-testid="loading-circle"]')
      .should('not.exist')

    /* The forward to page should exist */
    cy.get('[data-testid="forward-to-page"]')
      .should('exist')
      .should('have.text', '... or you may want to check a news article via an URL for similarity')

    /* The check decision should not be visible */
    cy.get('[data-testid="check-decision"]')
      .should('exist')
      .should('not.be.visible')
  })

  it('Redirect to checkURL page', () => {
    /* The forward to page should exist and small interaction */
    cy.get('[data-testid="forward-to-link"]')
      .should('exist')
      .click()
    cy.url()
      .should('be.equal', `${rootUrl}/checkURL`)
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
        `${rootUrl}/checkText#footer`)
    cy.isInViewport('#footer')
  })

  it('Redirection to help page through navbar', () => {
     /** Retrieve Help page from the navbar **/
    cy.get('[data-testid="navbar-component"]')
      .should('exist')
      .get('a[href="/help"]').contains('Help')
      .click()
    cy.url()
      .should(
        'be.equal',
        `${rootUrl}/help`)
  })

  it('Redirection to statistics through navbar', () => {
    cy.redirectionStatistics()
  })
})



