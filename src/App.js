import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import AppRouter from './routers/AppRouter'
import Internacionalization from './components/Internacionalization'
import AppReducer from './reducers'

const packages = []

packages.push(thunk)
if (process.env.NODE_ENV === 'development') {
  packages.push(createLogger())
}

class App extends Component {

  store = createStore(AppReducer,applyMiddleware(...packages))

  render() {
    return (
      <Provider store={this.store}>
        <Internacionalization BaseComponent={AppRouter} />
      </Provider>
    );
  }
}

export default App
