import React from 'react'
import { render, screen } from '@testing-library/react'
import CheckUrlDecision from '../CheckUrlDecision'

describe('CheckUrlDecision', () => {
  test('renders the component with correct parameters', () => {
    const title = 'Example Article'
    /* Render the component with the corresponding parameters */
    render(
      <CheckUrlDecision
        title={title}
      />
    )

    /* Assert that the rendered component contains the expected text */
    expect(screen.getByText(title)).toBeInTheDocument()
  })
})
