import axios from 'axios'
import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import CheckUrlDecision from './CheckUrlDecision'
/* The endpoint that is going to be used for the request, see urls.py and views.py */
const persistUrlEndpoint = 'http://localhost:8000/persistURL/'

/**
 * Persists a URL asynchronously, the URL will have to be stored as the value for "key" in
 * a JSON format.
 * @param url the URL, in the format above
 * @returns {Promise<any>} the response after the persistance
 */
export const persistUrl = async (url) => {
  try {
    const response = await axios.post(`${persistUrlEndpoint}`, url)
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to persist url')
  }
}

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
export default function EnterURL () {
  const PreInputArticlePrompt = "Article's URL"
  const buttonStyle = {
    width: '25%',
    height: '50px',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    backgroundColor: '#2E837E'
  }
  const [titleValue, setTitleValue] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [decisionValue, setDecisionValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [showInputValue, setShowInputValue] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setButtonDisabled(true)
    const response = await axios.post(`${persistUrlEndpoint}`,
      '{ "key":' + `"${inputValue}"}`)
      .catch(function (error) {
        if (error.response) {
          // https://stackoverflow.com/questions/49967779/axios-handling-errors
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
      })
    // console.log(response.data)
    if (response != null) {
      // setTitleValue(response.title)
      // setDateValue(response.date)
      // if(response.decision == true){
      //   setDecisionValue("We found high overlap")
      // }
      // else{
      //   setDecisionValue("We found no overlap")
      // }
      setTitleValue('Netherlands is the happiest country')
      setDateValue('12-02-2022')
      setDecisionValue('We found no overlap.')
      setShowInputValue(true)
    }
    setTimeout(() => {
      // setShowInputValue(false)
      setButtonDisabled(false)
      setInputValue('')
    }, 10000)
  }

  const handleInputChange = (event) => {
    setShowInputValue(false)
    setTitleValue('')
    setDateValue('')
    setDecisionValue('')
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
            style={{ height: '50px' }}
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
      </div>
      {showInputValue && (
        <CheckUrlDecision title={titleValue} publishingDate={dateValue} decision={decisionValue} />
      )}
    </Container>

  )
}
