import NavbarComponent from './navbar'
import Footer from './footer'
import BodyCheckGeneric from './BodyCheckGeneric'
import TextBox from './TextBox'
import SubmitButton from './submitButton'
import React, { useEffect, useState } from 'react'
import ForwardToPage from './ForwardToPage'
import { Container } from 'react-bootstrap'
import Article from './Article'
import LoadingCircle from './LoadingCircle'
import ErrorPrompt from './ErrorPrompt'
import CheckUrlDecision from './CheckUrlDecision'
import axios from 'axios'

const checkTextEndpoint = 'https://backend-news-cop-68d6c56b3a54.herokuapp.com/checkText/'

/**
 * The page for the check text for similarity page. It contains all the components that will be present in the page,
 * and reuses some of the elements that can be found in the main page.
 * @param applicationName the name of the application to be displayed in the navbar component
 * @returns {JSX.Element} the check text for similarity component
 */
export default function CheckOneText ({ applicationName }) {
  const textBoxDescription = 'Enter the article’s content to check for overlap'
  const description = 'News overlap checker'
  const secondDescription = 'Our tool detects overlap in your news article.'
  const emptyArticle = new Article(null, null, null, null, 0)

  const [sourceArticle, setSourceArticle] = useState(emptyArticle)
  const [articlesValues, setArticlesValues] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [loadingValue, setLoadingValue] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [errorPrompt, setErrorPrompt] = useState(false)
  const [errorVal, setErrorVal] = useState('')
  const [displayAnswer, setDisplayAnswer] = useState('none')

  /**
   * Scroll to the list of similar articles after results are shown
   */
  const handleScroll = () => {
    const element = document.getElementById('similar_articles')
    if (element.scrollIntoView) { element.scrollIntoView(true) }
  }

  /**
   * Scroll to the list of results when the list of articles is updated
   */
  useEffect(() => {
    // Runs on the first render
    handleScroll()
    // And any time any dependency value changes
  }, [articlesValues])

  /**
   * Handle submit function which is called when clicking on the submit button
   * @param event the event of clicking on the submit button
   * @returns {Promise<void>} replicating all the desired behavior on frontend components
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    setButtonDisabled(true)
    setLoadingValue(true)
    const response = await axios.post(`${checkTextEndpoint}`,
      { key: `${inputValue}` })
      .catch(function (error) {
        // Remove the loading screen when an error was received.
        setLoadingValue(false)

        if (error.response) {
          // https://stackoverflow.com/questions/49967779/axios-handling-errors
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorVal('You entered an invalid text!')
          setErrorPrompt(true)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          setErrorVal('The server might not be running!')
          setErrorPrompt(true)
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorVal('An error occurred, please try again later!')
          setErrorPrompt(true)
        }
      })
    if (response != null) {
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
      // Remove the loading screen after processing the received response.
      setLoadingValue(false)

      if (articles.length === 0) {
        setErrorVal('Our system has found no match for the news content you provided!')
        setErrorPrompt(true)
      } else {
        setSourceArticle(new Article(inputValue, response.data.sourceTitle, null, response.data.sourceDate, 0))
        setArticlesValues(articles)
        setDisplayAnswer('block')
      }
    }
    setTimeout(() => {
      setButtonDisabled(false)
      setLoadingValue(false)
      setErrorVal('')
      setErrorPrompt(false)
    }, 10000)
  }

  return (
    <>
      {/* Navbar */}
      <NavbarComponent name={applicationName} mainPage={false} />
      <Container>
        {/* The description text about news overlap */}
        <BodyCheckGeneric description={description} secondDescription={secondDescription} />
        <div style={{ height: '100%' }}>
          {/* Text area */}
          <TextBox
            description={textBoxDescription}
            value={inputValue}
            disabled={buttonDisabled}
            textAreaValue={inputValue}
            setTextAreaValue={setInputValue}
            placeholder='Enter your article here'
            isHighlighted={false} highlighted=''
          />
        </div>
        {/* The submit button */}
        <SubmitButton onClickMethod={handleSubmit} disabled={buttonDisabled || !inputValue} />
        {loadingValue && (<LoadingCircle />)}
        {errorPrompt && (<ErrorPrompt prompt={errorVal} />)}

        {/* Routes the user to the check URL service */}
        <ForwardToPage page='/checkURL' prompt='... or you may want to check a news article via an URL for similarity' />
        <CheckUrlDecision type='text' sourceArticle={sourceArticle} articles={articlesValues} display={displayAnswer} />
      </Container>

      {/* Footer */}
      <Footer />
    </>
  )
}
