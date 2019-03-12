import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { AppRouter } from './routers'
import AppReducer from './reducers'

class App extends Component {

  store = createStore(AppReducer)

  render() {
    return (
      <Provider store={this.store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App
