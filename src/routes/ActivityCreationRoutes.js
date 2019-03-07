import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ActivitySetUp } from '../containers'

class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route path='/activitySetUp' component={ActivitySetUp}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes