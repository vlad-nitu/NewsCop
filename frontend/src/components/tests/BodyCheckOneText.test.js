/* global expect, describe, it */

import React from 'react'
import { render, screen } from '@testing-library/react'
import BodyCheckOneText from '../BodyCheckOneText'

describe('BodyCheckOneText', () => {
  it('renders the component with correct descriptions', () => {
    render(<BodyCheckOneText />);

    /* Check if the first description is rendered correctly */
    const firstDescriptionElement = screen.getByText('News overlap checker')
    expect(firstDescriptionElement).toBeInTheDocument()

    /* Check if the second description is rendered correctly */
    const secondDescriptionElement = screen.getByText('Our tool detects overlap in your news article.')
    expect(secondDescriptionElement).toBeInTheDocument()
  })
})
