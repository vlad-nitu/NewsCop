/* global expect, describe */

import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SubmitButton from '../submitButton'

describe('SubmitButton', () => {
  test('renders button with correct text', () => {
    render(<SubmitButton disabled={false} onClickMethod={() => {}} />)
    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
  })

  test('calls onClickMethod when button is clicked', () => {
    const onClickMethod = jest.fn()
    render(<SubmitButton disabled={false} onClickMethod={onClickMethod} />)
    const submitButton = screen.getByText('Submit')
    fireEvent.click(submitButton)
    expect(onClickMethod).toHaveBeenCalledTimes(1)
  })

  test('disables button when disabled prop is true', () => {
    render(<SubmitButton disabled onClickMethod={() => {}} />)
    const submitButton = screen.getByRole('button')
    expect(submitButton).toBeDisabled()
  })
})
