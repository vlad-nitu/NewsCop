import { render, screen } from '@testing-library/react'
import CheckOneText from '../CheckOneText'
import { MemoryRouter } from 'react-router-dom'

describe('CheckOneText', () => {
  test('renders the prompt text', () => {
    const prompt = 'Test test'

    render(
      <MemoryRouter>
        <CheckOneText applicationName={prompt} />
      </MemoryRouter>
    )

    // Check if the navbar is present
    const navbarElem = screen.getByText(prompt)
    expect(navbarElem).toBeInTheDocument()

    // Check if the body is present
    const bodyElem = screen.getByText('Our tool detects overlap in your news article.')
    expect(bodyElem).toBeInTheDocument()

    // Check if the text box is present
    const textElem = screen.getByPlaceholderText('Enter your article here')
    expect(textElem).toBeInTheDocument()

    // Check if the submit button is present
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()

    // Check if the footer is present
    const footer = screen.getByTestId('FooterText')
    expect(footer).toBeInTheDocument()
  })
})
