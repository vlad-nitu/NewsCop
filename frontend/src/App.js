import './css/general.css'
import Home from './components/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CheckOneText from './components/CheckOneText'
import CheckURL from './components/CheckURL'

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
          'missinformation and plagiarism in the media.'
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home applicationName={applicationName} applicationDescription={applicationDescription} ourMission={ourMission} />} />
          <Route path='/checkText' element={<CheckOneText applicationName='NewsCop' />} />
          <Route exact path='/checkURL' element={<CheckURL />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
