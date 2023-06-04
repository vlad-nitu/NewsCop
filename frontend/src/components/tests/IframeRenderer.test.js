import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import IframeRenderer from '../IframeRenderer'

describe('IframeRenderer', () => {
  const mockUrl = 'https://example.com'
  const mockId = 'iframe-id'
  const mockChangeBackground = jest.fn()

  beforeEach(() => {
    act(() => {
      render(
        <IframeRenderer url={mockUrl} id={mockId} changeBackground={mockChangeBackground} />
      )
    })
  })

  it('renders the loading spinner initially', () => {
    const loadingSpinner = screen.getByTestId('loader')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('hides the loading spinner and displays the iframe after loading', () => {
    act(() => {
      fireEvent.load(screen.getByTitle(mockId))
    })

    const iframe = screen.getByTitle(mockId)
    expect(iframe).toBeInTheDocument()

    const loadingSpinner = screen.queryByTestId('loader')
    expect(loadingSpinner).not.toBeInTheDocument()
  })

  it('calls the changeBackground function when hiding the spinner', () => {
    act(() => {
      fireEvent.load(screen.getByTitle(mockId))
    })

    expect(mockChangeBackground).toHaveBeenCalled()
  })
})
