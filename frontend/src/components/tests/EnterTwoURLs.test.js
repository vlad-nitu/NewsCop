import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EnterTwoURLs from '../EnterTwoURLs'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

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

  test('Input two URLs good percentage < 0.8', async () => {
    // Mock the timer
    jest.useFakeTimers()

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

    // Resolve the axios post promise
    await act(async () => {
      await axios.post.mock.results[0].value
    })

    // Advance timer by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    // Button should be re-enabled after 5 seconds
    await waitFor(() => {
      expect(submitButton).toBeEnabled()
    })

    expect(inputLeft).toBeEnabled()
    expect(inputRight).toBeEnabled()
    expect(inputLeft.value).toBe('https://getbootstrap.com/docs/5.0/forms/layout/')
    expect(inputRight.value).toBe('https://getbootstrap.com/docs/5.0/forms/validation/')
  })

  test('Displays "Please provide a valid input!" when API request fails', async () => {
    jest.spyOn(axios, 'post').mockRejectedValue(new Error('Request failed'))

    render(<EnterTwoURLs />)

    const originalUrlInput = screen.getByPlaceholderText('Enter the original URL')
    const changedUrlInput = screen.getByPlaceholderText('Enter the changed URL')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(originalUrlInput, { target: { value: 'https://example.com/original' } })
    fireEvent.change(changedUrlInput, { target: { value: 'https://example.com/changed' } })
    fireEvent.click(submitButton)

    expect(await screen.findByText('Please provide a valid input!')).toBeInTheDocument()
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

  test('Button becomes enabled after 5 seconds', async () => {
    // Mock the axios post to return a resolved promise with a dummy response
    axios.post.mockResolvedValue({ data: { dummyResponse: 'success' } })

    const { getByText, getByPlaceholderText } = render(<EnterTwoURLs />)
    const submitButton = getByText('Submit')
    const inputLeft = getByPlaceholderText('Enter the original URL')
    const inputRight = getByPlaceholderText('Enter the changed URL')

    // Change the input values
    fireEvent.change(inputLeft, { target: { value: 'https://getbootstrap.com/docs/5.0/forms/layout/' } })
    fireEvent.change(inputRight, { target: { value: 'https://getbootstrap.com/docs/5.0/forms/validation/' } })

    // Click the submit button
    fireEvent.click(submitButton)

    // Assert that the button is disabled initially
    expect(submitButton).toBeDisabled()

    // Resolve the axios post promise
    await act(async () => {
      await axios.post.mock.results[0].value
    })

    // Advance the timer by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000)
    })

    // Assert that the button becomes enabled after 5 seconds
    expect(submitButton).toBeEnabled()
  })
})
