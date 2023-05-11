/* global expect, describe, it */

import React from 'react'
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react'
import SubmitButton from '../SubmitButton'

describe('SubmitButton', () => {
  it('disables the button on click and enables it after 10 seconds', async () => {
    jest.useFakeTimers() /* Mock the timer */

    render(<SubmitButton />)

    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled() /* Button should become directly disabled */

    act(() => {
      jest.advanceTimersByTime(10000) /* Advance timer by 10 seconds */
    })

    await waitFor(() => {
      expect(submitButton).toBeEnabled() /* Button should be re-enabled after 10 seconds */
    })
  })
})
