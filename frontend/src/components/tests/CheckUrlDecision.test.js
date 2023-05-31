import React from 'react'
import { render, screen } from '@testing-library/react'
import CheckUrlDecision from '../CheckUrlDecision'

const { describe } = require('jest')

describe('CheckUrlDecision', () => {
  test('renders the component with correct parameters', () => {
    const items = ['Example Article']
    const similarities = [20]
    /* Render the component with the corresponding parameters */
    render(
      <CheckUrlDecision
        items={items} similarities={similarities}
      />
    )

    /* Assert that the rendered component contains the expected text */
    expect(screen.getByText('Example Article')).toBeInTheDocument()
  })
})
