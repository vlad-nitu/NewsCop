import "../../support/commands";

describe('Home Page testing flow', () => {

    const HOST = 'http://localhost:3000'

    beforeEach(() => {
        cy.visit(`${HOST}/`)
    })

    it('Check if all content is displayed', () => {
        // check if NavbarComponent is visible
        cy.get('[data-testid="navbar-component"]').should('be.visible')
        // check if MainPageBigImage is visible
        cy.get('[data-testid="mainPageBigImage"]').should('be.visible')
        // check if Mission is visible
        cy.get('[data-testid="ourMission"]').should('be.visible')
        // check if Services is visible
        cy.get('[data-testid="services"]').should('be.visible')
        // check if Statistics is visible
        cy.get('[data-testid="statistics"]').should('be.visible')
        // check if Map is visible
        cy.get('[data-testid="map"]').should('be.visible')
        // check if Footer is visible
        cy.get('[data-testid="footer"]').should('be.visible')
    })
})

describe('Navbar tests', () => {
    const HOST = 'http://localhost:3000'

    beforeEach(() => {
        cy.visit(`${HOST}/`)
    })

    it('should navigate to the Statistics section', () => {
        cy.get('[href="#statistics"]').click()
        cy.get('#statistics').should('be.visible')
    })

    it('should navigate to the Help page', () => {
        cy.get('[href="/help"]').eq(0).click() // Use eq(0) to select the first matching element
        cy.url().should('eq', `${HOST}` + '/help')
    })
});

describe('Main page Image tests', () => {
    const HOST = 'http://localhost:3000'

    const description = 'NewsCop is a news article overlap detection platform that helps businesses stay on top of competitors\' news coverage. Our service quickly checks for duplicated stories, allowing you to spot trends and identify opportunities to maximize coverage. With NewsCop, you\'ll never miss a story.'
    const projectName = 'News article overlap'
    const imageUrl = 'http://localhost:3000/background_image.png'

    beforeEach(() => {
        cy.visit(`${HOST}/`)
    })

    it('should display the project name and description', () => {
        cy.get('[data-testid="mainPageBigImage"]')
            .find('.title_main_page')
            .should('contain', projectName)

        cy.get('[data-testid="mainPageBigImage"]')
            .find('.description-paragraph-main-page')
            .should('contain', description)
    })

    it('should display the background image', () => {
        cy.get('#background-image')
            .should('have.css', 'background-image')
            .and('eq', `url("${imageUrl}")`)
    })

});

describe('Mission tests', () => {
    const HOST = 'http://localhost:3000'

    const description = 'Creating a platform that provides various ways of comparing news articles, helping users to identify overlapping content quickly and accurately and, consequently, decreasing the impact of misinformation and bias in the media.'
    const image = './ourMissionImage.png'

    beforeEach(() => {
        cy.visit(`${HOST}/`)
    })

    it('should display the mission image', () => {
        cy.get('#missionImage').should('have.attr', 'src', image)
    })
    
    it('should display the mission description', () => {
        cy.get('[data-testid="ourMission"]')
            .find('.description-paragraph')
            .should('contain', description)
    })
    
    it('should have a black title for the mission', () => {
        cy.get('[data-testid="ourMission"]')
            .find('.title')
            .should('have.css', 'color', 'rgb(0, 0, 0)')
    })

});

