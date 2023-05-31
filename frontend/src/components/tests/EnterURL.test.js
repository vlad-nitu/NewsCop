import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EnterURL from '../EnterURL'
import { MemoryRouter } from 'react-router'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios')
axios.post.mockResolvedValue({ data: [{ similarity: 0.8, url: 'https://example.com' }] })

describe('EnterURL', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('renders the prompt text', () => {
    const prompt = 'Enter the article\'s URL to check for overlap'
    /*
             * By wrapping the ForwardToCheckText component with the MemoryRouter,
             * we provide a routing context that the component can use to render the Link element and trigger navigation events during testing.
            */
    render(
      <MemoryRouter>
        <EnterURL />
      </MemoryRouter>
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()
  })
  test('handles successful form submission positive', async () => {
    const mockedResponse = {
      data: [{
        similarity: 0.75,
        url: 'https://example1.com',
        date: '2023-05-01'
      }, {
        similarity: 0,
        url: 'https://example2.com',
        date: '2023-05-01'
      }, {
        similarity: 0.3,
        url: 'https://example3.com',
        date: '2023-05-01'
      }]
    }
    axios.post.mockResolvedValueOnce(mockedResponse)
    // jest.useFakeTimers() /* Mock the timer */

    const PreInputArticlePrompt = "Article's URL"
    render(<EnterURL />)

    const input = screen.getByPlaceholderText(PreInputArticlePrompt)
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    fireEvent.change(input, { target: { value: 'http://example.com/article' } })
    expect(input.value).toBe('http://example.com/article')
    expect(submitButton).toBeEnabled()
    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('Your article has a maximum overlap of 75% with https://example1.com')).toBeInTheDocument()
      expect(screen.getByText('Your article has a maximum overlap of 30% with https://example3.com')).toBeInTheDocument()
    })
  })
  test('handles successful form submission negative', async () => {
    const theMockResponse = {
      data: {
        similarity: -1,
        url: 'https://example.com',
        date: '2023-05-01'
      }
    }
    axios.post.mockResolvedValueOnce(theMockResponse)

    render(<EnterURL />)

    const input = screen.getByPlaceholderText('Article\'s URL')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(input, { target: { value: 'article' } })
    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('Our system has not found no match for your news article!')).toBeInTheDocument()
    })
  })
  test('handles error response from server', async () => {
    const mockedErrorResponse = {
      response: {
        status: 400,
        data: 'Invalid URL'
      }
    }

    axios.post.mockRejectedValueOnce(mockedErrorResponse)

    render(<EnterURL />)

    const input = screen.getByPlaceholderText("Article's URL")
    const submitButton = screen.getByText('Submit')

    fireEvent.change(input, { target: { value: 'invalid-url' } })
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('You entered an invalid URL!')).toBeInTheDocument()
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('handles request error', async () => {
    const mockedError = {
      request: 'Failed to make request'
    }

    axios.post.mockRejectedValueOnce(mockedError)

    render(<EnterURL />)

    const input = screen.getByPlaceholderText("Article's URL")
    const submitButton = screen.getByText('Submit')

    fireEvent.change(input, { target: { value: 'https://example.com/article' } })
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('The server might not be running!')).toBeInTheDocument()
    })
  })

  test('handles another error', async () => {
    const mockedError = new Error('Request failed')

    axios.post.mockRejectedValue(mockedError)
    render(<EnterURL />)

    const inputForm = screen.getByPlaceholderText("Article's URL")
    const submitButton = screen.getByText('Submit')
    fireEvent.change(inputForm, { target: { value: 'example' } })
    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('An error occurred, please try again later!')).toBeInTheDocument()
    })
  })
})
