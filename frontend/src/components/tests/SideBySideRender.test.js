import React from 'react'
import { render } from '@testing-library/react'
import SideBySideRender from '../SideBySideRender'

// Mock react-iframe component
jest.mock('react-iframe', () => ({ id }) => <iframe id={id} />)

describe('SideBySideRender', () => {
  test('renders iframe with correct id', () => {
    // Mock handleClose function
    const handleClose = jest.fn()

    // Render the component
    const { container } = render(
      <SideBySideRender
        urlLeft='http://example.com/left'
        urlRight='http://example.com/right'
        show
        handleClose={handleClose}
      />
    )

    // Get the iframe elements
    const iframeLeft = document.querySelector('iframe#left_article')
    const iframeRight = document.querySelector('#right_article')

    // Assert that the iframe elements exist and have correct id
    expect(iframeLeft).toBeInTheDocument()
    expect(iframeLeft?.id).toBe('left_article')

    expect(iframeRight).toBeInTheDocument()
    expect(iframeRight?.id).toBe('right_article')
  })
})
