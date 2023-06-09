import React from 'react'
import { render, screen } from '@testing-library/react'
import Ownership from '../Ownership'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

describe('Ownership component', () => {
  it('renders the text and arrow correctly when result includes "right"', () => {
    const result = 'The right input is likely to own the content'
    render(<Ownership result={result} />)

    const ownershipPrompt = screen.getByTestId('ownership-prompt')
    expect(ownershipPrompt).toHaveTextContent(result)

    const arrowIcon = screen.getByTestId('turn-up-icon')
    expect(arrowIcon).toHaveClass('fa-arrow-turn-up')
    expect(arrowIcon).toHaveStyle('color: #2e837e;')
  })

  it('renders the text and arrow correctly when result does not include "right"', () => {
    const result = 'The left input is likely to own the content'
    render(<Ownership result={result} />)

    const ownershipPrompt = screen.getByTestId('ownership-prompt')
    expect(ownershipPrompt).toHaveTextContent(result)

    const arrowIcon = screen.getByTestId('turn-up-icon')
    expect(arrowIcon).toHaveClass('fa-arrow-turn-up')
    expect(arrowIcon).toHaveStyle('color: #2e837e;')
    expect(arrowIcon).toHaveStyle('transform: scale(-1, 1);') // rotated
  })

  it('renders at least one document that does not have a valid date', () => {
    const result = 'These two news articles cannot be compared'

    render(<Ownership result={result} />)

    const ownershipPrompt = screen.getByTestId('ownership-prompt')
    expect(ownershipPrompt).toHaveTextContent(result)

    const arrowIcon = screen.queryByTestId('turn-up-icon')
    expect(arrowIcon).not.toBeInTheDocument()
  })
})
