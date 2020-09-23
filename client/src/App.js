import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import getStore from './redux/store'

import Dashboard from "./pages/dashboard"

function App() {
  return (
    <Provider store={getStore}>
      <Router>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
