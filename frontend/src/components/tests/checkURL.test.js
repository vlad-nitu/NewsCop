import { render, screen } from '@testing-library/react'
import CheckURL from '../CheckURL'
import { MemoryRouter } from 'react-router-dom'

const { describe } = require('jest')

describe('CheckURL', () => {
  test('renders the prompt text', () => {
    const prompt = '... or you may want to check a text paragraph for similarity against our stored articles'

    render(
      <MemoryRouter>
        <CheckURL />
      </MemoryRouter>
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()
  })
})
