import { render, screen, fireEvent } from '@testing-library/react'
import OneArticleRender from '../OneArticleRender'

describe('OneArticleRender', () => {
  const mockUrl = 'https://example.com/'
  const mockHandleClose = jest.fn()

  beforeEach(() => {
    render(
      <OneArticleRender
        url={mockUrl}
        showModal
        handleClose={mockHandleClose}
      />
    )
  })

  test('renders the modal with just once centered iframe', () => {
    const modal = screen.getByRole('dialog')
    expect(modal).toBeInTheDocument()

    const oneIframe = screen.getByTitle('one_article')
    expect(oneIframe).toBeInTheDocument()
  })

  test('closing modal triggers handleClose function', () => {
    const closeButton = screen.getByTitle('close_button')
    fireEvent.click(closeButton)

    expect(mockHandleClose).toHaveBeenCalled()
  })

  test('clicking the "Go back" link changes the background color', () => {
    const goBackLink = screen.getByText('Go back')
    fireEvent.click(goBackLink)

    expect(screen.getByTitle('wrapper')).toHaveStyle({ backgroundColor: '#fff' })
  })
})
