/* istanbul ignore file */
import './css/general.css'
import Home from './components/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CheckOneText from './components/CheckOneText'
import CheckURL from './components/CheckURL'
import CheckTwoTexts from './components/CheckTwoTexts'
import CheckTwoURLs from './components/CheckTwoURLs'
import HelpPage from './components/HelpPage'
import { useEffect } from 'react'
import axios from 'axios'

/**
 * The entire page was built around the Bootstrap library.
 *
 * Important links from their documentation:
 * https://getbootstrap.com/docs/5.0/utilities/spacing/
 * https://getbootstrap.com/docs/5.0/layout/grid/
 * https://getbootstrap.com/docs/5.0/utilities/flex/
 *
 * @returns JSX Element contain the landing page.
 *
 */
function App () {
  const applicationName = 'NewsCop'
  const applicationDescription = 'NewsCop is a news article ' +
          'overlap detection platform that helps businesses stay on ' +
          "top of competitors' news coverage. Our service quickly " +
          'checks for duplicated stories, allowing you to spot ' +
          'trends and identify opportunities to maximize coverage. ' +
          "With NewsCop, you'll never miss a story."
  const ourMission = 'Creating a platform that provides various ways of ' +
          'comparing news articles, helping users to identify overlapping content ' +
          'quickly and accurately and, consequently, decreasing the impact of ' +
          'misinformation and bias in the media.'

  const questionsFile = [
    {
      question: 'What is a news article overlap platform?',
      answer: 'A news article overlap platform is a digital tool or software that employs fingerprinting techniques to compare and analyze the lexical similarities between different news articles. It helps users identify common content, phrases, or sentence structures across multiple sources, allowing them to assess the overlap and potential redundancy in news reporting.'
    },
    {
      question: 'How does a news article overlap platform work?',
      answer: 'A news article overlap platform uses fingerprinting to generate unique representations (fingerprints) for each news article. These fingerprints are created by taking windows of length 8 from the original text and then hash each of those sub-strings, storing them in an array. By comparing these fingerprints, the platform identifies similarities and detects potential overlaps between different news articles on a lexical level, without relying on natural language processing (NLP) algorithms.'
    },
    {
      question: 'What problem does a news article overlap platform solve?',
      answer: 'A news article overlap platform addresses the issue of redundant or duplicated content in news articles. By utilizing fingerprinting techniques, it helps users identify lexical overlaps, where the same or similar content is found across multiple sources. This allows users to evaluate the extent of redundancy in news reporting and make informed decisions about the credibility and relevance of the information.'
    },
    {
      question: 'How can I use a news article overlap platform to improve my research?',
      answer: 'Researchers can leverage a news article overlap platform to enhance their research in several ways. Firstly, it assists in identifying multiple sources covering the same topic, providing a broader perspective and potentially uncovering additional insights. Secondly, it helps researchers detect instances of lexical repetition or similarity, enabling them to identify common narratives or trends in news reporting. Finally, it aids in evaluating the consistency and reliability of information by comparing the lexical content across different sources using fingerprinting techniques.'
    },
    {
      question: 'Can a news article overlap platform detect lexical similarity using fingerprinting?',
      answer: 'Yes, a news article overlap platform that employs fingerprinting techniques can effectively detect lexical similarity between news articles. By generating unique fingerprints for each article through hashing or other techniques, the platform can compare these fingerprints to identify similarities and potential overlaps in the lexical content of different news articles. This approach allows for efficient comparison without relying on complex natural language processing (NLP) algorithms, as the focus is on generating and comparing fixed-length codes rather than analyzing semantic meaning.'
    }
  ]
  useEffect(() => {
    async function updateStatistics () {
      await axios.post('https://backend-news-cop-68d6c56b3a54.herokuapp.com/updateUsers/')
        .then(res => {
          console.log('successfully updated the statistics.')
        })
        .catch(error => {
          console.log(error)
        })
    }
    updateStatistics()
  }, [])

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home applicationName={applicationName} applicationDescription={applicationDescription} ourMission={ourMission} />} />
          <Route path='/checkText' element={<CheckOneText applicationName='NewsCop' />} />
          <Route exact path='/checkURL' element={<CheckURL />} />
          <Route exact path='/compareTexts' element={<CheckTwoTexts applicationName='NewsCop' firstPlaceholder='Enter your first article here' secondPlaceholder='Enter your second article here' />} />
          <Route exact path='/compareURLs' element={<CheckTwoURLs />} />
          <Route exact path='/help' element={<HelpPage questionsFile={questionsFile} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
