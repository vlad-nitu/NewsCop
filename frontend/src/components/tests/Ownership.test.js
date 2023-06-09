import React from 'react'
import { render, screen } from '@testing-library/react'
import Ownership from '../Ownership'

describe('Ownership component', () => {
  it('renders the text and arrow correctly when result includes "right"', () => {
    const result = 'The right input is likely to own the content'
    const left_date = '2020-07-07 23:33:00'
    const right_date = '2020-07-06 18:47:45'
    render(<Ownership result={result} date_left={left_date} date_right={right_date} />)

    const ownershipPrompt = screen.getByTestId('ownership-prompt')
    const leftDatePrompt = screen.getByTestId('date-left-prompt')
    const rightDatePrompt = screen.getByTestId('date-right-prompt')
    expect(ownershipPrompt).toHaveTextContent(result)
    expect(leftDatePrompt).toHaveTextContent(left_date)
    expect(rightDatePrompt).toHaveTextContent(right_date)

    const arrowIcon = screen.getByTestId('turn-up-icon')
    expect(arrowIcon).toHaveClass('fa-arrow-turn-up')
    expect(arrowIcon).toHaveStyle('color: #2e837e;')
  })

  it('renders the text and arrow correctly when result includes "left"', () => {
    const result = 'The left input is likely to own the content'
    const left_date = '2020-07-06 18:47:45'
    const right_date = '2020-07-07 23:33:00'
    render(<Ownership result={result} date_left={left_date} date_right={right_date} />)

    const ownershipPrompt = screen.getByTestId('ownership-prompt')
    const leftDatePrompt = screen.getByTestId('date-left-prompt')
    const rightDatePrompt = screen.getByTestId('date-right-prompt')
    expect(ownershipPrompt).toHaveTextContent(result)
    expect(leftDatePrompt).toHaveTextContent(left_date)
    expect(rightDatePrompt).toHaveTextContent(right_date)

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
    const leftDatePrompt = screen.queryByTestId('date-left-prompt')
    const rightDatePrompt = screen.queryByTestId('date-right-prompt')
    expect(arrowIcon).not.toBeInTheDocument()
    expect(leftDatePrompt).not.toBeInTheDocument()
    expect(rightDatePrompt).not.toBeInTheDocument()
  })
})
