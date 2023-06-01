import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

/**
 *  The submit button is designed for the submit text page, where the user needs to enter a news article.
 *  After that the user can press the submit button to check whether that news article has been plagiarised.
 *  After a submission, the button will become disabled for 10 seconds so that the user cannot spam the service.
 *
 * @returns {JSX.Element} a button that is centered, and that is
 * stylised to look very similar to the one on the Figma Wireframe.
 */
const SubmitButton = ({ disabled, onClickMethod }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        id='submitButton'
        variant='primary'
        data-testid='submit_button'
        type='submit'
        className='mt-0 mt-lg-2 rounded'
        onClick={onClickMethod}
        disabled={disabled}
      >
        Submit
      </Button>
    </div>
  )
}

export default SubmitButton
