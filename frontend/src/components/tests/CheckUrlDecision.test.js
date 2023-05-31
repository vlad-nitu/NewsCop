import React from 'react'
import { render, screen } from '@testing-library/react'
import CheckUrlDecision from '../CheckUrlDecision'

describe('CheckUrlDecision', () => {
  test('renders the component with correct parameters', () => {
    const articles = [{
          similarity: 0.75,
          title: 'Example Article',
          url: 'https://example1.com',
          publisher: "publisher1",
          date: '2023-05-01'
        }]

    const sourceArticle = {
          similarity: 0,
          title: 'title2',
          url: 'https://example2.com',
          publisher: "publisher2",
          date: '2023-05-02'
        }
    /* Render the component with the corresponding parameters */
    render(
      <CheckUrlDecision
        articles={articles} sourceArticle={sourceArticle} display={'block'}
      />
    )

    /* Assert that the rendered component contains the expected text */
    expect(screen.getByText('Example Article')).toBeInTheDocument()
  })
})
