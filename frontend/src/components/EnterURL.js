import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import SubmitButton from './submitButton'

/**
 * Container that displays:
 * 1. The description of the form from 2.
 * 2. The `Article's URL` form where the user will input the URL that he wants to
 * check for overlapping with other articles stored in our database
 * 3. The `Submit button` that sends the URL to the backend server to do the computations
 * Can also be found on the Figma wireframe.
 *
 * @returns {JSX.Element} that represents the overlapping description, form and submit button;
 * Can be found directly under the navbar component of the page
 */export default function EnterURL () {
  const PreInputArticlePrompt = "Article's URL"

  const [inputValue, setInputValue] = useState('')
  const [showInputValue, setShowInputValue] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowInputValue(true)
    setButtonDisabled(true)
    setTimeout(() => {
      setShowInputValue(false)
      setButtonDisabled(false)
    }, 5000)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    console.log(event.target.value)
  }

  return (
    <Container className='my-3'>
      <div className='mt-5'>
        <h2 className='text-center' style={{ fontSize: '1.5vh' }}>
          Enter the article's URL to check for overlap
        </h2>
      </div>
      <div style={{ maxWidth: '60vh', margin: '0 auto' }}>
        <Form.Group controlId='formUrl'>
          <Form.Control
            type='url'
            placeholder={PreInputArticlePrompt}
            className='rounded-pill border-success'
            style={{ height: '55px' }}
            value={inputValue}
            onChange={handleInputChange}
            disabled={buttonDisabled}
          />
        </Form.Group>
        <SubmitButton onClickMethod={handleSubmit} disabled={buttonDisabled || !inputValue} />
        {showInputValue && <div>Input value: "{inputValue}"</div>}
      </div>
    </Container>
  )
}
