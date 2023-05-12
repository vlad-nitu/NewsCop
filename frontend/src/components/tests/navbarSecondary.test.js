import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavbarComponent from '../navbarSecondary'

// Mock `window.scrollTo() behavior
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})

describe('NavbarComponent', () => {
  test('renders the navbar with links', () => {
    const name = 'My Website'
    render(<NavbarComponent name={name} />)
    const homeLink = screen.getByText(name)
    const aboutLink = screen.getByText('About us')
    const servicesLink = screen.getByText('Services')
    const contactLink = screen.getByText('Contact')
    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
    expect(servicesLink).toBeInTheDocument()
    expect(contactLink).toBeInTheDocument()

    fireEvent.click(contactLink)
    expect(window.scrollX).toBe(0)
    expect(window.scrollY).toBe(0)
  })
})
