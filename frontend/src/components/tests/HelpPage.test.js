import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import HelpPage from '../HelpPage';
import { MemoryRouter } from 'react-router-dom';

describe('HelpPage', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          {
            question: 'Question 1',
            answer: 'Answer 1'
          },
          {
            question: 'Question 2',
            answer: 'Answer 2'
          }
        ])
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('renders the FAQ page with questions and answers', async () => {
    render(
      <MemoryRouter>
        <HelpPage questionsFile="/path/to/questions" />
      </MemoryRouter>
    );
    
    // Wait for the data to be fetched and rendered
    await waitFor(() => screen.getByText('Question 1'));
    
    // Assert that the questions and answers are rendered
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Answer 2')).toBeInTheDocument();
  });

  test('expands and collapses a card when clicked', async () => {
    render(
      <MemoryRouter>
        <HelpPage questionsFile="/path/to/questions" />
      </MemoryRouter>
    );
    
    // Wait for the data to be fetched and rendered
    await waitFor(() => screen.getByText('Question 1'));
    
    // Click on the first card to expand it
    fireEvent.click(screen.getByText('Question 1'));
    expect(screen.getByTestId('collapseExample0')).toBeVisible();

    await waitFor(() => screen.getByText('Answer 1'));

    // Click on the first card again to collapse it
    fireEvent.click(screen.getByText('Question 1'));
    expect(screen.getByTestId('collapseExample0')).toHaveStyle('display: none');
  });
});
