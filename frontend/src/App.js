import './css/general.css'
import Home from './components/Home'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CheckOneText from './components/CheckOneText'
import Swipe from 'bootstrap/js/src/util/swipe'

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
      <Switch>
        <Route path='/' element={<Home />} />
        <Route path='/checkOneText' element={<CheckOneText />} />
      </Switch>
    </Router>
  )
}

export default App
