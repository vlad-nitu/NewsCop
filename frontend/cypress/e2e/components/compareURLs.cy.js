import "../../support/commands";

describe('CheckTwoURLs testing flow', () => {

    const HOST = 'http://frntnd-01d860a10e63.herokuapp.com'

    beforeEach(() => {
        cy.visit(`${HOST}/compareURLs/`)
    })

    it('Verify correct rendering of components', () => {
        // Check rendering of NavbarComponent component
        cy.get('[data-testid="navbar-component"]')
            .should('exist')
            .should('contain', 'NewsCop')

        // Check rendering of BodyCheckGeneric component
        cy.get('[data-testid="body-check-generic"]')
            .should('exist')
            .should('contain', 'News overlap checker') // First description
            .should('contain', 'Our similarity checker determines the similarity level between the content of two news URLs.') // Second Description


        // Check rendering of text boxes in EnterTwoURLs
        cy.get('#left_url')
            .should('exist')
            .should('have.attr', 'placeholder', 'Enter the original URL') // Placeholder value
            .should('have.value', '') // No URL in the box currently

        cy.get('#right_url')
            .should('exist')
            .should('have.attr', 'placeholder', 'Enter the changed URL') // Placeholder value
            .should('have.value', '') // No URL in the box currently

        // Check rendering of text box above the input fields
        cy.contains('h2', 'Enter the article\'s URLs to check for similarity').should('exist');

        // EnterTwoURLs component interaction
        cy.get('[data-testid="enter-two-urls"]')
            .should('exist')
            .within(() => {
                // Type a URL in the left input field
                cy.get('#left_url').type('https://example.com')

                // Type a URL in the right input field
                cy.get('#right_url').type('https://example.com')

                // Click submit button
                cy.get('button').click()
            })

        // Check rendering of Footer component
        cy.get('#footer')
            .should('exist')
    })

    it('Button disabled before entering both URLs and enabled afterwards', () => {

        // Check rendering and state of button
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            .and('be.disabled')

        // Check rendering of left url
        cy.get('#left_url')
            .should('exist')
            .should('have.value', '') // No URL in the box currently
            .type('invalid') // Write test URL
            .should('have.value', 'invalid') // See the URL in the left box changing

        // Check that submit button is still disabled
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            .and('be.disabled')

        // Check rendering of left url
        cy.get('#right_url')
            .should('exist')
            .should('have.value', '') // No URL in the box currently
            .type('invalid') // Write test URL
            .should('have.value', 'invalid') // See the URL in the right box changing

        // Check that submit button is now enabled
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            // The button should not be disabled because there is text already in the box
            .and('not.be.disabled')
            .should('have.text', 'Submit')
            .click()

        // Check that the error-prompt exists and is visible
        cy.get('[data-testid="output-prompt"]')
            .should('exist')
            .and('be.visible')
            .should('have.text', 'Please provide a valid input!')

        // Check that the button is temporarily disabled for 5s (due to timeout)
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            .and('be.disabled')
            .wait(6000)
            .should('be.enabled')

        // Check that the error-prompt disappears after timeout

        cy.get('#forErrorPrompt')
            .should('not.exist')
    })

    it('Check behaviour for correct input', () => {
        // Check rendering and state of button
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            .and('be.disabled')

        let left = 'https://www.digisport.ro/special/gino-iorgulescu-internat-de-urgenta-in-spital-care-e-starea-de-sanatate-a-presedintelui-lpf-2411135'
        let right = 'https://www.digisport.ro/fotbal/liga-1/marius-sumudica-ii-naruie-sperantele-lui-gigi-becali-3-echipe-i-au-oferit-mai-mult-lui-djokovic-una-e-din-superliga-2433349'

        // Check rendering of left url
        cy.get('#left_url')
            .should('exist')
            .should('have.value', '') // No URL in the box currently
            .type(left) // Write test URL
            .should('have.value', left) // See the URL in the left box changing

        // Check that submit button is still disabled
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            .and('be.disabled')

        // Check rendering of left url
        cy.get('#right_url')
            .should('exist')
            .should('have.value', '') // No URL in the box currently
            .type(right) // Write test URL
            .should('have.value', right) // See the URL in the right box changing

        // Check that submit button is now enabled
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            // The button should not be disabled because there is text already in the box
            .and('not.be.disabled')
            .should('have.text', 'Submit')
            .click()

        // Check that the prompt exists and is visible
        cy.get('[data-testid="output-prompt"]')
            .should('exist')
            .and('be.visible')


        // Check that the progress bar exists and is visible
        cy.get('[data-testid="progress-bar"]')
            .should('exist')
            .and('be.visible')


        // Check that the button is temporarily disabled for 5s (due to timeout)
        cy.get('[data-testid="submit_button"]')
            .should('exist')
            .and('be.disabled')
            .wait(6000)
            .should('be.enabled')

        // Check that the view-side-by-side button is enabled
        cy.get('[data-testid="side-by-side"]')
            .should('exist')
            .and('be.visible')
            .click()

        // Check that the URL remains the same
        cy.url()
            .should(
                'be.equal',
                `${HOST}/compareURLs/`)

        // Check that the view-side-by-side works (modal shown)
        cy.get('[data-testid="render-two"]')
            .should('exist')
            .and('be.visible')

        // Check that the Go back button is enabled
        cy.get('[data-testid="go-back"]')
            .should('exist')
            .and('be.visible')
            .click()


        // Check that we are again on the check urls page containing the answer prompt
        cy.get('[data-testid="output-prompt"]')
            .should('exist')
            .and('be.visible')
    })



    it('Test redirect to checkTwoTexts', () => {

        cy.get('[data-testid="forward-to-page"]')
            .should('exist')
            .click()

        cy.url()
            .should(
                'be.equal',
                `${HOST}/compareTexts`)
    })

    const redirectionOptions = [
        { href: '/checkURL', text: 'URL Similarity Checker' },
        { href: '/checkText', text: 'Text Similarity Checker' },
        { href: '/compareTexts', text: 'Similarity Checker for two Texts' },
        { href: '/compareURLs', text: 'Similarity Checker for two URLs' },
    ]

    redirectionOptions.forEach((option) => {
        it(`Test redirect to ${option.href} from NavBar component`, () => {

            cy.get('#nav-dropdown')
                .should('exist')
                .trigger('mouseover')
                .get(`a[role="option"][href="${option.href}"]`)
                .as('link')
                .click()

            cy.url()
                .should(
                    'be.equal',
                    `${HOST}${option.href}`)
        })
    })

    const footerLinks = [
        { testId: 'URLPlag', text: 'URL similarity checker', url: '/checkURL' },
        { testId: 'TextPlag', text: 'Text similarity checker', url: '/checkText' },
        { testId: 'TextSim', text: 'Similarity checker for two texts', url: '/compareTexts' },
        { testId: 'URLSim', text: 'Similarity checker for two URLs', url: '/compareURLs' },
    ]

    footerLinks.forEach((link) => {
        it(`Test redirect to ${link.text} from Footer component`, () => {

            cy.scrollTo('bottom')
            cy.get(`[data-testid="${link.testId}"]`)
                .click()


            cy.url()
                .should(
                    'be.equal',
                    `${HOST}${link.url}`)

        })
    })

    it('Test redirect to About us from NavBar component', () => {

        cy.get('[data-testid="navbar-component"]')
            .should('exist')
            .get('a[href*="/#ourMission"]')
            .click()

        cy.url()
            .should(
                'be.equal',
                `${HOST}/#ourMission`)

    })

    it('Test redirect to Contact Us from NavBar component', () => {

        cy.get('[data-testid="navbar-component"]')
            .should('exist')
            .get('a[href="#footer"]') // "Contact" should scroll you down to the Footer component on the same page
            .contains('Contact')
            .click()
            .wait(1000) // Wait 1s so that Cypress has time to process / execute the scroll

        cy.url()
            .should(
                'be.equal',
                `${HOST}/compareURLs/#footer`)

        cy.isInViewport('#footer') // Assert that it has scrolled down (if it was not already visible) to Footer component

    })

    it('Test redirect to Help page from NavBar component', () => {
        cy.get('[data-testid="navbar-component"]')
            .should('exist')
            .get('a[href="/help"]').contains('Help')
            .click()
        cy.url()
            .should(
                'be.equal',
                `${HOST}/help`)
    })

  it('Redirection to statistics through navbar', () => {
    cy.redirectionStatistics()
  })
})

