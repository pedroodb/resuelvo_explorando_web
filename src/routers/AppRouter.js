import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from '../routes'

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
