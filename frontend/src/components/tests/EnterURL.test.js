import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EnterURL from '../EnterURL'
import { MemoryRouter } from 'react-router'
import axios from 'axios'

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
      data: {
        similarArticles: [{
          similarity: 0.75,
          title: 'title1',
          url: 'https://example1.com',
          publisher: 'publisher1',
          date: '2023-05-01'
        }, {
          similarity: 0,
          title: 'title2',
          url: 'https://example2.com',
          publisher: 'publisher2',
          date: '2023-05-02'
        }, {
          similarity: 0.3,
          title: 'title3',
          url: 'https://example3.com',
          publisher: 'publisher3',
          date: '2023-05-03'
        }],
        sourceTitle: 'Source title',
        sourceData: '2023-10-15'
      }
    }
    axios.post.mockResolvedValueOnce(mockedResponse)
    // jest.useFakeTimers() /* Mock the timer */

    const PreInputArticlePrompt = "Article's URL"
    render(
      <MemoryRouter>
        <EnterURL />
      </MemoryRouter>
    )
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
      expect(screen.getByText('title1')).toBeInTheDocument()
      expect(screen.getByText('title3')).toBeInTheDocument()
      expect(screen.getByText('2023-05-01')).toBeInTheDocument()
      expect(screen.getByText('2023-05-03')).toBeInTheDocument()
    })

    const compareButton = screen.getAllByText('Compare')[0]

    fireEvent.click(compareButton)

    await waitFor(() => {
      const leftIframe = screen.getByTitle('left_article')
      expect(leftIframe).toBeInTheDocument()
      const rightIframe = screen.getByTitle('right_article')
      expect(rightIframe).toBeInTheDocument()
    })
  })
  test('handles successful empty array submission', async () => {
    const theMockResponse = {
      data: {
        similarArticles: [],
        sourceTitle: 'Source title',
        sourceData: '2023-10-15'
      }
    }
    axios.post.mockResolvedValueOnce(theMockResponse)

    render(
      <MemoryRouter>
        <EnterURL />
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText('Article\'s URL')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(input, { target: { value: 'article' } })
    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('Our system has found no match for your news article!')).toBeInTheDocument()
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

    render(
      <MemoryRouter>
        <EnterURL />
      </MemoryRouter>
    )
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

    render(
      <MemoryRouter>
        <EnterURL />
      </MemoryRouter>
    )

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
    render(
      <MemoryRouter>
        <EnterURL />
      </MemoryRouter>
    )
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
