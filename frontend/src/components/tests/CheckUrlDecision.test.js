import React from 'react'
import {render, screen} from '@testing-library/react'
import CheckUrlDecision from '../CheckUrlDecision'

describe('CheckUrlDecision', () => {
  test('renders the component with correct parameters', () => {
    const title = 'Example Article'
    const publishingDate = '2023-05-14'
    const decision = 'overlap warning'
    /* Render the component with the corresponding parameters */
    render(
      <CheckUrlDecision
        title={title}
        publishingDate={publishingDate}
        decision={decision}
      />
    )

    /* Assert that the rendered component contains the expected text */
    expect(screen.getByText('For your article:')).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText('That was published on:')).toBeInTheDocument()
    expect(screen.getByText(publishingDate)).toBeInTheDocument()
    expect(screen.getByText('We found that your article:')).toBeInTheDocument()
    expect(screen.getByText(decision)).toBeInTheDocument()
  })
})
