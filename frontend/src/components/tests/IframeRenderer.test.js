import { render, screen, fireEvent } from '@testing-library/react'
import IframeRenderer from '../IframeRenderer'
import '@testing-library/jest-dom/extend-expect'

describe('IframeRenderer', () => {
  const mockUrl = 'https://example.com'
  const mockId = 'iframe-id'
  const mockChangeBackground = jest.fn()

  beforeEach(() => {
    render(
      <IframeRenderer url={mockUrl} id={mockId} changeBackground={mockChangeBackground} />
    )
  })

  it('renders the loading spinner initially', () => {
    const loadingSpinner = screen.getByTestId('loader')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('hides the loading spinner and displays the iframe after loading', () => {
    fireEvent.load(screen.getByTitle(mockId))

    const iframe = screen.getByTitle(mockId)
    expect(iframe).toBeInTheDocument()

    const loadingSpinner = screen.queryByTestId('loader')
    expect(loadingSpinner).not.toBeInTheDocument()
  })

  it('calls the changeBackground function when hiding the spinner', () => {
    fireEvent.load(screen.getByTitle(mockId))

    expect(mockChangeBackground).toHaveBeenCalled()
  })
})
