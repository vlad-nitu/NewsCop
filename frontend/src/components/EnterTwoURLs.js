import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
 */

export default function EnterTwoURLs () {
  const PreInputArticlePromptOriginal = 'Enter the original URL'
  const PreInputArticlePromptChanged = 'Enter the changed URL'
  const buttonStyle = {
    width: '25%',
    height: '50px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    backgroundColor: '#2E837E'
  }

  const [inputValueOriginal, setInputValueOriginal] = useState('')
  const [inputValueChanged, setInputValueChanged] = useState('')
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

  const handleInputChangeOriginal = (event) => {
    setInputValueOriginal(event.target.value)
    console.log(event.target.value)
  }

  const handleInputChangeChanged = (event) => {
    setInputValueChanged(event.target.value)
    console.log(event.target.value)
  }

  return (
    <Container className='my-3'>
      <div className='mt-5'>
        <h2 className='text-center' style={{ fontSize: '1.5vh' }}>
          Enter the article's URLs to check for similarity
        </h2>
      </div>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Form.Group controlId='formUrl'>
          <Row className='url-part'>
            <Col md={6} className='pe-sm-6 mb-6 mb-sm-0'>
              <Form.Control
                type='url'
                placeholder={PreInputArticlePromptOriginal}
                className='rounded-pill border-success'
                style={{ height: '50px' }}
                value={inputValueOriginal}
                onChange={handleInputChangeOriginal}
                disabled={buttonDisabled}
              />
            </Col>
            <Col md={6} className='pe-sm-6 mb-6 mb-sm-0'>
              <Form.Control
                type='url'
                placeholder={PreInputArticlePromptChanged}
                className='rounded-pill border-success'
                style={{ height: '50px' }}
                value={inputValueChanged}
                onChange={handleInputChangeChanged}
                disabled={buttonDisabled}
              />
            </Col>
          </Row>
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='primary'
            type='submit'
            className='mt-4 mx-auto rounded'
            style={buttonStyle}
            onClick={handleSubmit}
            disabled={buttonDisabled || !inputValueChanged || !inputValueOriginal}
          >
            Submit
          </Button>
        </div>
        {showInputValue && (
          <div>
            Input value: "{inputValueOriginal + ' and ' + inputValueChanged}"
          </div>
        )}
      </div>
    </Container>
  )
}
