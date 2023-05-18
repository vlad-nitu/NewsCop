import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import CheckTwoTexts from '../CheckTwoTexts'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'

describe('CheckTwoTexts', () => {
  test('renders the prompt text', async () => {

    const prompt = 'Test test'
    jest.useFakeTimers() /* Mock the timer */

    render(
      <MemoryRouter>
        <CheckTwoTexts applicationName={prompt} firstPlaceholder='Enter the first article' secondPlaceholder='Enter the second article' />
      </MemoryRouter>
    )

    // Check if the navbar is present
    const navbarElem = screen.getByText(prompt)
    expect(navbarElem).toBeInTheDocument()

    // Check if the body is present
    const bodyTwoTexts = screen.getByText('Our similarity checker determines the similarity levels between two text paragraphs.')
    expect(bodyTwoTexts).toBeInTheDocument()

    // Check if the first text box is present
    const firstTextElem = screen.getByPlaceholderText('Enter the first article')
    expect(firstTextElem).toBeInTheDocument()
    expect(firstTextElem).toBeEnabled()
    fireEvent.change(firstTextElem, { target: { value: 'http://example.com/article' } })
    expect(firstTextElem.value).toBe('http://example.com/article')

    // Check if the second text box is present
    const secondTextElem = screen.getByPlaceholderText('Enter the second article')
    expect(secondTextElem).toBeInTheDocument()
    expect(secondTextElem).toBeEnabled()
    fireEvent.change(secondTextElem, { target: { value: 'http://example.com/article2' } })
    expect(secondTextElem.value).toBe('http://example.com/article2')

    // Check if the submit button is present
    const submitButton = screen.getByTestId('submit_button')
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()

    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(firstTextElem).toBeDisabled()
    expect(secondTextElem).toBeDisabled()
    act(() => {
      jest.advanceTimersByTime(4000) /* Advance timer by 10 seconds */
    })

    //  jest.mock('axios');
    //  axios.post.mockResolvedValue({data:1/3})

    // await waitFor(() => {
    //   expect(submitButton).toBeEnabled() /* Button should be re-enabled after 10 seconds */
    // })

    // expect(firstTextElem).toBeEnabled()
    // expect(firstTextElem.value).toBe('http://example.com/article')
    //
    // expect(secondTextElem).toBeEnabled()
    // expect(secondTextElem.value).toBe('http://example.com/article2')

    // Check if the footer is present
    const footer = screen.getByTestId('FooterText')
    expect(footer).toBeInTheDocument()
  })
})
