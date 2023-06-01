import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../Home'

describe('Home', () => {
  test('renders the prompt text', () => {
    const applicationName = 'Test test1'
    const applicationDescription = 'Test test2'
    const ourMission = 'Test test3'
    const serviceDescription = 'NewsCop provides users with a way of checking the text of a news article against a large database of articles for fast and accurate overlap detection.'
    const footerText = 'info@getsourcer.com'
    render(
      <MemoryRouter>
        <Home
          applicationName={applicationName} applicationDescription={applicationDescription}
          ourMission={ourMission}
        />
      </MemoryRouter>
    )

    // Check if the navbar is present
    const navbarElem = screen.getByText(applicationName)
    expect(navbarElem).toBeInTheDocument()

    // Check if the main page big image is present
    const mainPageBigImage = screen.getByText(applicationDescription)
    expect(mainPageBigImage).toBeInTheDocument()

    // Check if the mission element is present
    const missionElement = screen.getByText(ourMission)
    expect(missionElement).toBeInTheDocument()

    // Check if the services section is present
    const serviceSection = screen.getByText(serviceDescription)
    expect(serviceSection).toBeInTheDocument()

    // Check if the map element is present
    // const mapElement = screen.getByText(mapText)
    // expect(mapElement).toBeInTheDocument()

    // Check if the footer element is present
    const footerElement = screen.getByText(footerText)
    expect(footerElement).toBeInTheDocument()
  })
})
