import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, ActivitySetUp } from '../containers'

class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/activitySetUp' component={ActivitySetUp}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes