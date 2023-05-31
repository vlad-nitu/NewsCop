import React from 'react'
import { render, screen } from '@testing-library/react'
import Map from '../map'

const { describe } = require('jest')

describe('Map', () => {
  test('renders the map component with correct content and styles', () => {
    render(<Map />)

    /* Check if the map background image is rendered */
    const backgroundElement = screen.getByTestId('backgroundStyle')
    expect(backgroundElement).toBeInTheDocument()
    expect(backgroundElement).toHaveStyle('backgroundImage: url(./map.png)')
    expect(backgroundElement).toHaveStyle('backgroundSize: cover')
    expect(backgroundElement).toHaveStyle('backgroundPosition: center')

    /* Check if the location text is rendered */
    const locationElement = screen.getByText('Van Mourik Broekmanweg 5, 2628 XE Delft')
    expect(locationElement).toBeInTheDocument()

    /* Check if the location text container has the correct styles */
    const containerElement = locationElement.parentElement
    expect(containerElement).toHaveStyle('position: absolute')
    expect(containerElement).toHaveStyle('left: 100px')
    expect(containerElement).toHaveStyle('top: 50%')
    expect(containerElement).toHaveStyle('transform: translateY(-50%)')
    expect(containerElement).toHaveStyle('backgroundColor: #fff')
    expect(containerElement).toHaveStyle('padding: 10px')
    expect(containerElement).toHaveStyle('boxShadow: 0 0 10px rgba(0,0,0,0.3)')
  })
})
