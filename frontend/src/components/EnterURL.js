import axios from 'axios'
import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import CheckUrlDecision from './CheckUrlDecision'
import ErrorPrompt from './ErrorPrompt'
import LoadingCircle from './LoadingCircle'
/* The endpoint that is going to be used for the request, see urls.py and views.py */
const persistUrlEndpoint = 'http://localhost:8000/urlsimilarity/'

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
    width: '30%',
    height: '7vh',
    maxHeight: '100px',
    fontWeight: 'bold',
    fontSize: 'min(calc(1vh + 1vw), 50px)', // Adjust the font size as needed
    backgroundColor: '#2E837E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginRight: '25%'
  }
  const [titleValue, setTitleValue] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [showInputValue, setShowInputValue] = useState(false)
  const [loadingValue, setLoadingValue] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [errorPrompt, setErrorPrompt] = useState(false)
  const [errorVal, setErrorVal] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setButtonDisabled(true)
    setLoadingValue(true)
    const response = await axios.post(`${persistUrlEndpoint}`,
      '{ "key":' + `"${inputValue}"}`)
      .catch(function (error) {
        if (error.response) {
          setLoadingValue(false)
          // https://stackoverflow.com/questions/49967779/axios-handling-errors
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorVal('You entered an invalid URL!')
          setErrorPrompt(true)
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          setLoadingValue(false)
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          setErrorVal('The server might not be running!')
          setErrorPrompt(true)
          console.log(error.request)
        } else {
          setLoadingValue(false)
          // Something happened in setting up the request that triggered an Error
          setErrorVal('An error occurred, please try again later!')
          setErrorPrompt(true)
          console.log('Error', error.message)
        }
      })
    if (response != null) {
      console.log(response.data)
      const similarity = Math.round(100 * response.data.max_val)
      if (similarity === -100) {
        setLoadingValue(false)
        setErrorVal('Our system has not found no match for your news article!')
        setErrorPrompt(true)
      } else {
        setLoadingValue(false)
        // To be used later
        // if (response.data.date === 'None') { setDateValue('The publishing date of this article is unfortunately unknown!') } else { setDateValue(response.data.date) }
        const arr = ['Your article has a maximum overlap of ' + similarity + '% with ' + response.data.max_url]
        setTitleValue(arr)
        setShowInputValue(true)
      }
    }
    setTimeout(() => {
      // setShowInputValue(false)
      setButtonDisabled(false)
      setLoadingValue(false)
      setInputValue('')
      setErrorVal('')
      setErrorPrompt(false)
    }, 10000)
  }

  const handleInputChange = (event) => {
    setShowInputValue(false)
    // setLoadingValue(true)
    setTitleValue([''])
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
      <div style={{ maxWidth: '70vh', margin: '0 auto' }}>
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='primary'
            type='submit'
            className='mt-4 rounded'
            style={buttonStyle}
            onClick={handleSubmit}
            disabled={buttonDisabled || !inputValue}
          >
            Submit
          </Button>
        </div>
      </div>
      {loadingValue && (<LoadingCircle />)}
      {errorPrompt && (<ErrorPrompt prompt={errorVal} />)}
      {showInputValue && (
        <CheckUrlDecision items={titleValue} />
      // <div>{titleValue}</div>
      )}

    </Container>

  )
}
