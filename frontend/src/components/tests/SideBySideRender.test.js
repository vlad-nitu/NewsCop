import { render, screen, fireEvent } from '@testing-library/react'
import SideBySideRender from '../SideBySideRender'
import '@testing-library/jest-dom/extend-expect';

describe('SideBySideRender', () => {
  const mockUrlLeft = 'https://example.com/left'
  const mockUrlRight = 'https://example.com/right'
  const mockHandleClose = jest.fn()

  beforeEach(() => {
    render(
      <SideBySideRender
        urlLeft={mockUrlLeft}
        urlRight={mockUrlRight}
        showModal
        handleClose={mockHandleClose}
      />
    )
  })

  it('renders the modal with two iframes', () => {
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()

    const leftIframe = screen.getByTitle('left_article')
    expect(leftIframe).toBeInTheDocument()

    const rightIframe = screen.getByTitle('right_article')
    expect(rightIframe).toBeInTheDocument()
  })

  it('calls the handleClose function when the modal is closed', () => {
    const closeButton = screen.getByTitle('close_button')
    fireEvent.click(closeButton)

    expect(mockHandleClose).toHaveBeenCalled()
  })

  it('changes the background color when clicking the "Go back" link', () => {
    const goBackLink = screen.getByText('Go back')
    fireEvent.click(goBackLink)

    expect(screen.getByTitle('wrapper')).toHaveStyle({ backgroundColor: '#fff' })
  })
})
