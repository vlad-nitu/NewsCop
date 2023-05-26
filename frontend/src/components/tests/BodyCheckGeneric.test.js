/* global expect, describe, it */

import React from 'react'
import { render, screen } from '@testing-library/react'
import BodyCheckGeneric from '../BodyCheckGeneric'

describe('BodyCheckGeneric', () => {
  it('renders the component with correct descriptions', () => {
    render(<BodyCheckGeneric description='News overlap checker' secondDescription='Our tool detects overlap in your news article.' />)

    /* Check if the first description is rendered correctly */
    const firstDescriptionElement = screen.getByText('News overlap checker')
    expect(firstDescriptionElement).toBeInTheDocument()

    /* Check if the second description is rendered correctly */
    const secondDescriptionElement = screen.getByText('Our tool detects overlap in your news article.')
    expect(secondDescriptionElement).toBeInTheDocument()
  })
})
