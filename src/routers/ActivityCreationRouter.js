import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ActivityCreationRoutes } from '../routes'

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter basename='/activityCreation/'>
        <ActivityCreationRoutes />
      </BrowserRouter>
    );
  }
}

export default AppRouter