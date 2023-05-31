import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ForwardToPage from '../ForwardToPage'

const { jest, describe } = require('jest')

// Mock `window.scrollTo() behavior
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})

describe('ForwardToPageTest', () => {
  test('Renders the prompt text', () => {
    const prompt = '... or you may want to check a text paragraph for similarity against our stored articles'
    /*
             * By wrapping the ForwardToPage component with the MemoryRouter,
             * we provide a routing context that the component can use to render the Link element and trigger navigation events during testing.
            */
    render(
      <MemoryRouter>
        <ForwardToPage page='/checkText' prompt={prompt} />
      </MemoryRouter>
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()

    // Check if Link component successfully routes the text to '/checkText'
    const linkElement = screen.getByRole('link', { name: prompt })
    expect(linkElement).toHaveAttribute('href', '/checkText')
    expect(linkElement).toHaveClass('description-paragraph-2')
    expect(linkElement).toHaveStyle('color: black')

    /* Test the scrolling to top behaviour */
    window.scrollTo = jest.fn() // Mock scrollTo function
    fireEvent.click(linkElement)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
