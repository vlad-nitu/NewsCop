import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ForwardToCheckTwoTexts from '../ForwardToCheckTwoTexts'

describe('ForwardToCheckTwoTexts', () => {
  test('Renders the prompt text', () => {
    const prompt = '.. or you may want to check the similarity of two text paragraphs'
    /*
         * By wrapping the ForwardToCheckTwoTexts component with the MemoryRouter,
         * we provide a routing context that the component can use to render the Link element and trigger navigation events during testing.
        */
    render(
      <MemoryRouter>
        <ForwardToCheckTwoTexts prompt={prompt} />
      </MemoryRouter>
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()

    // Check if Link component successfully routes the text to '/compareTexts'
    const linkElement = screen.getByRole('link', { name: prompt })
    expect(linkElement).toHaveAttribute('href', '/compareTexts')
    expect(linkElement).toHaveClass('description-paragraph')
    expect(linkElement).toHaveStyle('color: black')
    expect(linkElement).toHaveStyle('fontSize: 150%')
    expect(linkElement).toHaveStyle('marginTop: 120px')
  })
})
