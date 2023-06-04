import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import HelpPage from '../HelpPage'
import { MemoryRouter } from 'react-router-dom'

describe('HelpPage', () => {
  test('renders frequently asked questions', () => {
    render(
      <MemoryRouter>
        <HelpPage />
      </MemoryRouter>
    )

    // Verify the presence of FAQ titles
    expect(screen.getByText('What is a news article overlap platform?')).toBeInTheDocument()
    expect(screen.getByText('How does a news article overlap platform work?')).toBeInTheDocument()
    expect(screen.getByText('What problem does a news article overlap platform solve?')).toBeInTheDocument()
    expect(screen.getByText('How can I use a news article overlap platform to improve my research?')).toBeInTheDocument()
    expect(screen.getByText('Can a news article overlap platform detect lexical similarity using fingerprinting?')).toBeInTheDocument()
  })

  test('expands and collapses question cards on click', () => {
    render(
      <MemoryRouter>
        <HelpPage />
      </MemoryRouter>
    )

    // Verify the initial state of the question cards (collapsed)
    expect(screen.queryByText('A news article overlap platform is a digital tool')).not.toBeInTheDocument()
    expect(screen.queryByText('A news article overlap platform uses fingerprinting to generate unique')).not.toBeInTheDocument()
    expect(screen.queryByText('A news article overlap platform addresses the issue of redundant')).not.toBeInTheDocument()
    expect(screen.queryByText('Researchers can leverage a news article overlap platform to enhance their research')).not.toBeInTheDocument()
    expect(screen.queryByText('Yes, a news article overlap platform that employs fingerprinting techniques')).not.toBeInTheDocument()

    // Expand the first question card
    fireEvent.click(screen.getByRole('button', { name: 'What is a news article overlap platform?' }))

    // Verify the content of the expanded question card
    expect(screen.getByText('A news article overlap platform is a digital tool or software that employs fingerprinting techniques to compare and analyze the lexical similarities between different news articles. It helps users identify common content, phrases, or sentence structures across multiple sources, allowing them to assess the overlap and potential redundancy in news reporting.')).toBeInTheDocument()

    // Collapse the first question card
    fireEvent.click(screen.getByRole('button', { name: 'What is a news article overlap platform?' }))

    // Verify that the first question card is collapsed
    expect(screen.queryByText('A news article overlap platform is a digital tool')).not.toBeInTheDocument()
  })
})
