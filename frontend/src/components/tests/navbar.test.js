/* global test, expect */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NavbarComponent from '../navbar'

const { jest, describe } = require('jest')

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
    render(<NavbarComponent name={name} mainPage={false} />)
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

  test('scrolls to top when "About us" link is clicked', () => {
    render(<NavbarComponent name='My Website' mainPage={false} />)
    const aboutUsLink = screen.getByText('About us')
    expect(aboutUsLink).toBeInTheDocument()
    window.scrollTo = jest.fn() // Mock scrollTo function
    fireEvent.click(aboutUsLink)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })

  test('shows dropdown menu when hovering over "Services" option', () => {
    render(<NavbarComponent name='My Website' mainPage={false} />)
    const servicesLink = screen.getByText('Services')
    /* Find the hidden dropdown menu */
    const dropdownMenu = screen.getByTestId('navbar', { hidden: true })
    fireEvent.mouseEnter(servicesLink)
    fireEvent.mouseLeave(servicesLink)
    expect(dropdownMenu).toBeVisible()
  })
})
