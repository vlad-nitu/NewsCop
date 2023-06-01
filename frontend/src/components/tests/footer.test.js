import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Footer from '../footer'
import { MemoryRouter } from 'react-router'

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})

describe('Footer', () => {
  test('renders the footer component with correct content and styles', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    /* Check if the social section is rendered */
    expect(screen.getByText('Get connected with us on social networks:')).toBeInTheDocument()

    /* Check if the social links are rendered */
    expect(screen.getByTestId('Facebook')).toBeInTheDocument()
    expect(screen.getByTestId('Twitter')).toBeInTheDocument()
    expect(screen.getByTestId('Google')).toBeInTheDocument()
    expect(screen.getByTestId('Instagram')).toBeInTheDocument()
    expect(screen.getByTestId('LinkedIn')).toBeInTheDocument()

    /* Check if the main footer section is rendered */
    expect(screen.getByText('NewsCop')).toBeInTheDocument()
    expect(screen.getByTestId('FooterText')).toBeInTheDocument()

    /* Check if the services links are rendered */
    expect(screen.getByTestId('URLPlag')).toBeInTheDocument()
    expect(screen.getByTestId('TextPlag')).toBeInTheDocument()
    expect(screen.getByTestId('URLSim')).toBeInTheDocument()
    expect(screen.getByTestId('TextSim')).toBeInTheDocument()

    /* Check if the contact information is rendered */
    expect(screen.getByText('info@getsourcer.com')).toBeInTheDocument()

    /* Check if the copyright section is rendered */
    expect(screen.getByText('2023 © NewsCop')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('TextPlag'))
    expect(window.scrollX).toBe(0)
    expect(window.scrollY).toBe(0)
  })
})
