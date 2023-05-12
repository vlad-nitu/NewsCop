import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from '../footer'

describe('Footer', () => {
  test('renders the footer component with correct content and styles', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
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
  })
})
