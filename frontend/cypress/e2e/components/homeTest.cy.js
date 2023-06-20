import "../../support/commands";

const HOST = 'http://localhost:3000'

describe('Home Page testing flow', () => {
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

    it('should contain the SVG arrow element', () => {
      cy.get('[data-testid="mainPageBigImage"]')
        .find('.arrow')
        .should('exist');
  
      cy.get('[data-testid="mainPageBigImage"]')
        .find('.a1')
        .should('exist');
  
      cy.get('[data-testid="mainPageBigImage"]')
        .find('.a2')
        .should('exist');
  
      cy.get('[data-testid="mainPageBigImage"]')
        .find('.a3')
        .should('exist');
    });

    it('should have a link to #ourMission', () => {
      cy.get('[data-testid="mainPageBigImage"]')
        .find('a')
        .should('have.attr', 'href', '#ourMission');
    });

});

describe('Mission tests', () => {
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

describe('Services tests', () => {
    const titles = ['URL similarity checker', 'Text similarity checker', 'Similarity checker for two texts', 'Similarity checker for two URLs']
    const descriptions = ['NewsCop provides users with a way of checking the URL of a news article against a large database of articles for fast and accurate overlap detection.',
        'NewsCop provides users with a way of checking the text of a news article against a large database of articles for fast and accurate overlap detection.', 'Test the similarity between two news articles by using this powerful tool which enables you to compare two paragraphs of media content.',
        'Test the similarity between two news articles by using this powerful tool which enables you to input two URLs of media content and see the likeness of the two.']
    const images = ['service1.jpeg', 'service2.webp', 'service3.jpeg', 'service4.jpeg']

    const endpoints = ['/checkURL', '/checkText', '/compareTexts', '/compareURLs']

    beforeEach(() => {
        cy.visit(`${HOST}/`)
    })

    it('should display the correct number of service cards', () => {
        cy.get('[data-testid="services"]')
          .find('.custom-services-card')
          .should('have.length', titles.length)
      })
    
      it('should display the correct title, description, and image for each service card', () => {
        cy.get('[data-testid="services"]')
          .find('.custom-services-card')
          .each(($card, index) => {
            cy.wrap($card)
              .find('.font-weight-bold')
              .should('contain', titles[index])
    
            cy.wrap($card)
              .find('.text-light')
              .should('contain', descriptions[index])
    
            cy.wrap($card)
              .find('.custom-services-card-image')
              .should('have.attr', 'src', images[index])
          })
      })
    
      it('should have "Try it" buttons with correct links', () => {
        cy.get('[data-testid="services"]')
          .find('a')
          .each(($link, index) => {
            cy.wrap($link)
              .should('have.attr', 'href', endpoints[index])
          })
      })
    
      it('should scroll to the top when "Try it" button is clicked', () => {
        cy.get('[data-testid="services"]')
          .find('a')
          .first()
          .click()

        cy.wait(1000)
    
        cy.window().then((win) => {
          expect(win.scrollY).to.equal(0)
        })
      })
});

describe('Statistics tests', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:8000/retrieveStatistics/').as('getStatistics');
    });
    
      it('should render three statistics cards', () => {
        cy.visit(`${HOST}/`);
    
        cy.wait('@getStatistics').its('response.statusCode').should('eq', 200); // Wait for the API request to complete
    
        cy.get('[data-testid^="card"]').should('have.length', 3); // Check if three cards are rendered
      });
    
      it('should display the correct titles and descriptions', () => {
        cy.visit(`${HOST}/`);
      
        cy.wait('@getStatistics').then(({ response }) => {
          const statistics = response.body;
      
          cy.get('[data-testid^="card"]').each(($card, index) => {
            const title = cy.wrap($card).find('.fw-bold.fs-4.m-0');
            const description = cy.wrap($card).find('.card-text');
      
            if (index === 0) {
              if (statistics.stored_articles !== 1) {
                title.contains(`${statistics.stored_articles} articles`);
                description.contains('are stored in the database');
              } else {
                title.contains(`${statistics.stored_articles} article`);
                description.contains('is stored in the database');
              }
            } else if (index === 1) {
              if (statistics.users !== 1) {
                title.contains(`${statistics.users} users`);
                description.contains('have used the application');
              } else {
                title.contains(`${statistics.users} user`);
                description.contains('has used the application');
              }
            } else if (index === 2) {
              if (statistics.performed_queries !== 1) {
                title.contains(`${statistics.performed_queries} articles`);
                description.contains('have been checked for overlapping');
              } else {
                title.contains(`${statistics.performed_queries} article`);
                description.contains('has been checked for overlapping');
              }
            }
          });
        });
      });
    
      it('should display the correct number of articles for each threshold', () => {
        cy.visit(`${HOST}/`)
    
        cy.wait('@getStatistics');
        
        cy.get('@getStatistics').then(({ response }) => {
            const statistic = response.body;
            cy.get('[data-testid^="bar"]').each(($bar, index) => {
                // Get the number of articles for each bar
                const number_of_articles = cy.wrap($bar).find('.text-white.fw-normal.fs-6.pt-2.text-center.m-0');
                number_of_articles.contains(statistic.similarities_retrieved[index]);
            });
        });
      });
})

describe('Map tests', () => {
    beforeEach(() => {
        cy.visit(`${HOST}/`);
    });

    it('should display the marker on the specified location', () => {
        cy.get('.leaflet-marker-icon').should('exist');
        cy.get('.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive').should('exist');
        // cypress click on the above element
        cy.get('.leaflet-marker-icon.leaflet-zoom-animated.leaflet-interactive').click();
        cy.get('.leaflet-popup-content')
          .should('exist')
          .should('contain.text', 'Van Mourik Broekmanweg 5, 2628 XE Delft');
      });
});

describe('Footer tests', () => {
    beforeEach(() => {
        cy.visit(`${HOST}/`);
    });
  
    it('should display social network links', () => {
      cy.get('[data-testid="Facebook"]').should('exist');
      cy.get('[data-testid="Twitter"]').should('exist');
      cy.get('[data-testid="Google"]').should('exist');
      cy.get('[data-testid="Instagram"]').should('exist');
      cy.get('[data-testid="LinkedIn"]').should('exist');
    });
  
    it('should navigate to URL similarity checker on link click', () => {
      cy.get('[data-testid="URLPlag"]').click();
      cy.url().should('include', '/checkURL');
    });
  
    it('should navigate to Text similarity checker on link click', () => {
      cy.get('[data-testid="TextPlag"]').click();
      cy.url().should('include', '/checkText');
    });
  
    it('should navigate to Similarity checker for two texts on link click', () => {
      cy.get('[data-testid="TextSim"]').click();
      cy.url().should('include', '/compareTexts');
    });
  
    it('should navigate to Similarity checker for two URLs on link click', () => {
      cy.get('[data-testid="URLSim"]').click();
      cy.url().should('include', '/compareURLs');
    });
  
    it('should display contact information', () => {
      cy.contains('info@getsourcer.com').should('exist');
    });
  
    it('should navigate to FAQs on help link click', () => {
      cy.get('[data-testid="helpLink"]').click();
      cy.url().should('include', '/help');
    });
  });

