/* global expect, describe, it */

import React from 'react'
import { render, screen } from '@testing-library/react'
import BodyCheckTwoTexts from "../BodyCheckTwoTexts";

describe('BodyCheckTwoTexts', () => {
  it('renders the component with correct descriptions', () => {
    render(<BodyCheckTwoTexts />)

    /* Check if the first description is rendered correctly */
    const firstDescriptionElement = screen.getByText('News overlap checker')
    expect(firstDescriptionElement).toBeInTheDocument()

    /* Check if the second description is rendered correctly */
    const secondDescriptionElement = screen.getByText('Our similarity checker determines ' +
        'the similarity levels between two text paragraphs.')
    expect(secondDescriptionElement).toBeInTheDocument()
  })
})
