import './css/general.css'
import Home from './components/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CheckOneText from './components/CheckOneText'
import CheckURL from './components/CheckURL'
import CheckTwoTexts from './components/CheckTwoTexts'
import CheckTwoURLs from './components/CheckTwoURLs'

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
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/checkText' element={<CheckOneText />} />
          <Route exact path='/checkURL' element={<CheckURL />} />
          <Route exact path='/compareTexts' element={<CheckTwoTexts />} />
          <Route exact path='/compareURLs' element={<CheckTwoURLs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
