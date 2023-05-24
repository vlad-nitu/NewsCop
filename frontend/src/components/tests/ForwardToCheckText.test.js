import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ForwardToCheckText from '../ForwardToCheckText'

// Mock `window.scrollTo() behavior
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
})
describe('ForwardToCheckText', () => {
  test('renders the prompt text', () => {
    const prompt = 'Check your text for plagiarism'
    /*
     * By wrapping the ForwardToCheckText component with the MemoryRouter,
     * we provide a routing context that the component can use to render the Link element and trigger navigation events during testing.
    */
    render(
      <MemoryRouter>
        <ForwardToCheckText prompt={prompt} />
      </MemoryRouter>
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()

    // Check if Link component successfully routes the text to '/checkText'
    const linkElement = screen.getByRole('link', { name: prompt })
    expect(linkElement).toHaveAttribute('href', '/checkText')
    expect(linkElement).toHaveClass('description-paragraph')
    expect(linkElement).toHaveStyle('color: black')
    expect(linkElement).toHaveStyle('fontSize: 150%')
    expect(linkElement).toHaveStyle('marginTop: 120px')

    /* Test the scrolling to top behaviour */
    window.scrollTo = jest.fn() // Mock scrollTo function
    fireEvent.click(linkElement)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
