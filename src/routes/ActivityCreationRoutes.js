import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { ActivitySetUp, TaskSetUp } from '../containers'

class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route path='/activitySetUp' component={ActivitySetUp}/>
            <Route path='/taskSetUp' component={TaskSetUp}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes