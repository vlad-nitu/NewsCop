import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingCircle from '../LoadingCircle'
import '@testing-library/jest-dom/extend-expect';

describe('LoadingCircle', () => {
  test('renders the loading circle component', () => {
    render(<LoadingCircle />)

    /* Assert that the loading circle component is rendered */
    const loadingCircle = screen.getByRole('status')
    expect(loadingCircle).toBeInTheDocument()
    expect(loadingCircle).toHaveClass('text-info')
  })
})
