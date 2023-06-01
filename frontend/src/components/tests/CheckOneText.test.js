import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CheckOneText from '../CheckOneText'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'

jest.mock('axios')
axios.post.mockResolvedValue({ data: [{ similarity: 0.8, url: 'https://example.com' }] })

describe('CheckOneText', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('successful rendering of prompt', () => {
    const prompt = 'Enter the article’s content to check for overlap'

    render(
      <MemoryRouter>
        <CheckOneText />
      </MemoryRouter>
    )

    // Check if the text element containing the prompt text
    const promptElement = screen.getByText(prompt)
    expect(promptElement).toBeInTheDocument()
  })

  test('valid input and successful submission', async () => {
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

    const PreInputPrompt = 'Enter your article here'
    render(
      <MemoryRouter>
        <CheckOneText />
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText(PreInputPrompt)
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
    fireEvent.change(input, { target: { value: 'Some text' } })
    expect(input.value).toBe('Some text')
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

    const renderButton = screen.getAllByText('See article')[0]

    fireEvent.click(renderButton)

    await waitFor(() => {
      const centerIframe = screen.getByTitle('one_article')
      expect(centerIframe).toBeInTheDocument()
    })
  })

  test('valid input and empty array response', async () => {
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
        <CheckOneText />
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText('Enter your article here')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(input, { target: { value: 'Some text' } })
    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('Our system has not found no match for the news content you provided!')).toBeInTheDocument()
    })
  })

  test('error from server successfully handled', async () => {
    const mockedErrorResponse = {
      response: {
        status: 400,
        data: 'Invalid URL'
      }
    }

    axios.post.mockRejectedValueOnce(mockedErrorResponse)

    render(
      <MemoryRouter>
        <CheckOneText />
      </MemoryRouter>
    )
    const input = screen.getByPlaceholderText('Enter your article here')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(input, { target: { value: 'Some text' } })
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('You entered an invalid text!')).toBeInTheDocument()
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  test('request error successfully handled', async () => {
    const mockedError = {
      request: 'Failed to make request'
    }

    axios.post.mockRejectedValueOnce(mockedError)

    render(
      <MemoryRouter>
        <CheckOneText />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText('Enter your article here')
    const submitButton = screen.getByText('Submit')

    fireEvent.change(input, { target: { value: 'Some text' } })
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('The server might not be running!')).toBeInTheDocument()
    })
  })

  test('other types of errors handled successfully', async () => {
    const mockedError = new Error('Request failed')

    axios.post.mockRejectedValue(mockedError)
    render(
      <MemoryRouter>
        <CheckOneText />
      </MemoryRouter>
    )
    const inputForm = screen.getByPlaceholderText('Enter your article here')
    const submitButton = screen.getByText('Submit')
    fireEvent.change(inputForm, { target: { value: 'Some text' } })
    fireEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    expect(screen.getByRole('status')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId('loading-circle')).not.toBeInTheDocument()
      expect(screen.getByText('An error occurred, please try again later!')).toBeInTheDocument()
    })
  })
})
