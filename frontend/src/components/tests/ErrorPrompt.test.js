import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorPrompt from '../ErrorPrompt'

describe('ErrorPrompt', () => {
  test('renders the error prompt correctly', () => {
    const prompt = 'Error!'

    render(<ErrorPrompt prompt={prompt} />)

    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()
    expect(promptElement).toHaveAttribute('id', 'forErrorPrompt')
  })
})
