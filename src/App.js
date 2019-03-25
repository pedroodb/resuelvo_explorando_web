import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import AppRouter from './routers/AppRouter'
import AppReducer from './reducers'

class App extends Component {

  store = createStore(AppReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  render() {
    return (
      <Provider store={this.store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App
