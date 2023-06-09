import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import HelpPage from '../HelpPage'
import { MemoryRouter } from 'react-router-dom'

const questionsFile = [
  { question: 'Question 1', answer: 'Answer 1' },
  { question: 'Question 2', answer: 'Answer 2' }
]

describe('HelpPage', () => {
  test('scrolls to top when the component mounts', () => {
    window.scrollTo = jest.fn()
    render(
      <MemoryRouter>
        <HelpPage questionsFile={questionsFile} />
      </MemoryRouter>)
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
  })
  test('renders HelpPage component and tests its functionality', () => {
    render(
      <MemoryRouter>
        <HelpPage questionsFile={questionsFile} />
      </MemoryRouter>)
    // Test rendering of navbar
    const navbar = screen.getByTestId('navbar')
    expect(navbar).toBeInTheDocument()

    // Test initial card rendering and click functionality
    const question1Element = screen.getByText('Question 1')
    const question2Element = screen.getByText('Question 2')

    expect(question1Element).toBeInTheDocument()
    expect(question2Element).toBeInTheDocument()

    const collapseElement1 = screen.getByTestId('collapseExample0')
    const collapseElement2 = screen.getByTestId('collapseExample1')

    expect(collapseElement1).not.toHaveClass('show')
    expect(collapseElement2).not.toHaveClass('show')

    fireEvent.click(question1Element)

    expect(collapseElement1).toHaveClass('collapse')
    expect(collapseElement2).not.toHaveClass('show')

    fireEvent.click(question1Element)

    expect(collapseElement1).not.toHaveClass('show')
    expect(collapseElement2).not.toHaveClass('show')

    fireEvent.click(question2Element)

    expect(collapseElement1).not.toHaveClass('show')
    expect(collapseElement2).toHaveClass('collapse')
  })

  test('controls clickability of cards', () => {
    const questionsFile = [
      { question: 'Question 1', answer: 'Answer 1' }
    ]
    jest.useFakeTimers()
    render(
      <MemoryRouter>
        <HelpPage questionsFile={questionsFile} />
      </MemoryRouter>)

    const question1Element = screen.getByTestId('Question 1')
    expect(question1Element).toHaveAttribute('role', 'button')
    fireEvent.click(question1Element)
    expect(question1Element).not.toHaveAttribute('role', 'button')
    act(() => {
      jest.advanceTimersByTime(350) /* Advance timer by 350 ms */
    })
    expect(question1Element).toHaveAttribute('role', 'button')
  })
})
