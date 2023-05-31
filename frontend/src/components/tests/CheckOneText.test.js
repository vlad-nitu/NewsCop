import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import CheckOneText from '../CheckOneText'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect';

describe('CheckOneText', () => {
  test('renders the prompt text', async () => {
    const prompt = 'Test test'
    jest.useFakeTimers() /* Mock the timer */

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
    expect(textElem).toBeEnabled()
    // Check if the submit button is present
    const submitButton = screen.getByTestId('submit_button')
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
    fireEvent.change(textElem, { target: { value: 'http://example.com/article' } })
    expect(textElem.value).toBe('http://example.com/article')

    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(textElem).toBeDisabled()

    act(() => {
      jest.advanceTimersByTime(10000) /* Advance timer by 10 seconds */
    })

    await waitFor(() => {
      expect(submitButton).toBeEnabled() /* Button should be re-enabled after 10 seconds */
    })
    expect(textElem).toBeEnabled()
    expect(textElem.value).toBe('http://example.com/article')

    // Check if the footer is present
    const footer = screen.getByTestId('FooterText')
    expect(footer).toBeInTheDocument()
  })
})
