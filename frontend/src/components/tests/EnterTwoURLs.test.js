import { render, screen, fireEvent } from '@testing-library/react'
import EnterTwoURLs from '../EnterTwoURLs'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'

describe('EnterTwoURLs', () => {
  test('Renders the prompt text', () => {
    const prompt = 'Enter the article\'s URLs to check for similarity'
    render(
      <MemoryRouter>
        <EnterTwoURLs />
      </MemoryRouter>
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()
  })

  test('Input two URLs good', async () => {
    jest.useFakeTimers() /* Mock the timer */

    const PreInputArticlePromptOriginal = 'Enter the original URL'
    const PreInputArticlePromptChanged = 'Enter the changed URL'
    const { getByPlaceholderText, getByText } = render(<EnterTwoURLs />)
    const inputLeft = getByPlaceholderText(PreInputArticlePromptOriginal)
    const inputRight = getByPlaceholderText(PreInputArticlePromptChanged)
    const submitButton = getByText('Submit')

    // change the url on the left
    fireEvent.change(inputLeft, { target: { value: 'https://getbootstrap.com/docs/5.0/forms/layout/' } })
    expect(inputLeft.value).toBe('https://getbootstrap.com/docs/5.0/forms/layout/')

    // change the url on the right
    fireEvent.change(inputRight, { target: { value: 'https://getbootstrap.com/docs/5.0/forms/validation/' } })
    expect(inputRight.value).toBe('https://getbootstrap.com/docs/5.0/forms/validation/')

    jest.mock('axios')
    const expectedData = { similarity: 0.13 }
    axios.post = jest.fn().mockResolvedValueOnce({ data: expectedData })

    fireEvent.click(submitButton)

    // Even after pressing the Submit button (for 5 seconds), the text remains in the form; after 5 seconds, it gets erased
    expect(inputLeft.value).toBe('https://getbootstrap.com/docs/5.0/forms/layout/')
    expect(inputRight.value).toBe('https://getbootstrap.com/docs/5.0/forms/validation/')
    expect(submitButton).toBeDisabled()
    expect(inputRight).toBeDisabled()
    expect(inputLeft).toBeDisabled()

    // act(() => {
    //     jest.advanceTimersByTime(5000) /* Advance timer by 5 seconds */
    // })
    //
    // await waitFor(() => {
    //     expect(submitButton).toBeEnabled()
    // }) /* Button should be re-enabled after 5 seconds */
    //
    // expect(inputLeft).toBeEnabled()
    // expect(inputRight).toBeEnabled()
    // expect(inputLeft.value).toBe('https://getbootstrap.com/docs/5.0/forms/layout/')
    // expect(inputRight.value).toBe('https://getbootstrap.com/docs/5.0/forms/validation/')
  })

  test('Input two empty URLs', () => {
    render(<EnterTwoURLs />)
    const submitButton = screen.getByText('Submit')

    expect(submitButton).toBeDisabled()
  })

  test('Input two URLs only the left', () => {
    const PreInputArticlePromptOriginal = 'Enter the original URL'
    const { getByPlaceholderText, getByText } = render(<EnterTwoURLs />)
    const inputLeft = getByPlaceholderText(PreInputArticlePromptOriginal)
    const submitButton = getByText('Submit')

    // change the url on the left
    fireEvent.change(inputLeft, { target: { value: 'http://example.com/article' } })
    expect(inputLeft.value).toBe('http://example.com/article')

    expect(submitButton).toBeDisabled()
  })

  test('Input two URLs only the right', () => {
    const PreInputArticlePromptChanged = 'Enter the changed URL'
    const { getByPlaceholderText, getByText } = render(<EnterTwoURLs />)
    const inputRight = getByPlaceholderText(PreInputArticlePromptChanged)
    const submitButton = getByText('Submit')

    // change the url on the right
    fireEvent.change(inputRight, { target: { value: 'http://example.com/article' } })
    expect(inputRight.value).toBe('http://example.com/article')

    expect(submitButton).toBeDisabled()
  })
})
