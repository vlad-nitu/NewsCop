/* global test, expect */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavbarComponent from '../navbar'
import { BrowserRouter } from 'react-router-dom'

test('get navbar name', () => {
  const name = 'NewsCop'
  render(<NavbarComponent name={name} mainPage />)
  const linkElement = screen.getByText('NewsCop')
  expect(linkElement).toBeInTheDocument()
})

// Mock `window.scrollTo() behavior
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})

describe('NavbarComponent', () => {
  test('renders the navbar with links', () => {
    const name = 'My Website'
    render(
      <BrowserRouter>
        <NavbarComponent name={name} mainPage={false} />
      </BrowserRouter>
    )

    const homeLink = screen.getByText(name)
    const aboutLink = screen.getByText('About us')
    const servicesLink = screen.getByText('Services')
    const statisticsLink = screen.getByText('Statistics')
    const contactLink = screen.getByText('Contact')
    const helpLink = screen.getByText('Help')
    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(servicesLink).toBeInTheDocument()
    expect(statisticsLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()
    expect(helpLink).toBeInTheDocument()
  })

  test('navigates to "About us" section when "About us" link is clicked from navbar', () => {
    render(
      <BrowserRouter>
        <NavbarComponent name='My Website' mainPage={false} />
      </BrowserRouter>
    )

    const aboutUsLink = screen.getByText('About us')
    expect(aboutUsLink).toBeInTheDocument()

    fireEvent.click(aboutUsLink)

    expect(aboutUsLink.getAttribute('href')).toBe('/#ourMission')
  })

  test('navigates to "Statistics" section when "Statistics" link is clicked from navbar', () => {
    render(
      <BrowserRouter>
        <NavbarComponent name='My Website' mainPage={false} />
      </BrowserRouter>
    )

    const statisticsLink = screen.getByText('Statistics')
    expect(statisticsLink).toBeInTheDocument()

    fireEvent.click(statisticsLink)

    expect(statisticsLink.getAttribute('href')).toBe('/#statistics')
  })

  test('shows dropdown menu when hovering over "Services" option', () => {
    render(
      <BrowserRouter>
        <NavbarComponent name='My Website' mainPage={false} />
      </BrowserRouter>
    )
    const servicesLink = screen.getByText('Services')
    /* Find the hidden dropdown menu */
    const dropdownMenu = screen.getByTestId('navbar', { hidden: true })
    fireEvent.mouseEnter(servicesLink)
    fireEvent.mouseLeave(servicesLink)
    expect(dropdownMenu).toBeVisible()
  })
})
