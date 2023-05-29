import axios from 'axios'
import { useState } from 'react'
import SubmitButton from './submitButton'
import { Container, Form } from 'react-bootstrap'
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

  const [sourceUrl, setSourceUrl] = useState('')
  const [urlValues, setUrlValues] = useState([])
  const [similarityValues, setSimilarityValues] = useState([])
  const [titleValues, setTitleValues] = useState([])
  const [publisherValues, setPublisherValues] = useState([])
  const [dateValues, setDateValues] = useState([])
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
      const urls = []
      const titles = []
      const publishers = []
      const dates = []
      const similarities = []
      for (let i = 0; i < response.data.length; ++i) {
        const item = response.data[i]
        const similarity = Math.round(100 * item.similarity)
        if (similarity === 0) { continue }
        const title = item.title
        const publisher = item.publisher
        const date = item.date
        const url = item.url
        urls.push(url)
        titles.push(title)
        publishers.push(publisher)
        dates.push(date)
        similarities.push(similarity)
      }
      if (urls.length === 0) {
        setLoadingValue(false)
        setErrorVal('Our system has not found no match for your news article!')
        setErrorPrompt(true)
      } else {
        setLoadingValue(false)
        setSourceUrl(inputValue)
        setSimilarityValues(similarities)
        setUrlValues(urls)
        setTitleValues(titles)
        setPublisherValues(publishers)
        setDateValues(dates)
        setShowInputValue(true)
      }
    }
    setTimeout(() => {
      setButtonDisabled(false)
      setLoadingValue(false)
      setErrorVal('')
      setErrorPrompt(false)
    }, 10000)
  }

  const handleInputChange = (event) => {
    setShowInputValue(false)
    setSourceUrl('')
    setUrlValues([''])
    setTitleValues([''])
    setPublisherValues([''])
    setDateValues([''])
    setSimilarityValues([])
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
      </div>
      {loadingValue && (<LoadingCircle />)}
      {errorPrompt && (<ErrorPrompt prompt={errorVal} />)}
      {showInputValue && (
        <CheckUrlDecision sourceUrl={sourceUrl} urls={urlValues} titles={titleValues} publishers={publisherValues} dates={dateValues} similarities={similarityValues} />)}

    </Container>
  )
}
