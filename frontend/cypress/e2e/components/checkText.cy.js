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
      .should('have.value', 'Example Test') // See the text in the box changing

    /* The text above the box */
    cy.contains('h2', 'Enter the article’s content to check for overlap').should('exist');

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

  it('Redirection via Navbar to checkURL', () => {
    /* Retrieve navbar option of going to checkURL */
    cy.get('#nav-dropdown')
      .should('exist')
      .trigger('mouseover')
      .get('a[role="option"][href="/checkURL"]')
      .as('urlChecker')
      .wait(1000)
    /* The text content */
    cy.get('@urlChecker')
      .should('exist')
      .should('contain', 'URL Similarity Checker')
    /* Actually click it */
    cy.get('@urlChecker')
      .should('exist')
      .click()

    cy.url()
      .should('be.equal', `${rootUrl}/checkURL`) // We should be now in the checkURL page
  })

  it('Redirection via Navbar to checkText', () => {
    /* Retrieve navbar option of going to checkText */
    cy.get('#nav-dropdown')
      .should('exist')
      .trigger('mouseover').get('a[role="option"][href="/checkText"]')
      .as('textChecker')
    /* The text content */
    cy.get('@textChecker')
      .should('exist')
      .should('contain', 'Text Similarity Checker')
    /* Actually click it */
    cy.get('@textChecker')
      .should('exist')
      .click()

    cy.url()
      .should('be.equal', `${rootUrl}/checkText`) // We should stay in the checkText page
  })

  it('Redirection via Navbar to compareTexts', () => {
    /* Retrieve navbar option of going to compareTexts */
    cy.get('#nav-dropdown')
      .should('exist')
      .trigger('mouseover').get('a[role="option"][href="/compareTexts"]')
      .as('textsChecker')
    /* The text content */
    cy.get('@textsChecker')
      .should('exist')
      .should('contain', 'Similarity Checker for two Texts')
    /* Actually click it */
    cy.get('@textsChecker')
      .should('exist')
      .click()

    cy.url()
      .should('be.equal', `${rootUrl}/compareTexts`) // We should have moved to compare texts page
  })

  it('Redirection via Navbar to compareURLs', () => {
    /* Retrieve navbar option of going to compareURLs */
    cy.get('#nav-dropdown')
      .should('exist')
      .trigger('mouseover').get('a[role="option"][href="/compareURLs"]')
      .as('urlsChecker')
    /* The text content */
    cy.get('@urlsChecker')
      .should('exist')
      .should('contain', 'Similarity Checker for two URLs')
    /* Actually click it */
    cy.get('@urlsChecker')
      .should('exist')
      .click()

    cy.url()
      .should('be.equal', `${rootUrl}/compareURLs`) // We should have moved to compare URLs page
  })

  it('Redirect to check URL via Footer', () => {
    cy.get('[data-testid="URLPlag"]') // Retrieve the check URL link in the footer
      .should('exist')
      .should('contain', 'URL similarity checker')
      .click()
      .wait(100) // Wait a moment until everything is rendered
    cy.url()
      .should('be.equal', `${rootUrl}/checkURL`) // We should now be in the check URL page
  })

  it('Redirect to check text via Footer', () => {
    cy.get('[data-testid="TextPlag"]') // Retrieve the check text link in the footer
      .should('exist')
      .should('contain', 'Text similarity checker')
      .click()
      .wait(100) // Wait a moment until everything is rendered
    cy.url()
      .should('be.equal', `${rootUrl}/checkText`) // We should now be in the check text page
  })

  it('Redirect to compare texts via Footer', () => {
    cy.get('[data-testid="TextSim"]') // Retrieve the compare texts link in the footer
      .should('exist')
      .should('contain', 'Similarity checker for two texts')
      .click()
      .wait(100) // Wait a moment until everything is rendered
    cy.url()
      .should('be.equal', `${rootUrl}/compareTexts`) // We should now be in the compare texts page
  })

  it('Redirect to compare URLs via Footer', () => {
    cy.get('[data-testid="URLSim"]') // Retrieve the compare URLs link in the footer
      .should('exist')
      .should('contain', 'Similarity checker for two URLs')
      .click()
      .wait(100) // Wait a moment until everything is rendered
    cy.url()
      .should('be.equal', `${rootUrl}/compareURLs`) // We should now be in the compare URLs page
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

})

