import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '../routes'

//Router correspondiente a la aplicación principal
class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }
}

export default AppRouter
