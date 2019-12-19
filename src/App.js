import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import intl from 'react-intl-universal'

import AppRouter from './routers/AppRouter'
import AppReducer from './reducers'

const packages = []

packages.push(thunk)
packages.push(createLogger())

const locales = {
  "en-US": require('./locales/en-US.json'),
  "es-ES": require('./locales/es-ES.json'),
}

class App extends Component {

  loadLocales(prevProps) {
    if(prevProps.lang !== this.props.lang) {
      intl.init({
        currentLocale: this.props.lang , // TODO: determine locale here
        locales,
      })
      .then(() => {
        this.forceUpdate()
      })
    }
  }

  componentDidMount() {
    this.loadLocales({lang:"es-ES"})
  }

  componentDidUpdate(prevProps) {
    this.loadLocales(prevProps)
  }

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
