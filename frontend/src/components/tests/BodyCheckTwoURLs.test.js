import React from 'react'
import { render, screen } from '@testing-library/react'
import BodyCheckTwoURLs from '../BodyCheckTwoURLs'

describe('BodyCheckTwoURLs', () => {
    it('renders the component with correct descriptions', () => {
        render(<BodyCheckTwoURLs />)

        /* Check if the first description is rendered correctly */
        const firstDescriptionElement = screen.getByText('News overlap checker')
        expect(firstDescriptionElement).toBeInTheDocument()

        /* Check if the second description is rendered correctly */
        const secondDescriptionElement = screen.getByText('Our similarity checker determines the similarity levels between the content of two news URLs.')
        expect(secondDescriptionElement).toBeInTheDocument()
    })
})