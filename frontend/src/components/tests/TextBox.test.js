import React from 'react'
import { render, screen } from '@testing-library/react'
import TextBox from '../TextBox'

describe('TextBox', () => {
  it('renders the component with the correct title and textarea', () => {
    render(<TextBox />)

    /* Check if the title is rendered correctly */
    const titleElement = screen.getByRole('heading', { name: 'Enter the article’s content to check for plagiarism' })
    expect(titleElement).toBeInTheDocument()

    /* Check if the text area is rendered correctly */
    const textareaElement = screen.getByPlaceholderText('Enter your article here')
    expect(textareaElement).toBeInTheDocument()
  })
})
