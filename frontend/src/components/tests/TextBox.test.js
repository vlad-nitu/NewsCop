import React from 'react'
import { render, screen } from '@testing-library/react'
import TextBox from '../TextBox'

describe('TextBox', () => {
  it('renders the component with the correct title and textarea', () => {
    render(<TextBox description='Enter your article here' placeholder='Enter your article here' />)

    /* Check if the text area is rendered correctly */
    const textareaElement = screen.getByPlaceholderText('Enter your article here')
    expect(textareaElement).toBeInTheDocument()
  })
})
