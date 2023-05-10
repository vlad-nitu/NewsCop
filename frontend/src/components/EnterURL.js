import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function EnterURL () {
  const PreInputArticlePrompt = "Article's URL"
  const buttonStyle = {
    width: '25%',
    height: '6vh',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    backgroundColor: '#2E837E'
  }

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
          Enter the article's URL to check for plagiarism
        </h2>
      </div>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Group controlId='formUrl'>
          <Form.Control
            type='url'
            placeholder={PreInputArticlePrompt}
            className='rounded-pill border-success'
            value={inputValue}
            onChange={handleInputChange}
            disabled={buttonDisabled}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='primary'
            type='submit'
            className='mt-4 mx-auto rounded'
            style={buttonStyle}
            onClick={handleSubmit}
            disabled={buttonDisabled || !inputValue}
          >
            Submit
          </Button>
        </div>
        {showInputValue && (
          <div>
            Input value: "{inputValue}"
          </div>
        )}
      </div>
    </Container>
  )
}
