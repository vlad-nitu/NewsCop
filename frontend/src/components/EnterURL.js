import axios from 'axios'
import React, { useState } from 'react'
import SubmitButton from './submitButton'
import { Container, Form } from 'react-bootstrap'
import CheckUrlDecision from './CheckUrlDecision'
import ErrorPrompt from './ErrorPrompt'
import LoadingCircle from './LoadingCircle'
import Article from './Article'
import ForwardToPage from "./ForwardToPage";

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
  const prompt = '... or you may want to check a text paragraph for similarity against our stored articles'
  const emptyArticle = new Article(null, null, null, null, 0)

  const [sourceArticle, setSourceArticle] = useState(emptyArticle)
  const [articlesValues, setArticlesValues] = useState([])
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
      const articles = []
      for (let i = 0; i < response.data.similarArticles.length; ++i) {
        const item = response.data.similarArticles[i]
        const similarity = Math.round(100 * item.similarity)
        if (similarity === 0) { continue }
        const title = item.title
        const publisher = item.publisher
        const date = item.date
        const url = item.url

        articles.push(new Article(url, title, publisher, date, similarity))
      }
      if (articles.length === 0) {
        setLoadingValue(false)
        setErrorVal('Our system has not found no match for your news article!')
        setErrorPrompt(true)
      } else {
        setLoadingValue(false)
        setSourceArticle(new Article(inputValue, response.data.sourceTitle, null, response.data.sourceDate, 0))
        setArticlesValues(articles)
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
    setSourceArticle(emptyArticle)
    setArticlesValues([])
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
      {/* Component that routes /checkURL to /checkText
      if user wants to input a text fragment, not an URL that will be crawled */}
      <ForwardToPage page='/checkText' prompt={prompt} />
      {showInputValue && (
        <CheckUrlDecision sourceArticle={sourceArticle} articles={articlesValues}/>)}

    </Container>
  )
}
