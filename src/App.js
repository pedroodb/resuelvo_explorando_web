import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import AppRouter from './routers/AppRouter'
import AppReducer from './reducers'

const packages = []

packages.push(thunk)
packages.push(createLogger())

class App extends Component {

  store = createStore(AppReducer,applyMiddleware(...packages))

  render() {
    return (
      <Provider store={this.store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App
