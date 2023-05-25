import React from 'react'
import { render, screen } from '@testing-library/react'
import CheckUrlDecision from '../CheckUrlDecision'

describe('CheckUrlDecision', () => {
  test('renders the component with correct parameters', () => {
    const items = ['Example Article']
    /* Render the component with the corresponding parameters */
    render(
      <CheckUrlDecision
        items={items}
      />
    )

    /* Assert that the rendered component contains the expected text */
    expect(screen.getByText('Example Article')).toBeInTheDocument()
  })
})
