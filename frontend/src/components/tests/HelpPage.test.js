import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import HelpPage from '../HelpPage'
import { MemoryRouter } from 'react-router-dom'

describe('HelpPage', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          {
            question: 'Question 0',
            answer: 'Answer 0'
          },
          {
            question: 'Question 1',
            answer: 'Answer 1'
          }
        ])
      })
    )
  })

  afterEach(() => {
    global.fetch.mockRestore()
  })

  test('renders the FAQ page with questions and answers', async () => {
    render(
      <MemoryRouter>
        <HelpPage questionsFile='/path/to/questions' />
      </MemoryRouter>
    )

    // Wait for the data to be fetched and rendered
    await waitFor(() => screen.getByText('Question 0'))

    // Assert that the questions and answers are rendered
    expect(screen.getByText('Question 0')).toBeInTheDocument()
    expect(screen.getByText('Answer 0')).toBeInTheDocument()
    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('Answer 1')).toBeInTheDocument()
  })

  // test('expands and collapses a card when clicked', async () => {
  //   const { getByTestId, findByTestId } = render(
  //     <MemoryRouter>
  //       <HelpPage questionsFile="/path/to/questions" />
  //     </MemoryRouter>
  //   );

  //   // Wait for the data to be fetched and rendered
  //   await findByTestId('collapseExample0')

  //   // Check initial state of the cards
  //   const card0 = getByTestId('collapseExample0');
  //   const card1 = getByTestId('collapseExample1');

  //   const question0 = getByTestId('Question 0')

  //   expect(card0).toHaveClass('collapse'); // Card 0 should be initially collapsed
  //   expect(card1).toHaveClass('collapse'); // Card 1 should be initially collapsed

  //   // Click on card 0 to expand it
  //   act(() => {
  //     fireEvent.click(question0);
  //   })
  //   console.log(getByTestId('Question 0'))

  //   expect(card0).toHaveClass('collapse'); // Card 0 should be expanded
  //   expect(card1).toHaveClass('collapse'); // Card 1 should still be collapsed

  //   // Click on the first card to expand it
  //   expect(screen.getByTestId('collapseExample0').classList.contains('collapse')).toBe(true)
  //   await userEvent.click(screen.getByTestId('Question 0'))
  //   expect(screen.getByTestId('collapseExample0').classList.contains('collapse show')).toBe(true)

  //   // Click on the first card again to collapse it
  //   fireEvent.click(screen.getByText('Question 0'));
  //   expect(screen.getByTestId('collapseExample0')).toHaveStyle('display: none');
  // });
})
